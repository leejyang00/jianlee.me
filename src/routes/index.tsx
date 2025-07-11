import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import Introduction from "@/components/Home/Introduction";
import Bio from "@/components/Home/Bio";
import Socials from "@/components/Home/Socials";
import ScrollToTop from "@/shared/ScrollToTop";
import Highlight from "@/components/Home/Highlight";
import { ASSETS } from "@/shared/Constants";

export const Route = createFileRoute("/")({
  component: ScrollToTop(RouteComponent),
});

function RouteComponent() {
  useEffect(() => {
    document.title = "Jian Yang Lee | Home Page";
  }, []);

  return (
    <div className="max-w-xl m-auto px-8">
      {/* Hello Section */}
      <div className="text-center text-sm bg-[#f5f0e8] dark:bg-[#313134] rounded-lg p-2 my-6 font-apple font-normal">
        Hello, I'm a DevOps Engineer based in Australia!
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center sm:justify-between sm:items-start">
        <div className="flex flex-col w-3/4 text-center sm:text-left mb-4 sm:mb-0">
          <h1 className="text-3xl font-bold mb-1">Jian Yang Lee</h1>
          <p className="text-sm font-apple font-normal">
            Digital Architect ( DevOps / Software / Content )
          </p>
        </div>
        <div>
          <img
            src={`${ASSETS.IMAGES}/profile.jpg`}
            alt="Profile"
            className="w-28 h-28 rounded-full border-2 border-white object-cover brightness-80"
          />
        </div>
      </div>

      {/* Work Section */}
      <Introduction />
      <Bio />
      {/* <Highlight /> */}
      <Socials />
    </div>
  );
}
