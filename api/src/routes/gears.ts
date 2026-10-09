import { Hono } from "hono";
import { getSupabaseClient, Bindings } from "@/db";

export const gearsRoute = new Hono<{ Bindings: Bindings }>()
  .get("/", async (c) => {
    const supabase = getSupabaseClient(c);

    let { data } = await supabase.from("gears").select("*");

    c.status(200);
    return c.json(data);
  })
  .get("/:category", async (c) => {
    const supabase = getSupabaseClient(c);

    const category = c.req.param("category");

    let { data } = await supabase.from("gears").select("*").eq("category", category);

    c.status(200);
    return c.json(data);
  });
