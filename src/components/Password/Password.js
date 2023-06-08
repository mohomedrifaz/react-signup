import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import './password.css';

const Password = () => {

    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        setRePassword(e.target.value);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPassword(!ConfirmPassword);
    }

    const hasMinLength = password.length >= 12;
    const hasSpecialChar = /[!@#%&+\-]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    const isPasswordValid = hasMinLength && hasSpecialChar && hasLowercase && hasUppercase && hasNumber;

    return (
        <div className="password choose-password-container">
            <div className="main-title">
                <h2> Choose a Password </h2>
            </div>

            <div className="account-description">
                <div className="account-img">
                    <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9ZM15.8243 13.6235C17.1533 12.523 18 10.8604 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 10.8604 6.84668 12.523 8.17572 13.6235C4.98421 14.7459 3 17.2474 3 20C3 20.5523 3.44772 21 4 21C4.55228 21 5 20.5523 5 20C5 17.7306 7.3553 15 12 15C16.6447 15 19 17.7306 19 20C19 20.5523 19.4477 21 20 21C20.5523 21 21 20.5523 21 20C21 17.2474 19.0158 14.7459 15.8243 13.6235Z" fill="#000000" />
                    </svg>
                </div>
                <div className="account-name-email">
                    <div className="account-name"> Tharaka Nilpul </div>
                    <div className="account-email"> tharaka@v2cloud.com </div>
                </div>
            </div>

            <div className="password-form-container">
                <div className="password-fields">
                    <div className="password-title"> Password* </div>
                    <div className="input-container">
                        <input
                            className="custom-input"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter account password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <span
                            className={`password-toggle ${showPassword ? "visible" : ""}`}
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (
                                <FontAwesomeIcon icon={faEye} />
                            ) : (
                                <FontAwesomeIcon icon={faEyeSlash} />
                            )}
                        </span>
                    </div>
                    <div className="password-title"> Confirm Password* </div>
                    <div className="input-container">
                        <input
                            className="custom-input"
                            type={ConfirmPassword ? "text" : "password"}
                            placeholder="Enter account password"
                            value={repassword}
                            onChange={handleConfirmPasswordChange}
                        />
                        <span
                            className={`password-toggle ${showPassword ? "visible" : ""}`}
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {ConfirmPassword ? (
                                <FontAwesomeIcon icon={faEye} />
                            ) : (
                                <FontAwesomeIcon icon={faEyeSlash} />
                            )}
                        </span>
                    </div>
                </div>
                <div className="password-requirements">
                    <div className="title"> Password Requirements </div>
                    <ul>
                        <li>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={hasMinLength}
                                    readOnly
                                />
                                <span className={`checkbox-custom ${hasMinLength ? "active" : ""}`}>
                                    <FontAwesomeIcon icon="check" className="checkbox-icon" />
                                </span>
                                Be at least 12 characters
                            </label>
                        </li>
                        <li>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={hasSpecialChar}
                                    readOnly
                                /> 
                                <span className={`checkbox-custom ${hasSpecialChar ? "active" : ""}`}>
                                    <FontAwesomeIcon icon="check" className="checkbox-icon" />
                                </span>
                                1 allowed special character (! @ # % & + -)
                            </label>
                        </li>
                        <li>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={hasLowercase}
                                    readOnly
                                />
                                <span className={`checkbox-custom ${hasLowercase ? "active" : ""}`}>
                                    <FontAwesomeIcon icon="check" className="checkbox-icon" />
                                </span>
                                1 lowercase letter
                            </label>
                        </li>
                        <li>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={hasUppercase}
                                    readOnly
                                />
                                <span className={`checkbox-custom ${hasUppercase ? "active" : ""}`}>
                                    <FontAwesomeIcon icon="check" className="checkbox-icon" />
                                </span>
                                1 uppercase letter
                            </label>
                        </li>
                        <li>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={hasNumber}
                                    readOnly
                                />
                                <span className={`checkbox-custom ${hasNumber ? "active" : ""}`}>
                                    <FontAwesomeIcon icon="check" className="checkbox-icon" />
                                </span>
                                1 number
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="confirm-btn">
                <button className="verify-btn">
                    Next
                </button>
            </div>
        </div>
    )
}

export default Password;