import React, { useEffect, useState } from "react";
import logo from "../Components/Assets/logoHeader.png";
import {
  FacebookFilled,
  TwitterSquareFilled,
  InstagramFilled,
  YoutubeFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const HeaderHome = () => {
  const [isAuthenticate, setAuthenticate] = useState(false);
  useEffect(() => {
    const checkLocal = () => {
      if (localStorage.getItem("jsonwebtoken")) {
        setAuthenticate(true);
      }
    };
    checkLocal();
  });

  const logout = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/v1/auth/logout");
      console.log(res);

      localStorage.removeItem("jsonwebtoken");
      localStorage.removeItem("role");
      Swal.fire({
        icon: "success",
        title: "",
        text: "Successfully LoggedOut!!",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Logout failed:", error);
      // Show error message
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "An error occurred while logging out. Please try again.",
      });
    }
  };
  return (
    <div>
      <nav
        className="relative flex w-full items-center justify-between bg-[#562595] shadow-dark-mild dark:bg-body-dark lg:flex-wrap lg:justify-start lg:py-4"
        data-twe-navbar-ref
      >
        <div className="flex w-full flex-wrap items-center justify-between  px-3">
          <div>
            <Link to={"/"}>
              <img src={logo} alt="" className="max-h-[70px] ml-5" />
            </Link>
          </div>
          {isAuthenticate ? (
            <div className="text-white flex justify-end ml-auto mr-5">
              <button onClick={logout}>Logout</button>
            </div>
          ) : (
            <div className="bg-white flex justify-evenly w-1/4">
              <FacebookFilled className="text-[#562595] text-5xl p-2" />
              <InstagramFilled className="text-[#562595] text-5xl p-2" />
              <TwitterSquareFilled className="text-[#562595] text-5xl p-2" />
              <YoutubeFilled className="text-[#562595] text-5xl p-2" />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default HeaderHome;
