import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
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

      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "An error occurred while logging out. Please try again.",
      });
    }
  };

  return (
    <button onClick={handleLogout} className="text-white">
      Logout
    </button>
  );
};

export default Logout;
