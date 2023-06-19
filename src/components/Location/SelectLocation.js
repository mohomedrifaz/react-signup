import React from "react";
import './SelectLocation.css';

const SelectLocation = ({ onNext }) => {

    const locationVerification = () => {
        onNext();
    }

    return (
        <div>
            <div className="action-btn">
                <button className="back-btn">
                    Previous Step
                </button>
                <button
                    className="verify-btn"
                    onClick={locationVerification}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default SelectLocation;
