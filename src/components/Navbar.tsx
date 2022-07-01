import { Button } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

import { paths } from "../constants";

const Navbar: React.FC<{
  walletAddress: string;
  setShowModal(condition: boolean): void;
}> = ({ walletAddress, setShowModal }) => {
  const logo = require("../assets/logo.png");

  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link
            className="text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-black flex items-center hover:text-indigo-500  ease-in duration-150"
            to={paths.Home}
          >
            <img
              className="object-contain h-10 w-10 mr-2"
              src={logo}
              alt="logo-img"
            />
            marketplace
          </Link>
        </div>
        <div
          className={"lg:flex flex-grow items-center"}
          id="example-navbar-danger"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="nav-item">
              <h2
                onClick={() => setShowModal(true)}
                className="cursor-pointer px-3 py-2 flex items-center text-lg uppercase font-bold leading-snug text-sky-500 hover:text-indigo-500 hover:scale-110 ease-in duration-150 mr-10"
              >
                Create
              </h2>
            </li>
            <li className="nav-item flex items-center">
              {walletAddress ? (
                <h4 className="text-black font-sm ">
                  {walletAddress.slice(0, 5) +
                    "..." +
                    walletAddress.slice(38, 42)}
                </h4>
              ) : (
                <Link
                  className="px-3 py-2 flex items-center text-lg uppercase font-bold leading-snug text-black hover:text-indigo-500 hover:scale-110 ease-in duration-150"
                  to={paths.Login}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
