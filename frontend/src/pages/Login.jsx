import React from "react";
import bg from "../Components/Assets/dj-playing-and-mixing-music-in-nightclub-party-at-night-edm-dance-music-club-with-crowd-of-young-people-free-photo.jpg";
import attendee from "../Components/Assets/attendee.jpg";
import singer from "../Components/Assets/singer.jpg";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* Image */}
      <div className="md:flex md:justify-end">
        <img
          src={bg}
          alt="dj"
          className="object-cover h-full w-full md:max-h-full md:w-auto"
        />
      </div>

      {/* Form */}
      <div className="flex flex-col mt-24 items-center px-12 md:pt-10 lg:pt-0 lg:px-20">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-5xl mb-2">Login</h1>
          <p className="text-3xl mb-2">to</p>
          <p className="text-5xl">Epic Eventify</p>
        </div>
        {/* Details */}
        <div className="grid grid-cols-2 gap-32 pt-16">
          <div>
            <p className="text-center text-sm">
              Ready to join the excitement? Login as an attendee and experience
              unforgettable events firsthand
            </p>
          </div>
          <div>
            <p className="text-center text-sm">
              Ready to join the excitement? Login as an organizer and create
              amazing events
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32 w-full">
          {/* Attendee */}
          <div className="flex flex-col items-center">
            <img src={attendee} alt="" className="p-8 rounded-full" />
            {/* Button */}
            <Link to={"/Login-attendee"}>
              <button className="bg-white border-2 text-[#562595] px-8 py-2 rounded-full mt-8">
                Attendee Login
              </button>
            </Link>
          </div>

          {/* Organizer */}
          <div className="flex flex-col items-center">
            <img src={singer} alt="" className="rounded-full p-8" />
            {/* Button */}
            <Link to={"/login-organizer"}>
              <button className="bg-[#562595] pt-2 text-white px-8 py-2 rounded-full mt-8">
                Organizer Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
