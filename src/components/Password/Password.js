import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import useRegistrationData from "../../hooks/useRegistrationData";
import './password.css';

const Password = ({ onNext }) => {

    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [registrationData, setRegistrationData] = useRegistrationData();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        setRePassword(e.target.value);
        const confirmPassword = e.target.value;
        setRePassword(confirmPassword);
        setPasswordError(password !== confirmPassword);
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

    const passwordVerification = () => {
        // if (isPasswordValid && password === repassword) {
        //     onNext();
        // } else {
        //     console.log('Password Verification Failed')
        // }
        setRegistrationData({...registrationData, user_password: password});
        onNext();
    }

    return (
        <div className="password choose-password-container">
            <div className="main-title">
                <h3> Choose a Password </h3>
            </div>

            <div className="account-description">
                <div className="account-img">
                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="56" height="56" rx="28" fill="#E6ECF3" />
                        <path d="M38.6673 40V37.3333C38.6673 35.9188 38.1054 34.5623 37.1052 33.5621C36.105 32.5619 34.7485 32 33.334 32H22.6673C21.2528 32 19.8963 32.5619 18.8961 33.5621C17.8959 34.5623 17.334 35.9188 17.334 37.3333V40M33.334 21.3333C33.334 24.2789 30.9462 26.6667 28.0007 26.6667C25.0551 26.6667 22.6673 24.2789 22.6673 21.3333C22.6673 18.3878 25.0551 16 28.0007 16C30.9462 16 33.334 18.3878 33.334 21.3333Z" stroke="#00438B" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                </div>
                <div className="account-name-email">
                    <div className="account-name"> Tharaka Nilpul </div>
                    <div className="account-email"> tharaka@v2cloud.com </div>
                </div>
            </div>

            <div className="password-form-container">
                <div className="form-row form-group">
                    <label for="password">Password*</label>
                    <input
                        className="form-control" id="password" placeholder="Enter account password"
                        value={password}
                        type={showPassword ? "text" : "password"}
                        onChange={handlePasswordChange}
                    />
                    <div className="input-group-append">
                        <span className="input-group-text" onClick={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                        </span>
                    </div>
                </div>
                <div className="form-row form-group">
                    <label for="confirm-password">Confirm Password*</label>
                    <input
                        className="form-control" id="confirm-password" placeholder="Enter account password"
                        type={ConfirmPassword ? "text" : "password"}
                        value={repassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    <div className="input-group-append">
                        <span className="input-group-text" onClick={toggleConfirmPasswordVisibility}>
                            <FontAwesomeIcon icon={ConfirmPassword ? faEye : faEyeSlash} />
                        </span>
                    </div>
                </div>
                <div className="password-requirements">
                    <div className="title">Password Requirements</div>
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
                <button
                    className="verify-btn"
                    onClick={passwordVerification}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default Password;