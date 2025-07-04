interface WorkCardProps {
  imageSrc: string;
  imageAlt: string;
  category: string;
  categoryLink?: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
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
}: WorkCardProps) {
  return (
    <div className="rounded-xl flex flex-col h-full">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="rounded-lg mb-6 w-full h-40 object-contain bg-white"
      />
      <a
        href={categoryLink}
        className="text-sm text-blue-300 font-semibold underline mb-2"
      >
        {category}
      </a>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <p className="text-base text-gray-200 mb-8 flex-grow">{description}</p>
      <div className="text-xs text-gray-300">
        {date} &nbsp;•&nbsp; {readTime}
      </div>
    </div>
  );
} 
