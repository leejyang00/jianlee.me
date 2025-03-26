import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import ScrollToTop from "@/shared/ScrollToTop";
import { ASSETS } from "@/shared/Constants";
import PageHeader from "@/shared/PageHeader";

export const Route = createFileRoute("/works/")({
  component: ScrollToTop(RouteComponent),
});

function RouteComponent() {
  useEffect(() => {
    document.title = "Works | Jian";
  }, []);

  return (
    <div className="max-w-xl m-auto px-6">
      <PageHeader title="Works" />

      {/* Grid of Works */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6 py-4">
        <div className="flex flex-col gap-2 items-center justify-center">
          <img
            src={`${ASSETS.IMAGES}/gbrgroup.png`}
            alt="Work 1"
            className="rounded-lg w-full md:h-44 h-52 object-cover"
          />
          <div className="mt-2 gap-1 flex flex-col items-center justify-center">
            <h3 className="text-lg font-medium font-sans">GBR Group Co</h3>
            <p className="text-xs/relaxed font-normal font-apple text-center mx-2">
              A corporate website designed and built to launch, showcasing the
              brand's new values and offerings,{" "}
              <Link to="/works/gbrgroupco">
                {" "}
                <span className="underline font-semibold">read more</span>
              </Link>
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
            <h3 className="text-lg font-medium font-sans">
              Pacemates Run Club
            </h3>
            <p className="text-xs/relaxed font-normal text-center font-apple mx-2">
              Founded in the heart of Brisbane, dedicated to inspiring and
              empowering runners with every stride,{" "}
              <Link to="/works/pacemates">
                {" "}
                <span className="underline font-semibold">read more</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
