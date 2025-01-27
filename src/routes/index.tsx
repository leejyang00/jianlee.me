import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import Introduction from "@/components/Home/Introduction";
import Bio from "@/components/Home/Bio";
import Socials from "@/components/Home/Socials";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    document.title = "Jian Lee - Home Page";
  }, []);

  return (
    <div className="max-w-xl m-auto px-4">
      {/* Hello Section */}
      <div className="text-center text-sm bg-[#f5f0e8] dark:bg-[#313134] rounded-md p-2 my-6 font-display font-normal">
        Hello, I'm a DevOps Engineer based in Brisbane, Australia!
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center sm:justify-between sm:items-start">
        <div className="flex flex-col w-3/4 text-center sm:text-left mb-4 sm:mb-0">
          <h1 className="text-3xl font-bold mb-1">Jian Yang Lee</h1>
          <p className="text-sm font-display font-normal">DevOps Engineer (SRE)</p>
        </div>
        <div>
          <img
            src="/images/prof.jpg"
            alt="Profile"
            className="w-28 h-28 rounded-full border-2 border-white object-cover brightness-80"
          />
        </div>
      </div>

      {/* Work Section */}
      <Introduction />
      <Bio />
      <Socials />
    </div>
  );
}
