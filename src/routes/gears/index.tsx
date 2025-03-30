import PageHeader from "@/shared/PageHeader";
import { createFileRoute } from "@tanstack/react-router";

import { useEffect } from "react";
import ItemDisplay from "@/components/Gears/ItemDisplay";
import { gearsQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { InsertGearBody } from "../../../api/src/routes/type/gearsType";
import LoadingComponent from "@/shared/LoadingComponent";

export const Route = createFileRoute("/gears/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQuery(gearsQueryOptions);

  const gears: InsertGearBody[] = data;

  useEffect(() => {
    document.title = "Gears | Jian";
  }, []);

  return (
    <div className="max-w-2xl m-auto px-6">
      <PageHeader title="Gears" />

      <div className="flex flex-col py-2 gap-y-4">
        {/* // Quote */}
        <p className="text-sm font-apple text-justify">
          <span className="font-bold">
            "The size of your library is inversely proportional to the size of
            your wallet."
          </span>{" "}
          — Jian Lee
        </p>

        <p className="text-sm font-apple text-justify indent-4">
          Here's my gear wonderland! It's a collection of products that I use
          for content creation, productivity, and daily work. The is one never
          ending list, making my wallet go broke. But it's whatever it takes to
          keep my productivity up and content crisp.
        </p>

        <p className="text-sm font-apple text-justify">Enjoy! 🎉</p>
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
