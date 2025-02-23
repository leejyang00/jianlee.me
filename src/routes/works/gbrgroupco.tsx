import Article from "@/components/Layout/Article";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import ScrollToTop from "@/shared/ScrollToTop";
import Tag from "@/shared/Tag";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import { ASSETS } from "@/shared/Constants";

export const Route = createFileRoute("/works/gbrgroupco")({
  component: ScrollToTop(RouteComponent),
});

function RouteComponent() {
  useEffect(() => {
    document.title = "GBR Group Co | Jian";
  }, []);

  return (
    <div>
      <Article title="GBR Group Co" date="2024">
        <div className="text-sm">
          <div className="mb-8">
            <img
              src={`${ASSETS.IMAGES}/gbrgroup.png`}
              alt="GBR Group Co"
              className="rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="indent-4">
              This is my first client-based project, developing a corporate
              website for GBR Group Co., designed to showcase their holdings,
              partnerships, product distribution, and market share across the
              ASEAN region.
            </div>
            <div className="indent-4">
              Kinn, the founder, approached me with the vision of creating a
              static website that embodies professionalism, credibility, and a
              strong corporate presence. The goal was to establish GBR Group Co.
              as a trusted industry leader, reinforcing its brand identity
              through a sleek, modern, and minimalistic design.
            </div>
          </div>

          <div className="flex flex-col gap-2 ml-2 py-4">
            <div className="flex flex-row items-center gap-1">
              {/* <Tag tag="WEBSITE" /> */}
              <p className="flex flex-row items-center gap-1">
                <span className="font-sans bg-[#c6f7d4] text-[#22553c] dark:text-[#9be6b5] dark:bg-[#2d4a43] text-xxs font-semibold px-1 rounded text-center mr-2 w-fit">
                  WEBSITE
                </span>{" "}
                <a
                  href="https://www.gbrgroupco.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink hover:underline flex flex-row items-center gap-1"
                >
                  www.gbrgroupco.com <LaunchRoundedIcon sx={{ fontSize: 16 }} />
                </a>
              </p>
            </div>
            <div className="flex flex-row items-center gap-1">
              <Tag tag="STACK" />
              Vite, React, Tailwind CSS, TypeScript, Shadcn UI, Material UI,
              Cloudflare
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <img
              src={`${ASSETS.IMAGES}/gbr-group-co/gbr-marketing.jpg`}
              alt="GBR Group Co"
              className="rounded-lg"
            />
            <img
              src={`${ASSETS.IMAGES}/gbr-group-co/gbr-partner.jpg`}
              alt="GBR Group Co"
              className="rounded-lg"
            />
            <img
              src={`${ASSETS.IMAGES}/gbr-group-co/gbr-key.jpg`}
              alt="GBR Group Co"
              className="rounded-lg"
            />
          </div>
        </div>
      </Article>
    </div>
  );
}
