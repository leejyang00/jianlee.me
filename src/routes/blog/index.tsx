import PageHeader from "@/shared/PageHeader";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { ASSETS } from "@/shared/Constants";
import ScrollToTop from "@/shared/ScrollToTop";

export const Route = createFileRoute("/blog/")({
  component: ScrollToTop(RouteComponent),
});

function RouteComponent() {

  useEffect(() => {
    document.title = "Blog | Jian";
  }, []);

  return (
    <div className="max-w-2xl m-auto px-4">
      <PageHeader title="Blog" />
      <div className="py-4">
        <h1 className="text-4xl font-bold font-apple mb-6">
          Stories & Insights
        </h1>
        <p className="text-gray-900 dark:text-gray-300 font-apple">
          Exploring design, development, and creative journeys through
          thoughtful narratives.
        </p>
      </div>

      <div className="space-y-8 py-4 ">
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

        <div className="relative group cursor-pointer">
          <Link to="/works/pacemates" className="block">
            <div className="aspect-[3/2] md:aspect-[16/9] overflow-hidden rounded-xl">
              <img
                src={`${ASSETS.IMAGES}/pacemates.jpg`}
                alt="GBR Group Blog Post"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent rounded-xl" />
            </div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              {/* <span className="text-xs tracking-wider text-pink font-apple">
                FEATURED
              </span> */}
              <h2 className="text-xl font-bold mt-2 font-apple">
                Pacemates Run Club
              </h2>
              <p className="text-sm mt-2 text-gray-200 max-w-xl font-apple">
                Founded in the heart of Brisbane, dedicated to inspiring and
                empowering runners with every stride.
              </p>
              <div className="flex justify-between items-center gap-4 mt-4">
                <span className="text-xs text-gray-300 font-apple">
                  Jan 15, 2024
                </span>
                <Link
                  to="/works/pacemates"
                  className="text-xs font-medium text-pink hover:text-pink/80 transition-colors font-apple"
                >
                  Read Story →
                </Link>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
