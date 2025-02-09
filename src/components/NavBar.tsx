import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { IoMoon, IoSun, IoBurgerMenu } from "@/shared/NavbarIcons";

function NavBar() {
  const [dark, setDark] = useState(false);
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenBurgerMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDarkModeHandler = () => {
    setDark(!dark);
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
  };

  const openBurgerMenuHandler = () => {
    setOpenBurgerMenu(!openBurgerMenu);
  };

  return (
    <nav className="w-100% flex justify-center bg-[#f4ece5]/80 dark:bg-[#202122]/80 dark:text-white fixed top-0 left-0 right-0 z-10 backdrop-blur-sm">
      <div className="relative m-auto w-full sm:max-w-2xl flex flex-row justify-between items-center px-4">
        <div className="font-semibold w-40 flex items-center gap-2">
          <Link to="/" className="text-lg flex flex-row items-center">
            <img src="/images/notion-face.png" alt="Notion Face" className="w-12" />
            <span className="text-lg">Jian Lee</span>
          </Link>
        </div>
        <div className="hidden sm:flex flex-row items-start font-medium text-sm font-display">
          <Link
            to="/works"
            className={`py-2 px-4 rounded-lg hover:underline hover:underline-offset-4 transition-all duration-300 ${currentPath === "/works" ? "underline underline-offset-4" : ""}`}
          >
            Works
          </Link>
          <Link
            to="/uses"
            className={`py-2 px-4 rounded-lg hover:underline hover:underline-offset-4 transition-all duration-300 ${currentPath === "/uses" ? "underline underline-offset-4" : ""}`}
          >
            Uses
          </Link>
          {/* <Link to="/" className="p-1">
            About
          </Link>
          <Link to="/" className="p-1">
            About
          </Link> */}
        </div>
        <div ref={menuRef}>
          <div className="ml-8 flex flex-row gap-2 ">
            <button onClick={toggleDarkModeHandler} className="drop-shadow-md">
              {dark ? <IoMoon /> : <IoSun />}
            </button>
            <button
              onClick={openBurgerMenuHandler}
              className="block sm:hidden drop-shadow-md"
            >
              <IoBurgerMenu />
            </button>

            <div
              className={`drop-shadow-lg backdrop-blur-sm border border-gray-400 bg-white dark:bg-gray-600 text-[#202122] dark:text-[#f4ece5] w-48 absolute top-12 left-auto right-4 rounded-lg my-2 
                            origin-top-right transform transition-all duration-200 ease-in-out
                            ${
                              openBurgerMenu
                                ? "opacity-100 visible translate-z-0 scale-100"
                                : "opacity-0 invisible translate-z-0 scale-80"
                            }`}
            >
              <div className="py-2 flex flex-col font-medium font-display">
                <Link
                  to="/works"
                  className={`py-2 px-4 ${currentPath === "/works" ? "underline underline-offset-4" : ""}`}
                  onClick={() => setOpenBurgerMenu(false)}
                >
                  Works
                </Link>
                <Link
                  to="/uses"
                  className={`py-2 px-4 ${currentPath === "/uses" ? "underline underline-offset-4" : ""}`}
                  onClick={() => setOpenBurgerMenu(false)}
                >
                  Uses
                </Link>
                {/* <div className="py-2 px-4">
                  <Link to="/works" className="">
                    Works
                  </Link>
                </div>
                <div className="py-2 px-4">
                  <Link to="/works" className="">
                    Works
                  </Link>
                </div> */}
              </div>
            </div>
            {/* )} */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
