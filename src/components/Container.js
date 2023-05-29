import React from "react";
import ReactDOM from 'react-dom';

const Container = () => {
    return (
        <div className="content-title">
            <h2>Verify Your Email Address</h2>
            <div className="verficiation-content">
                <p>A verification code has been sent to </p>
                <p>sample@gmail.com</p>
            </div>
            <div className="verification-instructions">
                <p>Please check your inbox, including your SPAM folder for an email from no-reply@v2cloud.com
                    with the subject "Verify your email address - V2 Cloud," and enter the verification code below 
                    to verify your email address; the code will expire in 20 minuites.
                </p>
            </div>
        </div>
    );
};

export default Container;