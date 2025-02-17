import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

const DarkModeToggle = () => {
  // const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  const [dark, setDark] = useState(false);
  const toggleTheme = () => {
    setDark(!dark);
    if (dark) {
      document.querySelector("body").style.background = "white";
      document.querySelector("body").style.color = "black";
    } else {
      document.querySelector("body").style.background = "black";
      document.querySelector("body").style.color = "white";
    }
  };
  return (
    <button className=" transition-all duration-1000 text-lg" onClick={toggleTheme}>
      {!dark ? <FaMoon className="xl:text-2xl lg:text-xl md:text-[23px]"></FaMoon> : <FaSun className="xl:text-2xl lg:text-xl md:text-[23px] rotate-45"></FaSun>}
    </button>
  );
};

export default DarkModeToggle;
