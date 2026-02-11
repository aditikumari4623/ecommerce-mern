import React from "react";
import Rating from "@mui/material/Rating";
import profilePng from "../../images/Profile.png";


const ReviewCard = ({ review }) => {
  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>

      <Rating
        value={Number(review.rating) || 0}
        readOnly
        precision={0.5}
        size={window.innerWidth < 600 ? "small" : "medium"}
      />

      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
