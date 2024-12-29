import { createLazyFileRoute } from "@tanstack/react-router";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-xl m-auto px-4">
      {/* Hello Section */}
      <div className="text-center text-sm bg-[#f5f0e8] dark:bg-[#313134] rounded-lg p-2 my-6">
        Hello, I'm a DevOps Engineer based in Brisbane, Australia!
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center sm:justify-between sm:items-start">
        <div className="flex flex-col w-3/4 text-center sm:text-left mb-4 sm:mb-0">
          <h1 className="text-3xl font-bold mb-1">Jian Yang Lee</h1>
          <p className="text-sm">DevOps Engineer (SRE)</p>
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
      <div className="flex flex-col">
        <h2 className="text-lg font-bold underline underline-offset-8 my-4 decoration-4 decoration-gray-500">
          Work
        </h2>
        <div className="text-sm text-justify leading-relaxed indent-8">
          Takuya is a freelance and a full-stack developer based in Osaka with a
          passion for building digital services/stuff he wants. He has a knack
          for all things launching products, from planning and designing all the
          way to solving real-life problems with code. When not online, he loves
          hanging out with his camera. Currently, he is living off of his own
          product called Inkdrop. He publishes content for marketing his
          products and his YouTube channel called "Dev as Life" has more than
          100k subscribers.
        </div>
        <div className="flex justify-center">
          <button className="bg-[#339995] text-[#eeefef] rounded-lg py-2 px-4 my-2 text-sm font-semibold flex items-center gap-2">
            <div className="flex items-center justify-center gap-2">
              My Portfolio{" "}
              <KeyboardArrowRightRoundedIcon sx={{ fontSize: 16 }} />
            </div>
          </button>
        </div>
      </div>

      {/* Bio Section */}
      <div className="flex flex-col">
        <h2 className="text-lg font-bold underline underline-offset-8 my-4 decoration-4 decoration-gray-500">
          Bio
        </h2>
        <div className="flex flex-col gap-1 text-sm text-justify ">
          <div className="flex flex-row gap-4">
            <span className="font-bold">2000</span>{" "}
            <div className="">
              Born & raised in Subang Jaya, Selangor, Malaysia
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <span className="font-bold">2022</span>{" "}
            <div className="">
              Completed Bachelor of Computer Science Majoring in Machine
              Learning at University of Queensland (UQ)
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <span className="font-bold">2022</span>{" "}
            <div className="">
              Got my first job as a Software Engineer, worked at Algomint (using Algorand Blockchain) and ProcurePro (ConTech)
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <span className="font-bold">2024</span>{" "}
            <div className="">
              Started working as a DevOps Engineer at Flight Centre Travel Group
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
