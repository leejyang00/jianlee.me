import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

const Introduction = () => {
  return (
      <div className="flex flex-col">
        <h2 className="text-lg font-bold underline underline-offset-8 my-4 decoration-4 decoration-gray-500">
          Work
        </h2>
        <div className="text-sm text-justify leading-relaxed indent-8">
          Takuya is a freelance and a full-stack developer based in Osaka with a
          passion for building digital services/stuff he wants. He has a knack
          for all things launching products, from planning and designing all the
          way to solving real-life problems with code. When not online, he loves
          hanging out with his camera. Currently, he is living off of his own
          product called Inkdrop. He publishes content for marketing his
          products and his YouTube channel called "Dev as Life" has more than
          100k subscribers.
        </div>
        <div className="flex justify-center">
          <button className="bg-[#339995] text-[#eeefef] rounded-lg py-2 px-4 my-2 text-sm font-semibold flex items-center gap-2">
            <div className="flex items-center justify-center gap-2">
              My Portfolio{" "}
              <KeyboardArrowRightRoundedIcon sx={{ fontSize: 16 }} />
            </div>
          </button>
        </div>
      </div>
  );
};

export default Introduction;
