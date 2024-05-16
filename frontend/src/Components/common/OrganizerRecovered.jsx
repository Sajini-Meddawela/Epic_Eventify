import React from "react";
import { Link } from "react-router-dom";
import emailConfirmed from "../Assets/verified.jpg";
import bg from "../Assets/logo.png";

const OrganizerRecovered = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="flex flex-col mt-24  md:pt-10 lg:pt-0 lg:px-20">
        <div className="text-center mb-10">
          <h1 className="text-5xl">Recovered</h1>
        </div>
        <div className="pt-5 ml-auto mr-auto max-w-[350px] h-auto">
          <img src={emailConfirmed} alt="" />
        </div>
        <div className="text-xl text-center text-[#C7ADCE]">
          Organizer ID has been recovered!
        </div>
        <div className="text-[#8B8BAE] text-center">
          Your Recovered Organizer ID has been sent to your Email
        </div>
        <Link to={"/login"}>
          <div className="flex mt-5 justify-center">
            <button
              type="submit"
              className="rounded-lg mt-2 mb-5 bg-[#562595] pt-1 pb-1 w-1/2 text-md font-medium uppercase text-neutral-50"
              data-twe-ripple-init
              data-twe-ripple-color="light"
            >
              Login
            </button>
          </div>
        </Link>
      </div>
      <div className="">
        <img
          src={bg}
          alt="logo"
          className="object-cover h-full w-full md:max-h-full md:w-auto"
        />
      </div>
    </div>
  );
};

export default OrganizerRecovered;
