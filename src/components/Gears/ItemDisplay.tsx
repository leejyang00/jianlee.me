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
      <div className="flex flex-col items-center justify-center gap-y-6 p-6 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="relative w-full h-48 overflow-hidden rounded-lg">
          <img src={src} alt={title} className="w-full h-full object-contain" />
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <div className="text-black font-bold text-lg flex items-center justify-between">
            <span>{title}</span>
            <LaunchRoundedIcon
              className="text-gray-500"
              sx={{ fontSize: 20 }}
            />
          </div>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </a>
  );
}
