import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { booksQueryOptions } from "@/lib/api";
import { InsertBookBody } from "../../../api/src/routes/type/booksType";
import PageHeader from "@/shared/PageHeader";

import LoadingComponent from "@/shared/LoadingComponent";
import BookYears from "@/components/Books/BookYears";

export const Route = createFileRoute("/books/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQuery(booksQueryOptions);

  const books: InsertBookBody[] = data;

  useEffect(() => {
    document.title = "Books | Jian";
  }, []);

  return (
    <div className="max-w-2xl m-auto px-6">
      <PageHeader title="Books" />

      <div className="flex flex-col py-2 gap-y-4">
        <p className="text-sm font-display text-justify">
          <span className="font-bold">
            "Not all readers are leaders, but all leaders are readers."
          </span>{" "}
          — Harry S. Truman
        </p>

        <p className="text-sm indent-4 font-display text-justify">
          My collection of books that I've read that has shaped my life over the
          years. I enjoy reading them + writing wasn't my best skills, which was
          why I started collecting them! I've organized them by the year I've
          read them, hope you enjoy them as much as I do.
        </p>

        <p className="text-sm indent-4 font-display text-justify">
          The topics that interests me are{" "}
          <span>
            <span className="font-medium underline decoration-2 underline-offset-2">
              Philosophy
            </span>
            ,{" "}
            <span className="font-medium underline decoration-2 underline-offset-2">
              Business & Entrepreneurship
            </span>
            ,{" "}
            <span className="font-medium underline decoration-2 underline-offset-2">
              Tech & AI
            </span>
            ,{" "}
            <span className="font-medium underline decoration-2 underline-offset-2">
              Leadership
            </span>
            , and{" "}
            <span className="font-medium underline decoration-2 underline-offset-2">
              Biographies
            </span>
            .
          </span>
        </p>

        <p className="text-sm font-display text-justify">
        Discover your next great read - each title links directly to Amazon 📚
        </p>
      </div>

      {/* list of books */}
      {isLoading ? <LoadingComponent /> : <BookYears books={books} />}
    </div>
  );
}
