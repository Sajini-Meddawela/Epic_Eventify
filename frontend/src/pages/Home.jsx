import React, { useEffect, useState } from "react";
import bg from "../Components/Assets/dj-playing-and-mixing-music-in-nightclub-party-at-night-edm-dance-music-club-with-crowd-of-young-people-free-photo.jpg";
import { Link } from "react-router-dom";
import HeaderHome from "../Layouts/HeaderHome";
import Loader from "../Components/common/Loader";

const Home = () => {
  const [isAuthenticate, setAuthenticate] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkLocal = () => {
      if (localStorage.getItem("jsonwebtoken")) {
        setAuthenticate(true);
      }
      setLoading(false);
    };
    checkLocal();
  }, []);
  return (
    <div>
      <HeaderHome />

      {loading ? (
        <Loader />
      ) : (
        <div
          className="relative h-[350px] overflow-hidden bg-cover bg-[50%] bg-no-repeat"
          style={{ backgroundImage: `url(${bg})`, height: "94vh" }}
        >
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black/60 bg-fixed">
            <div className="flex h-full items-center justify-center">
              <div className="px-6  text-center text-white md:px-48">
                <h1 className="mb-6 text-5xl font-bold uppercase">
                  Welcome to epiceventify
                </h1>
                <h3 className="mb-8 text-xl">
                  Find your perfect match with EpicEventify! Explore a diverse
                  array of events curated just for you from concerts and sports
                  to cultural gatherings. You next adventure awaits!
                </h3>
                <h3 className="mb-8 text-xl">
                  Enjoy stress-free ticketing at your fingertips! Secure your
                  spot effortlessly with our user-friendly platform. no more
                  queues, just seamless event accress in a few clicks.
                </h3>
                <h3 className="mb-8 text-xl">
                  Join us today - click & explore, and create lasting memories
                  with EpicEventify!
                </h3>
                <div className=" flex flex-col md:justify-evenly whitespace-nowrap md:flex-row  gap-10 pt-14 ">
                  <Link to={"/event-display"}>
                    <button
                      type="button"
                      className="rounded-lg bg-white px-24 inline-block pt-2 pb-2 text-xl font-medium uppercase text-[#562595]"
                      data-twe-ripple-init
                      data-twe-ripple-color="light"
                    >
                      Go to Events
                    </button>
                  </Link>
                  {!isAuthenticate && (
                    <Link to={"/login"}>
                      <button
                        type="button"
                        className="rounded-lg bg-[#562595] px-36 inline-block pt-2 pb-2 text-xl font-medium uppercase text-neutral-50"
                        data-twe-ripple-init
                        data-twe-ripple-color="light"
                      >
                        Log in
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
