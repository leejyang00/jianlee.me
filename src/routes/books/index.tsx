import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { booksQueryOptions } from "@/lib/api";
import { InsertBookBody } from "../../../api/src/routes/type/booksType";
import PageHeader from "@/shared/PageHeader";

import LoadingComponent from "@/shared/LoadingComponent";
import BookYears from "@/components/Books/BookYears";
import ScrollToTop from "@/shared/ScrollToTop";

export const Route = createFileRoute("/books/")({
  component: ScrollToTop(RouteComponent),
});

function RouteComponent() {
  const { data, isLoading } = useQuery(booksQueryOptions);

  const books: InsertBookBody[] = data;

  useEffect(() => {
    document.title = "Books | Jian";
  }, []);

  return (
    <div className="max-w-4xl m-auto px-8">
      <PageHeader title="Books" />

      <div className="py-4">
        <h1 className="text-4xl font-bold font-apple mb-6">
          Reading List
        </h1>

        <div className="flex flex-col gap-y-4">
          <p className="text-gray-900 dark:text-gray-300 font-apple">
            My collection of books that I've read that has shaped my life over
            the years. I enjoy reading them + writing wasn't my best skills,
            which was why I started collecting them! I've organized them by the
            year I've read them, hope you enjoy them as much as I do.
          </p>

          <p className="text-gray-900 dark:text-gray-300 font-apple">
            The topics that interests me are Philosophy, Business &
            Entrepreneurship, Tech & AI, Leadership, and Biographies.
          </p>

          <p className="text-gray-900 dark:text-gray-300 font-apple">
            Discover your next great read - each title links directly to Amazon
            📚
          </p>
          <div className="relative p-8 bg-gray-50/50 dark:bg-gray-700 rounded-xl shadow-sm">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-16 bg-blue-500 rounded-full"></div>
            <blockquote className="text-md font-medium text-gray-900 dark:text-gray-100 font-apple leading-relaxed">
              "Not all readers are leaders, but all leaders are readers."
            </blockquote>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 font-apple italic">
              — Harry S. Truman
            </p>
          </div>
        </div>
      </div>

      {/* list of books */}
      {isLoading ? <LoadingComponent /> : <BookYears books={books} />}
    </div>
  );
}
