const Bio = () => {
  return (
    <div className="flex flex-col pb-4">
      <h2 className="text-lg font-bold underline underline-offset-8 my-4 decoration-4 decoration-gray-500">
        Bio
      </h2>
      <div className="flex flex-col gap-2 text-sm font-normal">
        <div className="flex flex-row gap-4 items-start">
          <span className="font-bold">2000</span>{" "}
          <div className="flex flex-row gap-2 items-center font-display">
            Born & raised in Subang Jaya, Selangor, Malaysia{" "} 🇲🇾
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <span className="font-bold">2022</span>{" "}
          <div className="flex flex-row gap-2 items-center font-display">
            Completed Bachelor of Computer Science (Machine Learning) at
            University of Queensland, Australia{" "}
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <span className="font-bold">2022</span>{" "}
          <div className="font-display">
            Got my first job as a Software Engineer, worked at Algomint (using
            Algorand Blockchain) and ProcurePro (ConTech)
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <span className="font-bold">2024</span>{" "}
          <div className="font-display">
            Started working as a DevOps Engineer at Flight Centre Travel Group
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bio;
