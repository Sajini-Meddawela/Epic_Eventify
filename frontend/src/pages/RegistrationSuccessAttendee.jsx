import React from "react";
import bg from "../Components/Assets/organizer.jpg";
import registered from "../Components/Assets/registered.jpg";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const RegistrationSuccessAttendee = () => {
  const params = useParams();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="flex flex-col mt-24 px-12 md:pt-10 lg:pt-0 lg:px-20">
        <div className="text-3xl text-center mb-16">
          Account Created Successfully!
        </div>
        <div className="pt-5 max-h-[400px] flex justify-center">
          <img src={registered} alt="" className="max-h-[350px]" />
        </div>
        <div className="text-md text-center text-[#8B8BAE] mt-5">
          Your Email is{" "}
          <span className="text-lg text-[#562595]">"{params.email}"</span>
        </div>
        <div className="mt-5 flex justify-center">
          <Link to={"/login-attendee"}>
            <button
              type="submit"
              className="rounded-3xl bg-[#562595] px-24  inline-block pt-2 pb-2 text-md font-medium uppercase text-neutral-50"
              data-twe-ripple-init
              data-twe-ripple-color="light"
            >
              login
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

export default RegistrationSuccessAttendee;
