import React, { useState } from "react";

const PlanCards = ({ title, users, monthlyprice, yearlyprice, features, offervalue, isPopular, functions, isBackup, isSelected, onClick }) => {

    // const [isSelected, setIsSelected] = useState(false);
    const [isMonthlySelected, setIsMonthlySelected] = useState(false);
    const [isAnnualSelected, setIsAnnualSelected] = useState(false);

    const [isHovered, setIsHovered] = useState(false);

    const monthlyPrice = parseInt(monthlyprice.replace('$', ''), 10);
    const yearlyPrice = parseInt(yearlyprice.replace('$', ''), 10);

    const handleCardSelection = () => {
        onClick(); // Call the onClick function passed from the parent component
        setIsMonthlySelected(isSelected); // Update the monthly selection based on the isSelected prop
        setIsAnnualSelected(false);
    };

    const handleMonthlySelection = () => {
        setIsMonthlySelected(!isMonthlySelected);
        setIsAnnualSelected(false);
    };

    const handleAnnualSelection = (event) => {
        event.stopPropagation();
        setIsAnnualSelected(!isAnnualSelected);
        setIsMonthlySelected(false);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            className={`pricing-card ${isSelected ? "selected" : ""} ${isPopular ? "popular-container" : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleCardSelection}
        >

            {isHovered && functions && (
                <div className="tooltip-container">
                    <div className="tooltip">
                        <span className="tooltip-tip">Best User of {title}</span>
                        <ul>
                            {functions.split(',').map((func, index) => (
                                <li key={index}>{func.trim()}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {isPopular && <div className="popular-badge">Most Popular</div>}

            <h3 className="pricing-card-title">{title}</h3>
            <div className={`no-of-users ${isSelected ? "selected" : ""}`}>
                {users} users*
            </div>
            <div className={`functions ${isSelected ? "selected" : ""}`}>
                {functions}
            </div>

            <hr className="custom-hr" />
            <ul className={`pricing-card-features ${isSelected ? "selected" : ""}`}>
                {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
            <div className="pricing-monthly">
                <div className={`monthly-title-check ${isMonthlySelected ? "selected" : ""}`}>
                    <div>
                        <input type="checkbox"
                            className="checkbox-input"
                            checked={isMonthlySelected}
                            onChange={handleMonthlySelection} />
                    </div>
                    <div className="monthly-title-box">
                        <div className="monthly-title"> Monthly Commitment </div>
                        <div className="monthly-amount">
                            <div className="pricing-card-price">
                                <span className="amount"> {isBackup ? '$' + (monthlyPrice + 10) : monthlyprice} </span>
                                <span className="month">/mo </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="pricing-annual">
                <div className={`annual-title-check ${isAnnualSelected ? "selected" : ""}`}>
                    <div>
                        <input type="checkbox"
                            className="checkbox-input"
                            checked={isAnnualSelected}
                            onChange={handleAnnualSelection} />
                    </div>
                    <div className="annual-title-box">
                        <div className="annual-title">
                            Annual Commitment paid monthly
                        </div>
                        <div className="annual-amount">
                            <div className="pricing-card-price">
                                <span className="amount"> {isBackup ? '$' + (yearlyPrice + 10) : yearlyprice} </span> <span className="month">/mo </span>
                            </div>
                            <div className="offer-infobox">
                                Save {offervalue} per year
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

}

export default PlanCards;