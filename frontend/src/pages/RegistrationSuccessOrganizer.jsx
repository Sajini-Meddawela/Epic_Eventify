import React from "react";
import bg from "../Components/Assets/organizer.jpg";
import registered from "../Components/Assets/registered.jpg";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const RegistrationSuccessOrganizer = () => {
  const params = useParams();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="flex flex-col mt-24 px-12 md:pt-10 lg:pt-0 lg:px-20">
        <div className="text-3xl text-center">
          Account Created Successfully!
        </div>
        <div className="pt-5">
          <img src={registered} alt="" />
        </div>
        <div className="text-md text-center text-[#8B8BAE] mt-5">
          Your Organizer ID is {""}
          <span className="text-lg text-[#562595]">"{params.id}"</span>
        </div>
        <div className="text-sm text-[#8B8BAE] text-center  mt-5">
          Your Organizer ID will be asked at your each login for the
          authentication Purpose
        </div>
        <div className="mt-5 flex justify-center">
          <Link to={"/login-organizer"}>
            <button
              type="submit"
              className="rounded-3xl bg-[#562595] px-24  inline-block pt-2 pb-2 text-md font-medium uppercase text-neutral-50"
              data-twe-ripple-init
              data-twe-ripple-color="light"
            >
              Login
            </button>
          </Link>
        </div>
      </div>
      <div className="md:flex md:justify-end">
        <img
          src={bg}
          alt="login dj"
          className="object-cover h-full w-full md:max-h-full md:w-auto"
        />
      </div>
    </div>
  );
};

export default RegistrationSuccessOrganizer;
