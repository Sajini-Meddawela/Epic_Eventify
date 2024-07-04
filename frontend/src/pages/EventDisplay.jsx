import React from "react";
import { Link } from "react-router-dom";
import HeaderHome from "../Layouts/HeaderHome";
import Footer from "../Layouts/Footer";
import image1 from "../Components/Assets/display1.jpeg";
import image2 from "../Components/Assets/display2.jpeg";
import image3 from "../Components/Assets/display3.jpeg";

const events = [
  {
    image: image1,
    name: "Live Music Festival",
    date: "August 11 - 12 PM",
    venue: "Nelum Pokuna Stadium",
  },
  {
    image: image2,
    name: "Live Music Festival",
    date: "August 11 - 12 PM",
    venue: "Nelum Pokuna Stadium",
  },
  {
    image: image3,
    name: "Live Music Festival",
    date: "August 11 - 12 PM",
    venue: "Nelum Pokuna Stadium",
  },
  {
    image: image1,
    name: "Live Music Festival",
    date: "August 11 - 12 PM",
    venue: "Nelum Pokuna Stadium",
  },
  {
    image: image2,
    name: "Live Music Festival",
    date: "August 11 - 12 PM",
    venue: "Nelum Pokuna Stadium",
  },
  {
    image: image3,
    name: "Live Music Festival",
    date: "August 11 - 12 PM",
    venue: "Nelum Pokuna Stadium",
  },
];

const EventDisplay = () => {
  return (
    <div>
      <HeaderHome />
      <div className="flex flex-col items-center justify-center min-h-screen px-10 pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {events.map((event, index) => (
            <div
              key={index}
              className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg"
              style={{ marginBottom: index >= 3 ? '16px' : '8px' }}
            >
              <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                <h2 className="text-xl font-bold mb-2">{event.name}</h2>
                <p className="text-sm mb-1">{event.date}</p>
                <p className="text-sm">{event.venue}</p>
              </div>
              <div className="absolute inset-0 cursor-pointer"></div>
            </div>
          ))}
        </div>
        <div className="flex justify-center w-full mt-2">
          <Link
            to="/"
            className="bg-[#562595] pt-2 text-white px-8 py-2 rounded-full"
          >
            Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventDisplay;
