import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roles }) => {
  const token = localStorage.getItem("jsonwebtoken");
  const userRole = localStorage.getItem("role");

  // Check if the user is authenticated
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Check if the user's role is allowed
  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  // If authenticated and authorized, render the child component
  return children;
};

export default ProtectedRoute;