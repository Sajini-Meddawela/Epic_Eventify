import React, { useState } from "react";
import bg from "../Components/Assets/logo.png";
import { Form, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import resetPassword from "../Components/Assets/resetPassword.jpg";
import Loader from "../Components/common/Loader";

const PasswordResetForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const email = params.email;
      const password = values.password;
      const res = await axios.post(
        `http://localhost:3001/api/v1/auth/reset-pass`,
        {
          password,
          email,
        }
      );
      console.log(res.data);
      setLoading(false);
      navigate(`/password-recoverd`);
    } catch (err) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.message,
      });
    }
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
          <div className="">
            <img
              src={bg}
              alt="login dj"
              className="object-cover h-full w-full md:max-h-full md:w-auto"
            />
          </div>
          <div className="flex flex-col mt-24 px-12 md:pt-10 lg:pt-0 lg:px-20">
            <div className="text-center mb-2">
              <h1 className="text-5xl">Reset Password</h1>
            </div>
            <div className="pt-5 max-h-[400px] flex justify-center">
              <img src={resetPassword} alt="" className="max-h-[350px]" />
            </div>
            <div className="pt-5 text-2xl text-center text-[#C7ADCE]">
              Create New Password
            </div>
            <div className="text-center mt-5 mb-2 text-lg ">
              Your New password must be different from previous used Passwords
            </div>
            <div className="mt-5 px-16">
              <Form
                name="login"
                onFinish={onFinish}
                autoComplete="off"
                className="px-16"
              >
                <div className="flex flex-col justify-evenly">
                  <div className="min-w-[250px] ">
                    <h1 className="text-lg mb-2 ml-2 font-bold">Password</h1>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                        {
                          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
                          message: "Include at least one uppercase letter, one lowercase letter, one number, and one special character to fortify your security.",
                        }
                      ]}
                      hasFeedback
                    >
                      <Input.Password placeholder="Password" />
                    </Form.Item>
                  </div>
                  <div className="min-w-[250px] ">
                    <h1 className="text-lg mb-2 ml-2 font-bold">
                      Confirm Password
                    </h1>
                    <Form.Item
                      name="confirm"
                      dependencies={["password"]}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("Passwords do not match!")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password placeholder="Confirm Password" />
                    </Form.Item>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="rounded-lg mt-2 mb-5 bg-[#562595] pt-1 pb-1 w-full text-md font-medium uppercase text-neutral-50"
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                  >
                    Reset Password
                  </button>
                </div>
              </Form>
            </div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordResetForm;
