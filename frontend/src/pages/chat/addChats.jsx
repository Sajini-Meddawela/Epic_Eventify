import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/common/Loader";
import uploadFileToFirebase from "../../utils/UploadFilesToFireBase";

const AddChats = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [file, setFile] = useState("");

  const onFinish = async (values) => {
    setLoading(true);
    const token = localStorage.getItem("jsonwebtoken");
    const creatorEmail = localStorage.getItem("userEmail");

    if (!creatorEmail) {
      console.error("Creator email is required");
      setLoading(false);
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    let uploadImg;
    if (file) {
      try {
        const response = await uploadFileToFirebase(file);
        uploadImg = response;
      } catch (error) {
        console.error("Error uploading image:", error);
        setLoading(false);
        return;
      }
    }

    const chatData = {
      chatImg: uploadImg || "",
      chatName: values.username,
      creator: creatorEmail,
      createdDate: new Date().toISOString().split("T")[0],
    };

    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/chat/",
        chatData,
        { headers }
      );
      console.log("Response:", res.data);
      setLoading(false);
      navigate("/chat");
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.error("Error:", error.response.data);
      } else if (error.request) {
        console.error("Error: No response received from server");
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <label htmlFor="fileInput">
            <img
              className="rounded-full"
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="avatar"
              style={{ width: "120px", height: "120px", cursor: "pointer" }}
            />
          </label>
          <input
            type="file"
            id="fileInput"
            name="file"
            style={{ display: "none" }}
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setFile(file);
            }}
            required
          />

          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
};

export default AddChats;
