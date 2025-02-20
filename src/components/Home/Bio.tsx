const Bio = () => {
  return (
    <div className="flex flex-col pb-6">
      <h2 className="text-lg font-bold underline underline-offset-8 my-4 decoration-4 decoration-gray-500">
        Bio
      </h2>
      <div className="flex flex-col gap-2 text-sm font-normal text-justify">
        <div className="flex flex-row gap-4 items-start">
          <span className="font-bold">2000</span>{" "}
          <div className="flex flex-row gap-2 items-center font-display text-justify">
            Born & raised in Subang Jaya, Selangor, Malaysia{" "} 🇲🇾
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <span className="font-bold">2022</span>{" "}
          <div className="flex flex-row gap-2 items-center font-display">
            Completed my Bachelor of Computer Science (Machine Learning) at the
            University of Queensland, Australia{" "} 🇦🇺
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <span className="font-bold">2022</span>{" "}
          <div className="font-display">
            Started working as a Software Engineer at <a
              href="https://algomint.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink hover:underline font-semibold"
            >
              Algomint
            </a>{" "}
            (contract), before going to <a
              href="https://procurepro.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink hover:underline font-semibold"
            >
              ProcurePro
            </a>{" "}
            (full-time)
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <span className="font-bold">2024</span>{" "}
          <div className="font-display">
            Transitioned to a DevOps Engineer at <a
              href="https://www.flightcentre.com.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink hover:underline font-semibold"
            >
              Flight Centre Travel Group
            </a>{" "}
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <span className="font-bold">2025</span>{" "}
          <div className="font-display">
            (? still writing my own story)
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bio;
