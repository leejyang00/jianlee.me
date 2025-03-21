import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { booksQueryOptions } from "@/lib/api";
import { InsertBookBody } from "../../../api/src/routes/type/booksType";
import PageHeader from "@/shared/PageHeader";
import BookDisplay from "@/components/Books/BookDisplay";
import LoadingComponent from "@/shared/LoadingComponent";

export const Route = createFileRoute("/books/")({
  component: RouteComponent,
});

const BOOK_YEARS = [2025, 2024, 2023, 2022, 2021, 2020];

const BookYearsComponent = ({ books }: { books: InsertBookBody[] }) => {
  return BOOK_YEARS.map((year) => (
    <div key={year}>
      <h2 className="text-lg font-bold my-4 text-center flex items-center justify-center">
        <span className="h-[2px] w-12 bg-gray-400 mr-4"></span>
        {year}
        <span className="h-[2px] w-12 bg-gray-400 ml-4"></span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6 py-4">
        {books
          ?.filter((book) => book.read_at === year)
          .map((book) => <BookDisplay key={book.volume_id} book={book} />)}
      </div>
    </div>
  ));
};

function RouteComponent() {
  const { data, isLoading } = useQuery(booksQueryOptions);

  const books: InsertBookBody[] = data;

  useEffect(() => {
    document.title = "Books | Jian";
  }, []);

  return (
    <div className="max-w-2xl m-auto px-6">
      <PageHeader title="Books" />

      <div className="flex flex-col py-4 gap-y-4">
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
      {isLoading ? <LoadingComponent /> : <BookYearsComponent books={books} />}
    </div>
  );
}
