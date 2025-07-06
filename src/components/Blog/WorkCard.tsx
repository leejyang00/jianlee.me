import { formatDate } from "@/lib/formatDate";
import { ASSETS } from "@/shared/Constants";
import { Link } from "@tanstack/react-router";

interface WorkCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  slug: string;
}

export default function WorkCard({
  imageSrc,
  imageAlt,
  title,
  description,
  date,
  readTime,
  slug,
}: WorkCardProps) {
  return (
    <div>
      <Link to={`/projects/${slug}`}>
        <div className="rounded-xl flex flex-col h-full hover:scale-105 transition-all duration-300 hover:text-black/60 dark:hover:text-white/60">
          <img
            src={`${ASSETS.IMAGES}/${imageSrc}`}
            alt={imageAlt}
            className="rounded-sm mb-6 w-full h-40 object-cover"
          />
          {/* <a
            href={categoryLink}
            className="text-sm text-blue-500 font-semibold underline mb-2"
          >
            {category}
          </a> */}
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          <p className="text-md mb-8 flex-grow">{description}</p>
          <div className="text-xs">
            {formatDate(date)} &nbsp;•&nbsp; {readTime} mins read
          </div>
        </div>
      </Link>
    </div>
  );
}
