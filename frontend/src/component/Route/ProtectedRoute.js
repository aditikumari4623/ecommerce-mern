import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

const ProtectedRoute = ({ children, isAdmin }) => {
  const { loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  // While checking auth, show loader
  if (loading) {
    return <Loader />;
  }

  // Not logged in → redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Admin-only route protection
  if (isAdmin && user?.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  // Authorized → render component
  return children;
};

export default ProtectedRoute;
