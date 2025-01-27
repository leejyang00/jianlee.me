import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

const Introduction = () => {
  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-bold underline underline-offset-8 my-4 decoration-4 decoration-gray-500">
        Work
      </h2>
      <div className="text-sm text-justify leading-[1.7] indent-8 font-display font-normal">
        Jian is a DevOps Engineer based in Brisbane, Australia with a passion
        for building digital services/stuff he wants. He has a knack for all
        things launching products, from planning and designing all the way to
        solving real-life problems with code. When not online, he loves hanging
        out with his camera. Currently, he is living off of his own product
        called Inkdrop. He publishes content for marketing his products and his
        YouTube channel called "Dev as Life" has more than 100k subscribers.
      </div>
      <div className="flex justify-center mt-4">
        <button className="bg-[#339995] text-[#eeefef] dark:bg-[#80e7d9] hover:bg-[#339995]/80 dark:hover:bg-[#80e7d9]/80 dark:text-[#313134] transition-all duration-300   rounded-md py-2 px-4 my-2 text-sm font-semibold flex items-center gap-2 shadow-md">
          <div className="flex items-center justify-center gap-2">
            My Portfolio <KeyboardArrowRightRoundedIcon sx={{ fontSize: 16 }} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Introduction;
