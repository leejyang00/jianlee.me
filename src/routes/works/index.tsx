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
    <div className="max-w-5xl m-auto px-6 font-apple">
      <PageHeader title="Works" />

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-4 lg:gap-6">
        <h1 className="py-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold font-apple text-center lg:text-left w-full lg:w-auto">
          Automation Inspiration
        </h1>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center lg:justify-end items-center w-full lg:w-auto">
          <div className="text-xs sm:text-sm py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 dark:border-gray-700 w-full sm:w-auto min-w-[120px] text-center">
            GBR Group Co
          </div>
          <div className="text-xs sm:text-sm py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 dark:border-gray-700 w-full sm:w-auto min-w-[120px] text-center">
            GBR Group Co
          </div>
        </div>
      </div>

      {/* here is the works */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4">
        {/* Card 1 */}
        <div className="rounded-xl p-6 flex flex-col h-full">
          <img
            src="/path/to/grain.png"
            alt="Grain"
            className="rounded-lg mb-6 w-full h-40 object-contain bg-white"
          />
          <a
            href="#"
            className="text-sm text-blue-300 font-semibold underline mb-2"
          >
            Automation inspiration
          </a>
          <h2 className="text-xl font-bold mb-4 h-16">
            5 ways to automate Grain with Zapier
          </h2>
          <p className="text-base text-gray-200 mb-8 flex-grow h-30">
            With Zapier's automated workflows—called Zaps—you can send
            highlights and recordings from Grain straight to your
            business-critical apps.
          </p>
          <div className="text-xs text-gray-300">
            July 7, 2025 &nbsp;•&nbsp; 3 min read
          </div>
        </div>
        {/* Card 2 */}
        <div className="rounded-xl p-6 flex flex-col h-full">
          <img
            src="/path/to/woocommerce.png"
            alt="WooCommerce"
            className="rounded-lg mb-6 w-full h-40 object-contain bg-white"
          />
          <a
            href="#"
            className="text-sm text-blue-300 font-semibold underline mb-2"
          >
            Automation inspiration
          </a>
          <h2 className="text-xl font-bold mb-4 h-16">
            7 ways to automate WooCommerce with Zapier
          </h2>
          <p className="text-base text-gray-200 mb-8 flex-grow h-30">
            Though eCommerce apps like WooCommerce make it easy to open your own
            shop, it's still a lot of work to manage orders and keep business
            running smoothly.
          </p>
          <div className="text-sm text-gray-300">
            By Wren Noble &nbsp;•&nbsp; 4 min read
          </div>
        </div>
        {/* Card 3 */}
        <div className="rounded-xl p-6 flex flex-col h-full">
          <img
            src="/path/to/browseai.png"
            alt="Browse AI"
            className="rounded-lg mb-6 w-full h-40 object-contain bg-white"
          />
          <a
            href="#"
            className="text-sm text-blue-300 font-semibold underline mb-2"
          >
            Automation inspiration
          </a>
          <h2 className="text-xl font-bold mb-4 h-16">
            5 ways to automate Browse AI with Zapier
          </h2>
          <p className="text-base text-gray-200 mb-8 flex-grow h-30">
            Automate the flow of information from Browse AI directly into your
            favorite apps, turning a flood of scraped web data into manageable,
            actionable insights.
          </p>
          <div className="text-sm text-gray-300">
            By Michael Toth &nbsp;•&nbsp; 4 min read
          </div>
        </div>
      </div>
    </div>
  );
}
