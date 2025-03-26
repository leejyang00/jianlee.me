import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";

interface ItemDisplayProps {
  src: string;
  title: string;
  description: string;
  amazonLink: string;
}

export default function ItemDisplay({
  src,
  title,
  description,
  amazonLink,
}: ItemDisplayProps) {
  return (
    <a
      href={amazonLink}
      target="_blank"
      rel="noopener noreferrer"
      className="transform transition-transform hover:scale-105"
    >
      <div className="flex flex-col items-center justify-center gap-y-6 p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 shadow-sm hover:shadow-md transition-shadow">
        <div className="relative w-full h-40 overflow-hidden rounded-lg bg-white">
          <img src={src} alt={title} className="w-full h-full object-contain" />
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <div className="text-black dark:text-white font-bold text-lg flex items-center justify-between">
            <span>{title}</span>
            <LaunchRoundedIcon
              className="text-gray-500 dark:text-gray-400"
              sx={{ fontSize: 20 }}
            />
          </div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>
    </a>
  );
}
