interface Props {
  icon: React.ReactNode;
  label: string;
  href: string;
}

export default function SocialButton(props: Props) {
  const { icon, label, href } = props;

  return (
    <div className="text-[#339995] dark:text-[#80e7d9] text-sm font-semibold  w-fit">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:bg-[#a3e4d7]/30 hover:dark:bg-[#339995]/30 hover:cursor-pointer transition-all duration-300 py-2 px-4 rounded-md"
      >
        <span className="text-black dark:text-[#f5f0e8]">{icon}</span>{label}
      </a>
    </div>
  );
}
