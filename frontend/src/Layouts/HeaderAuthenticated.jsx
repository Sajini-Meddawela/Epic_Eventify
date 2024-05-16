import React from "react";
import logo from "../Components/Assets/logoHeader.png";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const HeaderAuthenticate = () => {
  const navigate = useNavigate();
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
      navigate("/login");
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
        <div className="flex w-full items-center px-3">
          <div>
            <Link to={"/"}>
              <img src={logo} alt="" className="max-h-[30px] ml-5" />
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
          <div className="text-white flex justify-end ml-auto mr-5">
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HeaderAuthenticate;
