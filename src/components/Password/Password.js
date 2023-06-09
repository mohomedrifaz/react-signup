import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useForm } from 'react-hook-form';
import MobileHeader from "../mobileHeader";
import './password.css';

const Password = ({ formData, setFormData, stepData: { nextStep } }) => {

    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPassword(!ConfirmPassword);
    }

    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
        mode: "onTouched",
        defaultValues: {
            password: formData.userpassword,
            repassword: formData.userpassword,
        },
    });

    const requiredConfig = {
        required: "Please complete this required field."
    };

    const password = getValues("password");
    
    const hasMinLength = password.length >= 12;

    const hasSpecialChar = /[!@#%&+\-]/.test(password);

    const hasLowercase =  /[a-z]/.test(password)

    const hasUppercase = /[A-Z]/.test(password)

    const hasNumber = /\d/.test(password)

    const passwordVerification = () => {
        setFormData({ userpassword: password });
        nextStep();
    }

    return (
        <>
            <MobileHeader stepNo="Step 1" stepName="Setup Account" logo="step1" />
            <div className="password choose-password-container">
                <div className="main-title">
                    <h3>Choose a Password</h3>
                </div>

                <div className="account-description">
                    <div className="account-img">
                        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="56" height="56" rx="28" fill="#E6ECF3" />
                            <path d="M38.6673 40V37.3333C38.6673 35.9188 38.1054 34.5623 37.1052 33.5621C36.105 32.5619 34.7485 32 33.334 32H22.6673C21.2528 32 19.8963 32.5619 18.8961 33.5621C17.8959 34.5623 17.334 35.9188 17.334 37.3333V40M33.334 21.3333C33.334 24.2789 30.9462 26.6667 28.0007 26.6667C25.0551 26.6667 22.6673 24.2789 22.6673 21.3333C22.6673 18.3878 25.0551 16 28.0007 16C30.9462 16 33.334 18.3878 33.334 21.3333Z" stroke="#00438B" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                    </div>
                    <div className="account-name-email">
                        <div className="account-name">{formData.firstname} {formData.lastname}</div>
                        <div className="account-email">{formData.email}</div>
                    </div>
                </div>

                <form id="password-verify" method="post" onSubmit={handleSubmit(passwordVerification)}>
                    <div className="password-form-container">
                        <div className={`form-row form-group ${errors.password ? 'password-error' : ''}`}>
                            <label htmlFor="password">Password*</label>
                            <input
                                className={`form-control ${!errors.password ? '' : 'passwordReq-error input-error'}`}
                                id="password"
                                placeholder="Enter account password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    requiredConfig,
                                    validate: () => (hasMinLength && hasSpecialChar && hasLowercase && hasUppercase && hasNumber) || "Passwords does not match Requirements",
                                    onChange: (e) => setFormData({ userpassword: e.target.value })
                                })}
                            />

                            <div className="input-group-append">
                                <span className="input-group-text" onClick={togglePasswordVisibility}>
                                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                </span>
                            </div>
                            {errors.password && <div className="error-message">{errors.password.message}</div>}
                        </div>

                        <div className={`form-row form-group ${!errors.repassword ? '' : 'passwordMatch-error'}`}>
                            <label htmlFor="confirm-password">Confirm Password*</label>
                            <input
                                className={`form-control ${!errors.repassword ? '' : 'input-error'}`}
                                id="confirm-password"
                                placeholder="Enter account password"
                                type={ConfirmPassword ? "text" : "password"}
                                name="repassword"
                                {...register("repassword",
                                    {
                                        ...requiredConfig,
                                        validate: (value) => {
                                            const password = getValues("password");
                                            return password === value || "Passwords does not match"
                                        },
                                    })}
                            />
                            <div className="input-group-append repassword">
                                <span className="input-group-text" onClick={toggleConfirmPasswordVisibility}>
                                    <FontAwesomeIcon icon={ConfirmPassword ? faEye : faEyeSlash} />
                                </span>
                            </div>
                            {errors.repassword && <div className="error-message">{errors.repassword.message}</div>}
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
                                        <span className={`checkbox-custom ${hasMinLength ? "active" : ""}`}></span>
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
                                        <span className={`checkbox-custom ${hasSpecialChar ? "active" : ""}`}></span>
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
                                        <span className={`checkbox-custom ${hasLowercase ? "active" : ""}`}></span>
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
                                        <span className={`checkbox-custom ${hasUppercase ? "active" : ""}`}></span>
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
                                        <span className={`checkbox-custom ${hasNumber ? "active" : ""}`}></span>
                                        1 number
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="confirm-btn">
                        <button
                            className="verify-btn"
                            type="submit"
                        >
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Password;