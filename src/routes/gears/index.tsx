import { ASSETS } from "@/shared/Constants";
import PageHeader from "@/shared/PageHeader";
import { createFileRoute } from "@tanstack/react-router";

import { useEffect } from "react";
import ItemDisplay from "@/components/Gears/ItemDisplay";

export const Route = createFileRoute("/gears/")({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    document.title = "Gears | Jian";
  }, []);

  // TODO: Add a gear list: Productivity Tools, Desktop Setup, Accessories, etc.

  return (
    <div className="max-w-2xl m-auto px-6">
      <PageHeader title="Gears" />

      <div className="flex flex-col py-2 gap-y-4">
        <p className="text-sm font-apple text-justify indent-4">
          Here's my gear wonderland! It's a collection of products that I use
          for content creation, productivity, and daily work. The is one never
          ending list, making my wallet go broke. But it's whatever it takes to
          keep my productivity up and content crisp.
        </p>

        <p className="text-sm font-apple text-justify">
          Enjoy! 🎉
        </p>
      </div>

      <h2 className="text-lg font-bold underline underline-offset-8 my-4 decoration-4 decoration-gray-500">
        Filming
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-2 rounded-lg p-4">
        <ItemDisplay
          src={`${ASSETS.GEARS}/zve10m2.jpg`}
          title="Sony Alpha ZVE10 II"
          description="APS-C Interchangeable Lens Mirrorless"
          amazonLink="https://amzn.to/3DUFJce"
        />

        <ItemDisplay
          src={`${ASSETS.GEARS}/sony11mm.jpg`}
          title="Sony 11mm F1.8"
          description="Ultra-Wide-Angle Prime for APS-C Cameras"
          amazonLink="https://amzn.to/3QNFjXV"
        />

        <ItemDisplay
          src={`${ASSETS.GEARS}/djimic.jpg`}
          title="DJI Mic"
          description="(2 TX + 1 RX + Charging Case) - Wireless Lavalier Microphone"
          amazonLink="https://amzn.to/4j2HoLC"
        />

        <ItemDisplay
          src={`${ASSETS.GEARS}/joby.jpg`}
          title="JOBY GorillaPod"
          description="Action Video Tripod (Black and Red)"
          amazonLink="https://amzn.to/4hROr93"
        />

        <ItemDisplay
          src={`${ASSETS.GEARS}/samsungt7.jpg`}
          title="SAMSUNG T7 Shield"
          description="SSD (1TB) - up to 1050MB/s, USB 3.2 Gen2, IP65 Rated"
          amazonLink="https://amzn.to/41O9tAQ"
        />
      </div>
    </div>
  );
}
