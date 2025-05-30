import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "@tanstack/react-router";

interface ArticleProps {
  title: string;
  date: string;
  children: React.ReactNode;
}

function Article({ title, date, children }: ArticleProps) {
  return (
    <div className="max-w-xl m-auto px-6">
      {/* Navigation Section */}
      <div className="flex flex-row items-center justify-start py-4 gap-1">
        <Link to="/" className="text-mint dark:text-pink hover:underline hover:underline-offset-4 font-apple">Home</Link>
        <NavigateNextIcon sx={{ fontSize: 18 }} />
        <h2 className="font-semibold text-lg">{title}</h2>
        <div className="ml-2 text-xs font-bold px-1 bg-slate-300 dark:bg-slate-600 rounded-sm">{date}</div>
      </div>

      <div className="font-apple">{children}</div>
    </div>
  );
}

export default Article;
