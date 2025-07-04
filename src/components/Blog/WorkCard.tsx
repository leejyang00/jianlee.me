import { Link } from "@tanstack/react-router";

interface WorkCardProps {
  imageSrc: string;
  imageAlt: string;
  category: string;
  categoryLink?: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  slug: string;
}

export default function WorkCard({
  imageSrc,
  imageAlt,
  category,
  categoryLink = "#",
  title,
  description,
  date,
  readTime,
  slug,
}: WorkCardProps) {
  return (
    <div>
      <Link to={`/works/${slug}`}>
        <div className="rounded-xl flex flex-col h-full hover:scale-105 transition-all duration-300 hover:text-black/60 dark:hover:text-white/60">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="rounded-sm mb-6 w-full h-40 object-contain bg-white"
          />
          {/* <a
            href={categoryLink}
            className="text-sm text-blue-500 font-semibold underline mb-2"
          >
            {category}
          </a> */}
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          <p className="text-base mb-8 flex-grow">{description}</p>
          <div className="text-xs">
            {date} &nbsp;•&nbsp; {readTime}
          </div>
        </div>
      </Link>
    </div>
  );
}
