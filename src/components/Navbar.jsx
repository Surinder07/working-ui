import { useState } from "react";

import { close, logo, menu } from "../assets";
import { navLinks } from "../constants";
import Button from "./Button";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar gap-6">
      <img
        src={logo}
        alt="hoobank"
        className="w-[173px] h-[66px] sm:flex hidden "
      />

      <ul className="list-none sm:flex hidden justify-end items-center ">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-medium cursor-pointer text-[14px] ${
              active === nav.title ? "text-[#0091D0]" : "text-black"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"} ml-12`}
            onClick={() => setActive(nav.title)}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul>

      <div className="sm:flex hidden justify-end items-center flex-1 gap-6">
        <button
          type="button"
          className="py-2.5 px-5 mr-2 mb-2 text-[14px] font-medium text-[#0091D0] focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Log in
        </button>

        <h3>English</h3>
      </div>

     

      <div className="sm:hidden flex flex-1 justify-between items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain bg-black"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-[#8AD2D1] absolute top-20 left-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>

        <img src={logo} alt="hoobank" className="w-[124px] h-[42px]" />
        <a href="#" className="text-[#0091D0] bg-white border-none">
          Log in
        </a>
      </div>
      
    </nav>
  );
};

export default Navbar;
