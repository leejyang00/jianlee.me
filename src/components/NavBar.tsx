import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { IoMoon, IoSun, IoBurgerMenu } from "@/shared/NavbarIcons";
import { ASSETS } from "@/shared/Constants";

const navLinks: NavLink[] = [
  { to: "/works", title: "Works" },
  { to: "/books", title: "Books" },
];

type NavLink = {
  to: string;
  title: string;
};

function NavBar() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );
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

  const NavLinkComponent = ({ to, title }: NavLink) => {
    return (
      <Link
        to={to}
        className={`py-2 px-4 hover:underline underline-offset-4 transition-all duration-300 ${currentPath === to ? "underline" : ""}`}
      >
        {title}
      </Link>
    );
  };

  const BurgerLinkComponent = ({ to, title }: NavLink) => {
    return (
      <Link
        to={to}
        className={`py-2 px-4 text-sm ${currentPath === to ? "underline underline-offset-4" : ""}`}
        onClick={() => setOpenBurgerMenu(false)}
      >
        {title}
      </Link>
    );
  };

  return (
    <nav className="w-100% flex justify-center bg-[#f4ece5]/80 dark:bg-[#202122]/80 dark:text-white fixed top-0 left-0 right-0 z-10 backdrop-blur-sm">
      <div className="relative max-w-xl m-auto w-full sm:max-w-2xl flex flex-row justify-between items-center px-4">
        <div className="font-semibold w-40 flex items-center gap-2">
          <Link to="/" className="text-lg flex flex-row items-center">
            <img
              src={`${ASSETS.IMAGES}/notion-trans.png`}
              alt="Notion Face"
              className="w-14"
            />
            <span className="text-lg">Jian Lee</span>
          </Link>
        </div>
        <div className="hidden sm:flex flex-row items-start font-medium text-sm font-display">
          {navLinks.map((link) => (
            <NavLinkComponent key={link.to} to={link.to} title={link.title} />
          ))}
        </div>
        <div ref={menuRef}>
          <div className="ml-8 flex flex-row gap-2 ">
            <button onClick={toggleDarkModeHandler} className="drop-shadow-md">
              {dark ? <IoSun /> : <IoMoon />}
            </button>
            <button
              onClick={openBurgerMenuHandler}
              className="block sm:hidden drop-shadow-md"
            >
              <IoBurgerMenu />
            </button>

            <div
              className={`drop-shadow-lg backdrop-blur-sm border border-gray-400 bg-white dark:bg-gray-600 text-[#202122] dark:text-[#f4ece5] w-48 absolute top-12 left-auto right-4 rounded-lg my-2
                            ${
                              openBurgerMenu
                                ? "opacity-100 visible"
                                : "opacity-0 invisible"
                            }`}
            >
              <div className="py-2 flex flex-col font-medium font-display">
                <BurgerLinkComponent to="/" title="Home" />
                {navLinks.map((link) => (
                  <BurgerLinkComponent
                    key={link.to}
                    to={link.to}
                    title={link.title}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
