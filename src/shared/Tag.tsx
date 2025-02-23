function Tag({ tag }: { tag: string }) {
  return (
    <span className="font-sans bg-[#c6f7d4] text-[#22553c] dark:text-[#9be6b5] dark:bg-[#2d4a43] text-xxs font-semibold px-1 rounded text-center mr-2 w-fit">
      {tag}
    </span>
  );
}

export default Tag;
