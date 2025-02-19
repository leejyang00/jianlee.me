import { Link } from "@tanstack/react-router";

const Highlight = () => {
  return (
    <div className="flex flex-col pb-6">
      <h2 className="text-lg font-bold underline underline-offset-8 my-4 decoration-4 decoration-gray-500">
        Highlights
      </h2>

      {/* Grid of Works */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6 py-4">
        <Link to="/works/gbrgroupco">
          <div className="flex flex-col gap-2 items-center justify-center">
            <img
              src="/images/gbrgroup.png"
              alt="Work 1"
              className="rounded-lg w-full md:h-44 h-52 object-cover"
            />
            <div className="mt-2 gap-1 flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium font-display">GBR Group Co</h3>
              <p className="text-xs/relaxed font-normal font-display text-center mx-2">
                A corporate website designed and built to launch, showcasing
                the brand's new values and offerings
              </p>
            </div>
          </div>
        </Link>
        <Link to="/works/pacemates">
          <div className="flex flex-col gap-2 items-center justify-center">
            <img
              src="/images/pacemates.jpg"
              alt="Work 1"
              className="rounded-lg w-full md:h-44 h-52 object-cover"
            />
            <div className="mt-2 gap-1 flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium font-display">
                Pacemates Run Club
              </h3>
              <p className="text-xs/relaxed font-normal font-display text-center mx-2">
                {/* Founder of the running club hosted in the heart of Brisbane,
                organized and led by the founder of Pacemates Run Club */}
                Founded in the heart of Brisbane, dedicated to inspiring and
                empowering runners with every stride
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Highlight;
