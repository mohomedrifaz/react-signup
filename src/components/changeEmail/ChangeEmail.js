import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import './changeEmail.css';

const ChangeEmail = ({ stepData: { prevChildStep } }) => {

	const emailChangeVerification = () => {
		setFormData({email: document.getElementById('email').value});
	}

	return (
		<div className="change-email-container">
			<div className="main-title">
				<h3> Change Email Address </h3>
			</div>

			<div className="form-group">
				<label for="email"> Enter your new email address </label>
				<input type="email" className="form-control" id="email"></input>
				<p className="help-text"> 
					<FontAwesomeIcon icon={faCircleInfo} />
					we will send a verification code to this email ID 
				</p>
			</div>

			<div className="action-btn">
				<button className="back-btn" onClick={prevChildStep}>
					Back
				</button>
				<button 
				className="verify-btn"
				onClick={emailChangeVerification}>
					Continue
				</button>
			</div>

		</div>
	)
}

export default ChangeEmail;