import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const ChangeEmail = () => {

    return (
        <div className="change-email-container">
            <div className="main-title">
                <h2> Change Email Address </h2>
            </div>

            <div className="form-row-colfull form-row">
                <label className="label" for="email"> Enter your new email address </label>
                <input required type="email" className="input" placeholder="Enter Email"></input>
                <span className="email-verification-note"> 
                <FontAwesomeIcon icon={faCircleInfo} />
                we will send a verification to this email ID 
                </span>
            </div>

            <div className="action-btn">
                <button className="back-btn">
                    Back
                </button>
                <button className="verify-btn">
                    Continue
                </button>
            </div>

        </div>
    )
}

export default ChangeEmail;