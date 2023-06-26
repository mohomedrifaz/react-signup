import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import './style.css';

export default function RegistrationForm() {

	const { register, handleSubmit, formState: { errors } } = useForm({
		mode: "onTouched"
	});

	useEffect(() => {
		console.log(errors);
	}, [errors]);

	const requiredConfig = {
		required: "Please complete this required field."
	};

  return (
	<div className="registration-form-container">
		<div className="form-panel">
			<h1 className="page-title">Sign up</h1>
			<p className="sub-title">(Not billed until your 7-Day trial is complete)</p>
			<div className="form-wrapper">
				<form id="registration-form" method="post" onSubmit={ handleSubmit( (data) => console.log(data) ) }>
					<div className="form-row">
						<div className="form-group form-group--half">
							<label htmlFor="first-name">First Name*</label>
							<input
								type="text" name="first-name" id="first-name" className="form-control" placeholder="Enter first name"
								{ ...register("firstName", requiredConfig) }
							/>
							{ errors.firstName && <div className="error-message">{ errors.firstName.message }</div> }
						</div>
						<div className="form-group form-group--half">
							<label htmlFor="last-name">Last Name*</label>
							<input
								type="text" name="last-name" id="last-name" className="form-control" placeholder="Enter last name"
								{ ...register("lastName", requiredConfig) }
							/>
							{ errors.lastName && <div className="error-message">{ errors.lastName.message }</div> }
						</div>
					</div>
					<div className="form-row">
						<div className="form-group">
							<label htmlFor="email">Email*</label>
							<input
								type="email" name="email" id="email" className="form-control" placeholder="Enter email"
								{ ...register("email", { ...requiredConfig, validate: ( value ) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test( value ) || "Please enter a valid email." }) }
							/>
							<p className="help-text">
								<FontAwesomeIcon icon={faCircleInfo} /> We will send a verification to this email ID
							</p>
							{ errors.email && <div className="error-message">{ errors.email.message }</div> }
						</div>
					</div>
					<div className="form-row">
						<div className="form-group">
							<label htmlFor="phone">Phone Number*</label>
							<input
								type="tel" name="phone" id="phone" className="form-control"
								{ ...register("phone", requiredConfig) }
							/>
							{ errors.phone && <div className="error-message">{ errors.phone.message }</div> }
						</div>
					</div>
					<div className="form-row">
						<div className="form-group form-group--half">
							<label htmlFor="company">Company Name*</label>
							<input
								type="text" name="company" id="company" className="form-control" placeholder="Enter company name"
								{ ...register("company", requiredConfig) }
							/>
							{ errors.company && <div className="error-message">{ errors.company.message }</div> }
						</div>
						<div className="form-group form-group--half">
							<label htmlFor="company-size">Company Size</label>
							<select name="company-size" id="company-size" className="form-control">
								<option value="">Please Select</option>
								<option value="1-4">1-4</option>
								<option value="5-10">5-10</option>
								<option value="11-20">11-20</option>
								<option value="21-30">21-30</option>
								<option value="21-50">21-50</option>
								<option value="51-100">51-100</option>
								<option value="100+">100+</option>
							</select>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group">
							<label htmlFor="problem">Explain the problem you’re trying to solve*</label>
							<textarea
								name="problem" id="problem" className="form-control" placeholder="Enter a description"
								{ ...register("problem", requiredConfig) }
							></textarea>
							{ errors.problem && <div className="error-message">{ errors.problem.message }</div> }
						</div>
					</div>
					<div className="form-row">
						<div className="form-group checkbox">
							<label htmlFor="promotion-agree">
								<input type="checkbox" name="promotion-agree" id="promotion-agree" className="form-control" />
								I agree to receive information about your products, promotions, and awards through email and SMS
							</label>
						</div>
					</div>
					<div className="form-row">
						<button id="submit-registration" type="submit">Start Your 7-Day Risk Free Trial</button>
					</div>
				</form>
				<p>Already have an account? <a href="#">Log In</a></p>
				<p>By signing up you agree to our <a href="#">Terms of Service</a></p>
			</div>
		</div>
		<div className="slide-panel">

		</div>
	</div>
  );
}