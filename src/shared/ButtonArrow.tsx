import { Link } from "@tanstack/react-router";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

type ButtonArrowProps = {
  to: string;
  text: string;
};

function ButtonArrow({ to, text }: ButtonArrowProps) {
  return (
    <Link to={to}>
      <button className="bg-[#339995] text-[#eeefef] dark:bg-[#80e7d9] hover:bg-[#339995]/80 dark:hover:bg-[#80e7d9]/80 dark:text-[#313134] transition-all duration-300 rounded-lg py-2 px-4 my-2 text-sm font-semibold flex items-center gap-2 shadow-md">
        <div className="flex items-center justify-center gap-2">
          {text} <KeyboardArrowRightRoundedIcon sx={{ fontSize: 16 }} />
        </div>
      </button>
    </Link>
  );
}

export default ButtonArrow;
