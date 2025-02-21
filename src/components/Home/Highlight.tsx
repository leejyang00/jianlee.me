import { ASSETS } from "@/shared/Constants";
import { Link } from "@tanstack/react-router";

const Highlight = () => {
  return (
    <div className="flex flex-col pb-6">
      <h2 className="text-lg font-bold underline underline-offset-8 my-4 decoration-4 decoration-gray-500">
        Highlights
      </h2>

      {/* Grid of Works */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6 py-4">
        <div className="flex flex-col gap-2 items-center justify-center">
          <img
            src={`${ASSETS.IMAGES}/gbrgroup.png`}
            alt="Work 1"
            className="rounded-lg w-full md:h-44 h-52 object-cover"
          />
          <div className="mt-2 gap-1 flex flex-col items-center justify-center">
            <h3 className="text-lg font-medium font-display">GBR Group Co</h3>
            <p className="text-xs/relaxed font-normal font-display text-center mx-2">
              A corporate website designed and built to launch, showcasing
              the brand's new values and offerings, {" "}<Link to="/works/gbrgroupco">{" "}<span className="underline font-semibold">read more</span></Link>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center justify-center">
          <img
            src={`${ASSETS.IMAGES}/pacemates.jpg`}
            alt="Work 1"
            className="rounded-lg w-full md:h-44 h-52 object-cover"
          />
          <div className="mt-2 gap-1 flex flex-col items-center justify-center">
            <h3 className="text-lg font-medium font-display">
              Pacemates Run Club
            </h3>
            <p className="text-xs/relaxed font-normal text-center font-display mx-2">
              Founded in the heart of Brisbane, dedicated to inspiring and
              empowering runners with every stride, <Link to="/works/pacemates">{" "}<span className="underline font-semibold">read more</span></Link>
            </p>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Highlight;
