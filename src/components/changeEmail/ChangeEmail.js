import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { set, useForm } from 'react-hook-form';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import './changeEmail.css';

const ChangeEmail = ({ onNext }) => {

	const emailChangeVerification = (data) => {
		setFormData({email: document.getElementById('email').value});
		onNext();
	};

	const { register, handleSubmit, formState: { errors } } = useForm({
		mode: "onTouched"
	});

	const requiredConfig = {
		required: "Please complete this required field."
	};

	return (
		<div className="change-email-container">
			<div className="main-title">
				<h3> Change Email Address </h3>
			</div>

			<form id="change-email" method="post" onSubmit={handleSubmit(emailChangeVerification)}>
				<div className="form-group">
					<label for="email"> Enter your new email address </label>
					<input
						type="email" className={`form-control ${errors.email ? "input-error" : ""} ` } name="email" id="email"
						{...register("email", { ...requiredConfig, validate: (value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) || "Please enter a valid email." })}
					/>
					<p className="help-text">
						<FontAwesomeIcon icon={faCircleInfo} />
						we will send a verification code to this email ID
					</p>
					{errors.email && <div className="error-message">{errors.email.message}</div>}
				</div>

				<div className="action-btn">
					<button className="back-btn">
						Back
					</button>
					<button
						className="verify-btn"
						type="submit"
					>
						Continue
					</button>
				</div>
			</form>
		</div>
	)
}

export default ChangeEmail;