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

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    let uploadImg;
    if (file) {
      const response = await uploadFileToFirebase(file);
      uploadImg = response;
    }
    const chatName = values.username;
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/chat/",
        { chatImg: uploadImg, chatName: chatName },
        {
          headers,
        }
      );
      console.log("Response:", res.data);
      setLoading(false);
      navigate("/chat");
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
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
