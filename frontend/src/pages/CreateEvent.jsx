import React from "react";
import HeaderAuthenticate from "../Layouts/HeaderAuthenticated";
import Footer from "../Layouts/Footer";

const CreateEvent = () => {
  return <div>
    <HeaderAuthenticate/>
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-3xl font-bold mb-8">Organizers can create events here</p>
    </div>
    <Footer/>
  </div>;
};

export default CreateEvent;
