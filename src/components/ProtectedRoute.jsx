import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const user = useSelector((state) => state.user?.user);
  return user?.isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
