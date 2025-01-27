const Bio = () => {
  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-bold underline underline-offset-8 my-4 decoration-4 decoration-gray-500">
          Bio
        </h2>
        <div className="flex flex-col gap-2 text-sm text-justify ">
          <div className="flex flex-row gap-4 items-center">
            <span className="font-bold">2000</span>{" "}
            <div className="flex flex-row gap-2 items-center font-text font-normal">
              Born & raised in Subang Jaya, Selangor, Malaysia{" "}
              <img
                src="/images/my.png"
                title="Malaysia"
                alt="Malaysia"
                className="w-8"
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <span className="font-bold">2022</span>{" "}
            <div className="flex flex-row gap-2 items-center font-text font-normal">
              Completed Bachelor of Computer Science (Machine Learning) at
              University of Queensland, Australia{" "}
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <span className="font-bold">2022</span>{" "}
            <div className="font-text font-normal">
              Got my first job as a Software Engineer, worked at Algomint (using
              Algorand Blockchain) and ProcurePro (ConTech)
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <span className="font-bold">2024</span>{" "}
            <div className="font-text font-normal">
              Started working as a DevOps Engineer at Flight Centre Travel Group
            </div>
          </div>
        </div>
      </div>
  )
}

export default Bio;
