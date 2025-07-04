import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import ScrollToTop from "@/shared/ScrollToTop";
import { ASSETS } from "@/shared/Constants";
import PageHeader from "@/shared/PageHeader";
import WorkCard from "@/components/Blog/WorkCard";

export const Route = createFileRoute("/works/")({
  component: ScrollToTop(RouteComponent),
});

function RouteComponent() {
  useEffect(() => {
    document.title = "Works | Jian";
  }, []);

  return (
    <div className="max-w-5xl m-auto px-8 font-apple">
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
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-x-10 gap-y-16">
        <WorkCard
          imageSrc="/path/to/grain.png"
          imageAlt="Grain"
          category="Automation inspiration"
          title="5 ways to automate Grain with Zapier"
          description="With Zapier's automated workflows—called Zaps—you can send highlights and recordings from Grain straight to your business-critical apps."
          date="July 7, 2025"
          readTime="3 min read"
        />
        <WorkCard
          imageSrc="/path/to/woocommerce.png"
          imageAlt="WooCommerce"
          category="Automation inspiration"
          title="7 ways to automate WooCommerce with Zapier"
          description="Though eCommerce apps like WooCommerce make it easy to open your own shop, it's still a lot of work to manage orders and keep business running smoothly."
          date="May 19, 2025"
          readTime="4 min read"
        />
        <WorkCard
          imageSrc="/path/to/browseai.png"
          imageAlt="Browse AI"
          category="Automation inspiration"
          title="5 ways to automate Browse AI with Zapier"
          description="Automate the flow of information from Browse AI directly into your favorite apps, turning a flood of scraped web data into manageable, actionable insights."
          date="June 10, 2025"
          readTime="5 min read"
        />
        <WorkCard
          imageSrc="/path/to/grain.png"
          imageAlt="Grain"
          category="Automation inspiration"
          title="5 ways to automate Grain with Zapier"
          description="With Zapier's automated workflows—called Zaps—you can send highlights and recordings from Grain straight to your business-critical apps."
          date="July 7, 2025"
          readTime="3 min read"
        />
      </div>
    </div>
  );
}
