import { Link } from "@tanstack/react-router";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function PageHeader({ title }: { title: string }) {
  return (
    <div className="flex flex-row items-center justify-start py-4 gap-1">
      <Link
        to="/"
        className="text-mint dark:text-pink hover:underline hover:underline-offset-4 font-display"
      >
        Home
      </Link>
      <NavigateNextIcon sx={{ fontSize: 18 }} />
      <h2 className="font-semibold text-lg">{title}</h2>
    </div>
  );
}
