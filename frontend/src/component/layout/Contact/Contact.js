import React from "react";
import "./Contact.css";
import { Button } from "@mui/material";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a
        className="mailBtn"
        href="mailto:kumariaditi0406@gmail.com"
        style={{ textDecoration: "none" }}
      >
        <Button
          variant="contained"
          color="primary"
        >
          Contact: kumariaditi0406@gmail.com
        </Button>
      </a>
    </div>
  );
};

export default Contact;
