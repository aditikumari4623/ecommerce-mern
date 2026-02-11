import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";


import myPhoto from "../../../images/Profile.png";

const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/_.aditikumari";
  };

  

  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>

      <div className="aboutSectionContainer">
        <Typography component="h1">About Me</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src={myPhoto}
              alt="My Profile"
            />

            <Typography>Aditi Kumari</Typography>

            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>

            <span>
              This website is developed by me as a MERN Stack project.  
              I am an engineering student passionate about web development,
              UI design, and full-stack applications.
            </span>
          </div>

          <div className="aboutSectionContainer2">
            <Typography component="h2">My Profiles</Typography>

            <a href="https://linkedin.com/in/aditi-kumari-99789024b"
               target="_blank"
               rel="noreferrer"
            >
            <LinkedInIcon className="linkedinSvgIcon" />
            </a>


            <a href="https://instagram.com/_.aditikumari"
               target="_blank"
               rel="noreferrer"
            >
            <InstagramIcon className="instagramSvgIcon" />
            </a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
