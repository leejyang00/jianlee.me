import { Link } from "@tanstack/react-router";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function PageHeader({ title }: { title: string }) {
  return (
    <div className="flex flex-row items-center justify-start py-6 gap-1 text-sm">
      <Link
        to="/"
        className="text-mint dark:text-pink font-apple font-bold underline underline-offset-2"
      >
        Home
      </Link>
      <NavigateNextIcon sx={{ fontSize: 20 }} />
      {/* <h2 className="font-semibold text-lg">Automation Inspiration</h2> */}
      <Link
        to="/works"
        className="text-mint dark:text-pink font-apple font-bold underline underline-offset-2"
      >
        {title}
      </Link>
    </div>
  );
}
