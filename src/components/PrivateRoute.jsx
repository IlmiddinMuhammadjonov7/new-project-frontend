// components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const userToken = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");

  if (adminOnly && !adminToken) {
    return <Navigate to="/login" />;
  }

  if (!adminOnly && !userToken) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute