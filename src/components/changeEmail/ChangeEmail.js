import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import './changeEmail.css';

const ChangeEmail = ( {onNext} ) => {

	const emailChangeVerification = () => {
		onNext();
	}

	return (
		<div className="change-email-container">
			<div className="main-title">
				<h3> Change Email Address </h3>
			</div>

			<div className="form-group">
				<label for="email"> Enter your new email address </label>
				<input type="email" className="form-control"></input>
				<p className="help-text"> 
					<FontAwesomeIcon icon={faCircleInfo} />
					we will send a verification code to this email ID 
				</p>
			</div>

			<div className="action-btn">
				<button className="back-btn">
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