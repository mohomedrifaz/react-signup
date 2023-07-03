import React, { useState, useRef } from "react";
import ReactDOM from 'react-dom';
import './SetupContainer.css';

const SetupContainer = ({stepData: { nextChildStep, setCurrentChildStep }}) => {

    const [otp, setOtp] = useState(["", "", "", ""]);
    const [isVerificationSuccessful, setVerificationSuccessful] = useState(true);
    const inputRefs = useRef([]);

    const handleChange = (event, index) => {
        const { value } = event.target;
        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        if (value !== "" && index < 3) {
            inputRefs.current[index + 1].focus();
        } else {
            setVerificationSuccessful(true);
        }
    };

    const handleVerify = () => {
        const enteredOtp = otp.join('');

        if (enteredOtp === '1111') {
            setCurrentChildStep(3);
        } else {
            setVerificationSuccessful(false);
        }

    };

    const isButtonDisabled = otp.some(value => value === "");

    return (
        <div className="content-title">
            <div className="main-title">
                <h3> Verify Your email address </h3>
            </div>
            <div className="verficiation-content">
                <p>A verification code has been sent to </p>
                <p className="email-address-verification">sample@gmail.com</p>
            </div>
            <div className="verification-instructions">
                <p>Please check your inbox, including your SPAM folder for an<br />
                    email from <u>no-reply@v2cloud.com</u> with the subject "Verify your<br />
                    email address - V2 Cloud," and enter the verification code below<br />
                    to verify your email address; the code will expire in 20 minuites.
                </p>
            </div>
            <div className="otp-container">
                <div className="userInput">
                    <input
                        type="text"
                        className={`single-input ${otp[0] ? 'filled' : ''} ${!isVerificationSuccessful ? "invalid-input" : ""}`}
                        id='ist'
                        ref={ref => (inputRefs.current[0] = ref)}
                        maxlength={1}
                        value={otp[0] || ""}
                        onChange={(e) => handleChange(e, 0)}
                        onKeyDown={(e) => {
                            if (!/\d/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                    />
                    <input
                        type="text"
                        className={`single-input ${otp[1] ? 'filled' : ''} ${!isVerificationSuccessful ? "invalid-input" : ""}`}
                        id="sec"
                        ref={ref => (inputRefs.current[1] = ref)}
                        maxlength={1}
                        value={otp[1] || ""}
                        onChange={(e) => handleChange(e, 1)}
                        onKeyDown={(e) => {
                            if (!/\d/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                    />
                    <input
                        type="text"
                        className={`single-input ${otp[2] ? 'filled' : ''} ${!isVerificationSuccessful ? "invalid-input" : ""}`}
                        id="third"
                        ref={ref => (inputRefs.current[2] = ref)}
                        maxlength={1}
                        value={otp[2] || ""}
                        onChange={(e) => handleChange(e, 2)}
                        onKeyDown={(e) => {
                            if (!/\d/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                    />
                    <input
                        type="text"
                        className={`single-input ${otp[3] ? 'filled' : ''} ${!isVerificationSuccessful ? "invalid-input" : ""}`}
                        id="fourth"
                        ref={ref => (inputRefs.current[3] = ref)}
                        maxlength={1}
                        value={otp[3] || ""}
                        onChange={(e) => handleChange(e, 3)}
                        onKeyDown={(e) => {
                            if (!/\d/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                    />
                </div>
                <div className="invalid-verification-box hidden"> Verification code invalid </div>
                <button
                    className="verify-btn"
                    style={{ backgroundColor: isButtonDisabled ? '#a3bbd5' : '#00438b' }}
                    disabled={isButtonDisabled}
                    onClick={handleVerify}
                >
                    Verify
                </button>
            </div>
            <div className="verification-actions">
                <div className="resend-code">
                    <div className="resend-icon">
                        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 20.75C10.0772 20.75 8.23311 19.9862 6.87348 18.6265C5.51384 17.2669 4.75 15.4228 4.75 13.5C4.75 11.5772 5.51384 9.73311 6.87348 8.37348C8.23311 7.01384 10.0772 6.25 12 6.25H14.5C14.6989 6.25 14.8897 6.32902 15.0303 6.46967C15.171 6.61032 15.25 6.80109 15.25 7C15.25 7.19891 15.171 7.38968 15.0303 7.53033C14.8897 7.67098 14.6989 7.75 14.5 7.75H12C10.8628 7.75 9.75105 8.08723 8.80547 8.71905C7.85989 9.35087 7.1229 10.2489 6.68769 11.2996C6.25249 12.3502 6.13862 13.5064 6.36048 14.6218C6.58235 15.7372 7.12998 16.7617 7.93414 17.5659C8.73829 18.37 9.76284 18.9177 10.8782 19.1395C11.9936 19.3614 13.1498 19.2475 14.2004 18.8123C15.2511 18.3771 16.1491 17.6401 16.781 16.6945C17.4128 15.7489 17.75 14.6372 17.75 13.5C17.75 13.3011 17.829 13.1103 17.9697 12.9697C18.1103 12.829 18.3011 12.75 18.5 12.75C18.6989 12.75 18.8897 12.829 19.0303 12.9697C19.171 13.1103 19.25 13.3011 19.25 13.5C19.2474 15.422 18.4827 17.2645 17.1236 18.6236C15.7645 19.9827 13.922 20.7474 12 20.75Z" fill="#00438b" />
                            <path d="M12 10.75C11.9015 10.7505 11.8038 10.7313 11.7128 10.6935C11.6218 10.6557 11.5392 10.6001 11.47 10.53C11.3296 10.3894 11.2507 10.1988 11.2507 10C11.2507 9.80128 11.3296 9.61066 11.47 9.47003L13.94 7.00003L11.47 4.53003C11.3963 4.46137 11.3372 4.37857 11.2962 4.28657C11.2552 4.19457 11.2332 4.09526 11.2314 3.99455C11.2296 3.89385 11.2482 3.79382 11.2859 3.70043C11.3236 3.60705 11.3797 3.52221 11.451 3.45099C11.5222 3.37977 11.607 3.32363 11.7004 3.28591C11.7938 3.24819 11.8938 3.22966 11.9945 3.23144C12.0952 3.23322 12.1945 3.25526 12.2865 3.29625C12.3785 3.33724 12.4613 3.39634 12.53 3.47003L15.53 6.47003C15.6705 6.61066 15.7493 6.80128 15.7493 7.00003C15.7493 7.19878 15.6705 7.38941 15.53 7.53003L12.53 10.53C12.4608 10.6001 12.3782 10.6557 12.2872 10.6935C12.1962 10.7313 12.0985 10.7505 12 10.75Z" fill="#00438b" />
                        </svg>
                    </div>
                    <div className="resend-code-content"></div>
                </div>
                <div className="change-email" onClick={nextChildStep}>Change email</div>
            </div>
        </div>
    );
};



export default SetupContainer;