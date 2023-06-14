import React, { useState } from "react";
// import SpecialCardImg from "./cardImg.png";

const SpecialCard = ({ title, buttonText, imageUrl }) => {
    return (
      <div className="pricing-card special">
        <h3 className="pricing-card-title">{title}</h3>
        <div className="special-pricing-card-content"> Custom plans are available </div>
        <img className="special-card-image"  alt={title} />
        <button className="special-card-button">{buttonText}</button>
      </div>
    );
  };

export default SpecialCard;