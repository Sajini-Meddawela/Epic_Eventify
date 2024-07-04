import React from "react";
import HeaderAuthenticate from "../Layouts/HeaderAuthenticated";
import Footer from "../Layouts/Footer";
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";

const CreateEvent = () => {
  return <div>
    <HeaderAuthenticate/>
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-3xl font-bold mb-8">Organizers can create events here</p>
    </div>
    <Link to="/add-event">
        <div className="fixed bottom-20 right-20 bg-[#562595] text-white p-5 rounded-full shadow-lg cursor-pointer">
          <AddIcon style={{ fontSize: 40 }} />
        </div>
      </Link>
    <Footer/>
  </div>;
};

export default CreateEvent;
