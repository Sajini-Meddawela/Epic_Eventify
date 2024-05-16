import React from "react";
import bg from "../Assets/logo.png";
import { Form, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import emailConfirm from "../Assets/emailconfirm.jpg";

const ConfirmationEmailSent = () => {
  const params = useParams();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="">
        <img
          src={bg}
          alt="login dj"
          className="object-cover h-full w-full md:max-h-full md:w-auto"
        />
      </div>
      <div className="flex flex-col mt-24 px-12 md:pt-10 lg:pt-0 lg:px-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl">
            Confirmation Email Sent to {params.email}
          </h1>
        </div>
        <div className="pt-5">
          <img src={emailConfirm} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationEmailSent;
