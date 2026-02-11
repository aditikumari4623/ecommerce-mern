import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const location = useLocation();

  // Hide NotFound for payment page
  if (location.pathname === "/process/payment") {
    return null;
  }

  return (
    <div className="PageNotFound">
      <ErrorIcon />

      <Typography variant="h5">Page Not Found</Typography>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;
