#!/usr/bin/env node
// Screenshots for PR descriptions. Drives Chrome over the DevTools protocol, so
// there are no dependencies and mobile shots get real device emulation.
//
//   node scripts/screenshot.mjs [--base http://localhost:4321] [--out dir] <shot>...
//
// A shot is a route ("/books/") for the full page, a route plus a CSS selector
// ("/|section[aria-labelledby=products]") to capture just one component, or a route with
// an anchor ("/resume/#skills") to capture the viewport scrolled there (sticky UI). Each shot is taken in light and dark, at desktop
// (1280px) and mobile (390px, 2x), and saved as <out>/<name>-<theme>-<device>.png.

import { spawn } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(name);
  return i === -1 ? fallback : args.splice(i, 2)[1];
};
const base = flag("--base", "http://localhost:4321");
const out = flag("--out", "screenshots");
const shots = args.length > 0 ? args : ["/"];

const chromePath =
  process.env.CHROME_PATH ??
  (process.platform === "darwin"
    ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    : "google-chrome");

const devices = {
  desktop: { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false },
  mobile: { width: 390, height: 844, deviceScaleFactor: 2, mobile: true },
};
const themes = ["light", "dark"];

const profile = await mkdtemp(join(tmpdir(), "shot-"));
const chrome = spawn(
  chromePath,
  ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--remote-debugging-port=0", `--user-data-dir=${profile}`],
  { stdio: ["ignore", "ignore", "pipe"] },
);

const wsUrl = await new Promise((resolve, reject) => {
  let buffer = "";
  chrome.stderr.on("data", (chunk) => {
    buffer += chunk;
    const match = buffer.match(/DevTools listening on (ws:\/\/\S+)/);
    if (match) resolve(match[1]);
  });
  chrome.on("exit", () => reject(new Error(`Chrome exited before starting: ${buffer}`)));
});

const browser = new WebSocket(wsUrl);
await new Promise((resolve) => browser.addEventListener("open", resolve, { once: true }));

let nextId = 0;
const pending = new Map();
const listeners = new Set();
browser.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    message.error ? reject(new Error(message.error.message)) : resolve(message.result);
  } else {
    for (const listener of listeners) listener(message);
  }
});
const send = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, { resolve, reject });
    browser.send(JSON.stringify({ id, method, params, sessionId }));
  });
const once = (method, sessionId) =>
  new Promise((resolve) => {
    const listener = (message) => {
      if (message.method === method && message.sessionId === sessionId) {
        listeners.delete(listener);
        resolve(message.params);
      }
    };
    listeners.add(listener);
  });

const slug = (text) =>
  text
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase() || "home";

await mkdir(out, { recursive: true });
const saved = [];

try {
  for (const shot of shots) {
    const [route, selector] = shot.split("|");
    const name = slug(route) + (selector ? `--${slug(selector)}` : "");

    for (const [deviceName, metrics] of Object.entries(devices)) {
      for (const theme of themes) {
        const { targetId } = await send("Target.createTarget", { url: "about:blank" });
        const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
        await send("Page.enable", {}, sessionId);
        await send("Emulation.setDeviceMetricsOverride", metrics, sessionId);
        await send(
          "Emulation.setEmulatedMedia",
          { features: [{ name: "prefers-color-scheme", value: theme }] },
          sessionId,
        );
        const loaded = once("Page.loadEventFired", sessionId);
        await send("Page.navigate", { url: new URL(route, base).href }, sessionId);
        await loaded;
        // Let lazy images and fonts settle.
        await send(
          "Runtime.evaluate",
          {
            expression: `Promise.all([...document.images].map(i => i.complete || new Promise(r => { i.loading = "eager"; i.onload = i.onerror = r; }))).then(() => document.fonts.ready)`,
            awaitPromise: true,
          },
          sessionId,
        );

        let clip;
        const anchored = !selector && route.includes("#");
        if (selector) {
          const { result } = await send(
            "Runtime.evaluate",
            {
              expression: `(() => { const el = document.querySelector(${JSON.stringify(selector)}); if (!el) return null; const r = el.getBoundingClientRect(); return JSON.stringify({ x: r.x + scrollX - 16, y: r.y + scrollY - 16, width: r.width + 32, height: r.height + 32 }); })()`,
              returnByValue: true,
            },
            sessionId,
          );
          if (!result.value) throw new Error(`Selector not found on ${route}: ${selector}`);
          clip = { ...JSON.parse(result.value), scale: 1 };
        } else if (anchored) {
          // Anchor shots capture just the viewport after jumping there, so sticky/scroll UI
          // shows where the reader sees it. (captureBeyondViewport would re-lay out the page.)
          await new Promise((resolve) => setTimeout(resolve, 800));
        } else {
          const { cssContentSize } = await send("Page.getLayoutMetrics", {}, sessionId);
          clip = { x: 0, y: 0, width: metrics.width, height: Math.ceil(cssContentSize.height), scale: 1 };
        }

        const { data } = await send(
          "Page.captureScreenshot",
          anchored ? { format: "png" } : { format: "png", clip, captureBeyondViewport: true },
          sessionId,
        );
        const file = join(out, `${name}-${theme}-${deviceName}.png`);
        await writeFile(file, Buffer.from(data, "base64"));
        saved.push(file);
        await send("Target.closeTarget", { targetId });
      }
    }
  }
} finally {
  browser.close();
  const exited = new Promise((resolve) => chrome.once("exit", resolve));
  chrome.kill();
  await exited;
  await rm(profile, { recursive: true, force: true, maxRetries: 3 });
}

console.log(saved.join("\n"));
