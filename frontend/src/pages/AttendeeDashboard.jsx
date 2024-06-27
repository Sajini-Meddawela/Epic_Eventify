import React from "react";
import HeaderAuthenticate from "../Layouts/HeaderAuthenticated";

const AttendeeDashboard = () => {
  return <div>
    <HeaderAuthenticate/>
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-3xl font-bold mb-8">Attendee Dashboard</p>
    </div>
  </div>;
};

export default AttendeeDashboard;
