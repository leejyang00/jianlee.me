import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import ScrollToTop from "@/shared/ScrollToTop";
import PageHeader from "@/shared/PageHeader";
import WorkCard from "@/components/Blog/WorkCard";
import {
  getMarkdownDatabaseQuery,
} from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/works/")({
  component: ScrollToTop(RouteComponent),
});

function RouteComponent() {
  useEffect(() => {
    document.title = "Works | Jian";
  }, []);

  const {
    data: markdownData,
    isLoading,
    error,
  } = useQuery(getMarkdownDatabaseQuery);

  return (
    <div className="max-w-5xl m-auto px-8 font-apple">
      <PageHeader title="Works" />

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-4 lg:gap-6">
        <h1 className="py-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold font-apple text-center lg:text-left w-full lg:w-auto">
          Automation Inspiration
        </h1>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center lg:justify-end items-center w-full lg:w-auto">
          <div className="text-xs sm:text-sm py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 dark:border-gray-700 w-full sm:w-auto min-w-[120px] text-center">
            Sort by
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-x-10 gap-y-16">
          <div className="animate-pulse">
            <div className="h-40 w-full bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-10 text-center text-red-500">
          Error: {error.message}
        </div>
      )}

      {markdownData && (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-x-10 gap-y-16">
          {markdownData.map((post) => (
            <WorkCard
              key={post.id}
              imageSrc={post.image}
              imageAlt={post.title}
              title={post.title}
              description={post.description}
              date={post.date}
              readTime={post.read_time}
              slug={post.slug}
            />
          ))}
        </div>
      )}
    </div>
  );
}
