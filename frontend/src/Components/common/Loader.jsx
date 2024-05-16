import React from "react";
import { Spin } from "antd";

const Loader = () => (
  <div
    style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      opacity: "0.5",
    }}
  >
    <Spin size="large" />
  </div>
);

export default Loader;
