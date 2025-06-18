import { ASSETS } from "@/shared/Constants";
import { Link } from "@tanstack/react-router";

const Highlight = () => {
  return (
    <div className="flex flex-col pb-6">
      <h2 className="text-lg font-bold underline underline-offset-8 my-4 decoration-4 decoration-gray-500">
        Highlights
      </h2>

      <div className="space-y-8 py-4">
        <div className="relative group cursor-pointer">
          <Link to="/works/gbrgroupco" className="block">
            <div className="aspect-[3/2] md:aspect-[16/9] overflow-hidden rounded-xl">
              <img
                src={`${ASSETS.IMAGES}/gbrgroup.png`}
                alt="GBR Group Blog Post"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-xl" />
            </div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              {/* <span className="text-xs tracking-wider text-pink font-apple">
                FEATURED
              </span> */}
              <h2 className="text-xl font-bold mt-2 font-apple">
                GBR Group Co
              </h2>
              <p className="text-sm mt-2 text-gray-200 max-w-xl font-apple">
                A corporate website designed and built to launch, showcasing the
                brand's new values and offerings.
              </p>
              <div className="flex justify-between items-center gap-4 mt-4">
                <span className="text-xs text-gray-300 font-apple">
                  Jan 15, 2024
                </span>
                <Link
                  to="/works/gbrgroupco"
                  className="text-xs font-medium text-pink hover:text-pink/80 transition-colors font-apple"
                >
                  Read Story →
                </Link>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Grid of Works */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6 py-4">
        <div className="flex flex-col gap-2 items-center justify-center">
          <img
            src={`${ASSETS.IMAGES}/gbrgroup.png`}
            alt="Work 1"
            className="rounded-lg w-full md:h-44 h-52 object-cover"
          />
          <div className="mt-2 gap-1 flex flex-col items-center justify-center">
            <h3 className="text-lg font-medium font-sans">GBR Group Co</h3>
            <p className="text-xs/relaxed font-normal font-apple text-center mx-2">
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
            <h3 className="text-lg font-medium font-apple">
              Pacemates Run Club
            </h3>
            <p className="text-xs/relaxed font-normal text-center font-apple mx-2">
              Founded in the heart of Brisbane, dedicated to inspiring and
              empowering runners with every stride, <Link to="/works/pacemates">{" "}<span className="underline font-semibold">read more</span></Link>
            </p>
          </div>
        </div>
      </div> */}
    </div >
  );
};

export default Highlight;
