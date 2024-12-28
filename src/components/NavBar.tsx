import { Link } from "@tanstack/react-router";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import InsertEmoticonRoundedIcon from "@mui/icons-material/InsertEmoticonRounded";
import { useState } from "react";

const IoMoon = () => {
  return (
    <div className="p-2 bg-green-500 hover:bg-green-600 hover:scale-105 transition-all duration-300 rounded-md text-white flex items-center justify-center">
      <DarkModeRoundedIcon
        className="hover:cursor-pointer"
        sx={{ fontSize: 20 }}
      />
    </div>
  );
};

const IoSun = () => {
  return (
    <div className="p-2 bg-[#fad38d] hover:bg-[#fad38d]/80 hover:scale-105 transition-all duration-300 rounded-md text-black flex items-center justify-center">
      <WbSunnyOutlinedIcon
        className="hover:cursor-pointer"
        sx={{ fontSize: 20 }}
      />
    </div>
  );
};

function NavBar() {
  const [dark, setDark] = useState(false);

  const toggleDarkModeHandler = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="w-100% flex justify-center bg-[#f4ece5] dark:bg-[#202122] dark:text-white opacity-90 backdrop-blur-lg fixed top-0 left-0 right-0 z-10">
      <div className="m-auto max-w-2xl flex flex-row justify-between items-center p-2">
        <div className="font-semibold w-32 flex items-center gap-2">
          <InsertEmoticonRoundedIcon
            sx={{ fontSize: 20 }}
            className="hover:-rotate-20 transition-transform duration-1000"
          />
          Jian Lee
        </div>
        <div className="grid grid-cols-6 gap-6 font-normal">
          <Link to="/about">About</Link>
          <Link to="/about">About</Link>
          <Link to="/about">About</Link>
          <Link to="/about">About</Link>
        </div>
        <button onClick={toggleDarkModeHandler} className="ml-8">
          {dark ? <IoMoon /> : <IoSun />}
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
