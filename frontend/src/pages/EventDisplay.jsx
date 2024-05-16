import React from "react";
import { Link } from "react-router-dom";
import HeaderHome from "../Layouts/HeaderHome";

const EventDisplay = () => {
  return (
    <div>
    <HeaderHome/>
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-3xl font-bold mb-8">Events are Displayed in here</p>
      <Link
        to="/"
        className="bg-[#562595] pt-2 text-white px-8 py-2 rounded-full mt-8"
      >
        Go back to the homepage
      </Link>
    </div>
    </div>
  );
};

export default EventDisplay;
