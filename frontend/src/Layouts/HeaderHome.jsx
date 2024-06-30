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
  }, []);

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
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "An error occurred while logging out. Please try again.",
      });
    }
  };

  return (
    <div>
      <nav className="relative flex w-full items-center justify-between bg-[#562595] shadow-dark-mild dark:bg-body-dark lg:flex-wrap lg:justify-start lg:py-2">
        <div className="flex w-full flex-wrap items-center justify-between px-5">
          <div>
            <Link to="/">
              <img src={logo} alt="Logo" className="max-h-[50px] ml-5" />
            </Link>
          </div>
          {isAuthenticate ? (
            <div className="text-white flex justify-end ml-auto mr-5">
              <button onClick={logout} className="bg-[#562595] text-white py-2 px-4 rounded">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex justify-evenly w-1/5">
              <Link to="https://www.facebook.com/profile.php?id=61561565581190&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
                <FacebookFilled className="text-[#fff] text-4xl p-2" />
              </Link>
              <Link to="https://www.instagram.com/epiceventify/" target="_blank" rel="noopener noreferrer">
                <InstagramFilled className="text-[#fff] text-4xl p-2" />
              </Link>
              <Link to="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <TwitterSquareFilled className="text-[#fff] text-4xl p-2" />
              </Link>
              <Link to="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <YoutubeFilled className="text-[#fff] text-4xl p-2" />
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default HeaderHome;
