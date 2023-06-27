import React, { useState } from "react";
import SpecialCardImg from "../../assets/images/cardImg.png";

const SpecialCard = ({ title, buttonText, imageUrl }) => {
    return (
      <div className="pricing-card special">
        <h3 className="pricing-card-title">{title}</h3>
        <div className="special-pricing-card-content"> Custom plans are available </div>
        <img src={SpecialCardImg} className="special-card-image" />
        <button className="special-card-button">{buttonText}</button>
      </div>
    );
  };

export default SpecialCard;