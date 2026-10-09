import { Link } from "@tanstack/react-router";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function PageHeader({ title, subpath, slug }: { title: string, subpath: string, slug: string }) {
  return (
    <div className="flex items-center justify-start py-6 gap-1 text-sm">
      <Link
        to="/"
        className="text-mint dark:text-pink font-apple font-bold underline underline-offset-2"
      >
        Home
      </Link>
      <NavigateNextIcon sx={{ fontSize: 20 }} />
      {/* <h2 className="font-semibold text-lg">Automation Inspiration</h2> */}
      <Link
        to={subpath}
        className="text-mint dark:text-pink font-apple font-bold underline underline-offset-2"
      >
        {title}
      </Link>
      {slug && (
        <div className="hidden md:flex flex-row justify-center items-center gap-1">
          <NavigateNextIcon sx={{ fontSize: 20 }} />
          <span className="text-mint dark:text-pink font-apple font-bold underline underline-offset-2">
            {slug}
          </span>
        </div>
      )}
    </div>
  );
}
