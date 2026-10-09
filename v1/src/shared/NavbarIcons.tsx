import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const IoMoon = () => {
  return (
    <div className="p-2 bg-[#c2656d] hover:bg-[#c2656d]/80 hover:scale-105 transition-all duration-300 rounded-lg text-white flex items-center justify-center">
      <DarkModeRoundedIcon
        className="hover:cursor-pointer"
        sx={{ fontSize: 20 }}
      />
    </div>
  );
};

const IoSun = () => {
  return (
    <div className="p-2 bg-[#fad38d] hover:bg-[#fad38d]/80 hover:scale-105 transition-all duration-300 rounded-lg text-[#202122] flex items-center justify-center">
      <WbSunnyOutlinedIcon
        className="hover:cursor-pointer"
        sx={{ fontSize: 20 }}
      />
    </div>
  );
};


const IoBurgerMenu = () => {
  return (
    <div className="p-2 border border-gray-400 text-[#202122] dark:text-[#f4ece5] hover:scale-105 transition-all duration-300 rounded-lg  flex items-center justify-center">
      <MenuRoundedIcon className="hover:cursor-pointer" sx={{ fontSize: 20 }} />
    </div>
  );
};

export { IoMoon, IoSun, IoBurgerMenu };
