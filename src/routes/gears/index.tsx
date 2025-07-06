import PageHeader from "@/shared/PageHeader";
import { createFileRoute } from "@tanstack/react-router";

import { useEffect } from "react";
import ItemDisplay from "@/components/Gears/ItemDisplay";
import { gearsQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { InsertGearBody } from "../../../api/src/routes/type/gearsType";
import LoadingComponent from "@/shared/LoadingComponent";
import ScrollToTop from "@/shared/ScrollToTop";

export const Route = createFileRoute("/gears/")({
  component: ScrollToTop(RouteComponent),
});

function RouteComponent() {
  const { data, isLoading } = useQuery(gearsQueryOptions);

  const gears: InsertGearBody[] = data;

  useEffect(() => {
    document.title = "Gears | Jian";
  }, []);

  return (
    <div className="max-w-4xl m-auto px-8">
      <PageHeader title="Gears" subpath="/gears" slug="" />

      <div className="py-4">
        <h1 className="text-4xl font-bold font-apple mb-6">
          Gear Collection
        </h1>

        <div className="flex flex-col gap-y-4">
          <p className="text-gray-900 dark:text-gray-300 font-apple">
          Here's my gear wonderland! It's a collection of products that I use
          for content creation, productivity, and daily work. The is one never
          ending list, making my wallet go broke. But it's whatever it takes to
          keep my productivity up and content crisp.
          </p>

          <p className="text-gray-900 dark:text-gray-300 font-apple">
          Enjoy! 🎉
          </p>


          <div className="relative p-8 bg-gray-50/50 dark:bg-gray-700 rounded-xl shadow-sm">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-16 bg-blue-500 rounded-full"></div>
            <blockquote className="text-md font-medium text-gray-900 dark:text-gray-100 font-apple leading-relaxed">
            "Be the change that you wish to see in the world."
            </blockquote>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 font-apple italic">
              — Mahatma Gandhi
            </p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <LoadingComponent text="loading gears..." />
      ) : (
        <>
          <h2 className="text-lg font-bold underline underline-offset-8 my-4 decoration-4 decoration-gray-500">
            Filming
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-2 rounded-lg p-4">
            {gears
              .filter((gear) => gear.category === "filming")
              .map((gear) => (
                <ItemDisplay
                  key={gear.title}
                  src={`${gear.image_link}`}
                  title={gear.title}
                  description={gear.description}
                  amazonLink={gear.amazon_link}
                />
              ))}
          </div>

          <h2 className="text-lg font-bold underline underline-offset-8 my-4 decoration-4 decoration-gray-500">
            Productivity
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-2 rounded-lg p-4">
            {gears
              .filter((gear) => gear.category === "productivity")
              .map((gear) => (
                <ItemDisplay
                  key={gear.title}
                  src={`${gear.image_link}`}
                  title={gear.title}
                  description={gear.description}
                  amazonLink={gear.amazon_link}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
}
