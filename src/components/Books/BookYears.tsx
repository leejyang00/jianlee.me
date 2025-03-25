import { InsertBookBody } from "@api/routes/type/booksType";

import BookDisplay from "./BookDisplay";

const BOOK_YEARS = [2025, 2024, 2023, 2022, 2021, 2020];

const BookYears = ({ books }: { books: InsertBookBody[] }) => {
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

export default BookYears;
