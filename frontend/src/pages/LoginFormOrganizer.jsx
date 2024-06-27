import React, { useState } from "react";
import bg from "../Components/Assets/organizer.jpg";
import { Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Loader from "../Components/common/Loader";

const LoginFormOrganizer = () => {
  const [loading, isLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
   
    isLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/api/v1/auth/login", {
        email: values.email,
        password: values.password,
        type: 2,
        orgId: values.id,
      });

      if (res.data.status === "success") {

        const token = res.data.token;
        const role = res.data.role;
        const email = values.email; //when returning email from the backend instead of values.email it display as undefine. so for the future purposes I use frontend value as it is

        localStorage.setItem("jsonwebtoken", token);
        localStorage.setItem("role", role);
        localStorage.setItem("userEmail", email);

      }
      setTimeout(() => {
        isLoading(false);
        navigate("/create-event");
      }, 2000);
    } 
    
    catch (err) {
      isLoading(false);
      const res = err.response.status === 401 || 15;
      if (err.response.data.message === "Please Verify Your Email!") {
        navigate(`/email-verification/${values.email}`);
      }
      if (res) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.message,
        });
      }
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
          <div className="flex flex-col mt-24 px-12 md:pt-10 lg:pt-0 lg:px-20">
            <div className="text-center mb-16">
              <h1 className="text-5xl">Login </h1>
              <h1 className="text-2xl">as an </h1>
              <h1 className="text-5xl">Organizer </h1>
            </div>
            <div className="">
              <Form name="login" onFinish={onFinish} autoComplete="off">
                <h1 className="text-md mb-2">Email</h1>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    placeholder="email"
                    className="w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </Form.Item>

                <h1 className="text-md mb-2">Organizer ID</h1>
                <Form.Item
                  name="id"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Id",
                    },
                    {
                      type: "string",
                      message: "The input is not a valid Id!!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    placeholder="Organizer Id"
                    className="w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </Form.Item>
                <h1 className="text-md mb-2">Password</h1>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    placeholder="Password"
                    className="w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </Form.Item>
                <div className="flex flex-row justify-between">
                  <Link
                    to={"/reset-password"}
                    className="text-[#991AAD] hover:text-[#C7ADCE]"
                  >
                    Forgot Password
                  </Link>
                  <Link
                    to={"/recover-id"}
                    className="text-[#991AAD] hover:text-[#C7ADCE]"
                  >
                    Recover Organizer ID
                  </Link>
                </div>
                <div>
                  <button
                    type="submit"
                    className="rounded-lg mt-16 bg-[#562595] pt-1 pb-1 w-full text-md font-medium uppercase text-neutral-50"
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                  >
                    Log in
                  </button>
                  <Link
                    to={"/signup-organizer"}
                    className="text-[#991AAD] hover:text-[#C7ADCE]"
                  >
                    <h1 className=" text-center mt-2 ">
                      Don't Have an account? Sign Up
                    </h1>
                  </Link>
                </div>
              </Form>
            </div>
            <div></div>
          </div>
          <div className="md:flex md:justify-end">
            <img
              src={bg}
              alt="login dj"
              className="object-cover h-full w-full md:max-h-full md:w-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginFormOrganizer;