import { ASSETS } from "@/shared/Constants";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { booksQueryOptions } from "@/lib/api";
import { InsertBookBody } from "../../../api/src/routes/type/booksType";
export const Route = createFileRoute("/books/")({
  component: RouteComponent,
});

const ListOfBooks = [
  {
    title: "AI 2041: Ten Visions for Our Future",
    author: "Kai-fu Lee, Chen Qiufan",
    image: `${ASSETS.BOOKS}/2041.jpg`,
  },
];

function RouteComponent() {
  const { data } = useQuery(booksQueryOptions);

  const books: InsertBookBody[] = data;

  useEffect(() => {
    document.title = "Books | Jian";
  }, []);

  return (
    <div className="max-w-xl m-auto px-6">
      <h2 className="text-xl font-bold my-4">Books </h2>
      <p className="text-sm my-4">(in progress... 🚧)</p>
      {/* list of books */}
      <div className="flex flex-col gap-6 font-display">
        {books?.map((book) => (
          <div className="flex flex-row gap-6">
            <img
              src={book.thumbnail}
              alt={book.title}
              className="w-24 h-32"
            />
            <div className="flex flex-col w-full gap-1">
              <h3 className="text-lg font-bold leading-tight">
                {book.title}
              </h3>
              <p className="text-sm font-medium">{book.subtitle}</p>
              <p className="text-xs font-medium text-gray-500">by {book.authors.name.join(", ")}</p>
              <p className="text-xs font-medium text-gray-500">Published: {book.published_date}</p>
              <p className="text-xs font-medium text-gray-500">Page count: {book.page_count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
