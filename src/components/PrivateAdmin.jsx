// components/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const isAdmin = localStorage.getItem("adminToken"); // yoki contextdan
  return isAdmin ? children : <Navigate to="/login" replace />;
}
