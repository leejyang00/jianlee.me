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

function RouteComponent() {
  const { data, isLoading } = useQuery(booksQueryOptions);

  const books: InsertBookBody[] = data;

  useEffect(() => {
    document.title = "Books | Jian";
  }, []);

  return (
    <div className="max-w-2xl m-auto px-6">
      <PageHeader title="Books" />

      <p className="text-sm my-4 font-display text-justify">
        <span className="font-bold">
          "Not all readers are leaders, but all leaders are readers."
        </span>{" "}
        — Harry S. Truman
      </p>

      <p className="text-sm my-4 indent-4 font-display text-justify">
        My collection of books that I've read that has shaped my life over the
        years. I enjoy reading them + writing wasn't my best skills, which was
        why I started collecting them! Hope you enjoy them as much as I do.
      </p>

      <p className="text-sm my-4 indent-4 font-display text-justify">
        The topics that interests me are Philosophy, Business &
        Entrepreneurship, Tech & AI, Leadership, and Biographies.
      </p>

      <p className="text-xs my-4 italic font-display text-justify">
        Feel free to click on them to grab a copy on Amazon if it interests you{" "}
        <span className="not-italic text-sm ml-1">😉</span>
      </p>

      {/* list of books */}
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-6 py-6">
          {books?.map((book) => (
            <BookDisplay key={book.volume_id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
