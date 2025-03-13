import { InsertBookBody } from "@api/routes/type/booksType";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";

export default function BookDisplay({ book }: { book: InsertBookBody }) {
  return (
    <div className="flex flex-row gap-6">
      <img src={book.thumbnail} alt={book.title} className="w-24 h-32" />
      <div className="flex flex-col w-full gap-1">
        <h3 className="flex flex-row text-lg font-bold items-center leading-tight gap-3">
          <div className="hover:underline hover:cursor-pointer">
            <a
              href={book.affiliate_link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline font-bold flex flex-row items-center gap-1"
            >
              {book.title}
            </a>
          </div>
          <LaunchRoundedIcon sx={{ fontSize: 13 }} className="inline" />
        </h3>
        <p className="text-xs font-bold">{book.subtitle}</p>
        <div className="mt-1">
          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            by {book.authors.name.join(", ")}
          </div>
          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 flex flex-row justify-start items-center gap-1">
            {book.page_count} pages · {book.published_date} published
          </div>
        </div>
      </div>
    </div>
  );
}
