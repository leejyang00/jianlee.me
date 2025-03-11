import { ASSETS } from "@/shared/Constants";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { booksQueryOptions } from "@/lib/api";

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

  console.log(data, 'data of books from api server');

  useEffect(() => {
    document.title = "Books | Jian";
  }, []);

  return (
    <div className="max-w-xl m-auto px-6">
      <h2 className="text-xl font-bold my-4">Books </h2>
      <p className="text-sm my-4">(in progress... 🚧)</p>
      {/* list of books */}
      <div className="flex flex-col gap-6 font-display">
        <div className="flex flex-row gap-6">
          <img
            src={`${ASSETS.BOOKS}/2041.jpg`}
            alt="2041"
            className="w-24 h-32"
          />
          <div className="flex flex-col">
            <h3 className="text-lg font-bold leading-tight">
              AI 2041: Ten Visions for Our Future
            </h3>
            <p className="text-xs text-gray-500">by Kai-fu Lee, Chen Qiufan</p>
          </div>
        </div>
        <div className="flex flex-row gap-6">
          <img
            src={`${ASSETS.BOOKS}/2041.jpg`}
            alt="2041"
            className="w-24 h-32"
          />
          <div className="flex flex-col">
            <h3 className="text-lg font-bold leading-tight">
              AI 2041: Ten Visions for Our Future
            </h3>
            <p className="text-xs text-gray-500">by Kai-fu Lee, Chen Qiufan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
