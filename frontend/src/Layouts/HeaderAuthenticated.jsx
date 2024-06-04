import React from "react";
import { Link } from "react-router-dom";
import logo from "../Components/Assets/logoHeader.png";
import Logout from "../pages/Logout";

const HeaderAuthenticate = () => {
  return (
    <div>
      <nav
        className="relative flex w-full items-center justify-between bg-[#562595] shadow-dark-mild dark:bg-body-dark lg:flex-wrap lg:justify-start lg:py-4"
        data-twe-navbar-ref
      >
        <div className="flex w-full items-center px-3">
          <div>
            <Link to={"/"}>
              <img src={logo} alt="Logo" className="max-h-[30px] ml-5" />
            </Link>
          </div>
          <div className="text-white ml-16">
            <ul className="list-none flex">
              <li className="mx-4">Home</li>
              <li className="mx-4">My List</li>
              <li className="mx-4">Chats</li>
              <li className="mx-4">About</li>
            </ul>
          </div>
          <div className="flex justify-end ml-auto mr-5">
            <Logout />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HeaderAuthenticate;
