import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const user = useSelector((state) => state.user?.user);
  const author = useSelector((state) => state.author?.author);
  return user?.isAuthenticated || author?.isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
