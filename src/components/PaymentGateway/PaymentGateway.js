import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import './paymentgateway.css';
import paymentImage from "../../assets/images/securessl.png";
import securityImage from "../../assets/images/security-system.png";
import paymentCardsImage from "../../assets/images/payment.png";
import alertsvg from "../../assets/svg/cardAlert.svg";
import { set, useForm } from 'react-hook-form';
import MobileHeader from "../mobileHeader";

const PaymentGateway = ({ formData, appData }) => {

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
        mode: "onTouched"
    });

    const requiredConfig = {
        required: "Please complete this required field."
    };

    const handleVerify = () => {
        console.log('next-step');
    };

    const [errorList, setErrorList] = useState([]);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);

    const hardwarePlan = [...appData.personal_hardwares_plans, ...appData.team_hardwares_plans].find(plan => plan.hardware_id === formData.hardware.value);
    const packagePrice = hardwarePlan[`price_${formData.contract_type}_contract_plan_${formData.plan || 1}`];
    const backupPrice = appData.backup_retention[`${formData.contract_type}_contract`].find(retention => retention.days === formData.bck_retention?.value)?.price_per_gb || 0;
    const ipPrice = !!formData.ip ? appData.public_ip[`${formData.contract_type}_contract`] : 0;
    const total = [packagePrice, backupPrice, ipPrice].reduce((total, price) => parseFloat(total) + parseFloat(price), 0).toFixed(2);
    const dateInAWeek = ( new Date(new Date().setDate(new Date().getDate() + 7))).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const handleCardField = (e) => {
        const value = e.target.value;
        const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g
        const onlyNumbers = value.replace(/[^\d]/g, '').slice(0, 16);

        setValue( 'cardNumber', onlyNumbers.replace(regex, (regex, $1, $2, $3, $4) =>
            [$1, $2, $3, $4].filter(group => !!group).join(' ')
        ));
    }

    const handleExpiryField = (e) => {
        const value = e.target.value;
        const regex = /^(\d{0,2})(\d{0,2})$/g

        let onlyNumbers = value.replace(/[^\d]/g, '').slice(0, 4);
        if (onlyNumbers.length === 2) {
            onlyNumbers = onlyNumbers + '/';
        }

        setValue( 'expiry', onlyNumbers.replace(regex, (regex, $1, $2) =>
            [$1, $2].filter(group => !!group).join('/')
        ));
    }

    useEffect(() => {
        axios.get('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries+states.json')
            .then(response => {
                setCountries(response.data);
            })
    }, []);

    useEffect(() => {
        setValue("country", formData.country);
        setStates(countries.find(country => country.iso2 === formData.country)?.states || []);
    }, [countries]);

    const handleStripeSubmit = ({ nameOnCard, cardNumber, ccv, expiry, zip, billing, city, state, country }) => {
        const expiryMonth = expiry.split('/')[0];
        const expiryYear = expiry.split('/')[1];

        setErrorList([]);

        Stripe.setPublishableKey('pk_test_51LpeAeGwqitAZjLy9AZihfuc5L0LsPwzs01rWUuoh2uqlvWTkFIRbJGepcfZPyN7zcfOhYQNIEnxaD698FN9zQai009hcMKjfp');
        Stripe.card.createToken({
            name: nameOnCard,
            number: cardNumber.replaceAll(' ', ''),
            cvc: ccv,
            exp_month: expiryMonth,
            exp_year: expiryYear,
            address_zip: zip,
            address_line1: billing,
            address_city: city,
            address_state: state,
            address_country: country
        }, (status, response) => {
            if ( status !== 200 ) {
                setErrorList([{
                    message: response?.error?.message || 'We were unable to charge your card. Please verify information and call your bank to authorize foreign transactions'
                }])
            }
        });
    }

    return (
        <>
        <MobileHeader stepNo="Step 5" stepName="Billing & Payment" logo="step5" />

        <div className="payment-gateway payment-container" >

            <div className="form-container">

                <div className="main-title">
                    <h3> Enter payment info </h3>
                    <img src={paymentImage} />
                </div>

                <div className="card-verification-info">
                    <div className="info-content">
                        Credit card identify verification by our clients
                        plays a crucial role in preventing bad actors from
                        misusing our cloud services
                    </div>
                    <div className="info-img">
                        <img src={securityImage} />
                    </div>
                </div>

                <form id="payment" method="post" onSubmit={handleSubmit(handleStripeSubmit)}>
                    <div id="signup-form">
                        <div className="support-card-images">
                            <img src={paymentCardsImage} />
                        </div>
                        <div className="form-row form-row-1">

                            <div className="form-group form-group--70">
                                <label htmlFor="card_number"> Card number* </label>
                                <input type="text" name="card_name" placeholder="Enter card number"
                                    className={`form-control ${errors.cardNumber ? "input-error" : ""}`}
                                    {...register("cardNumber", {...requiredConfig, onChange: handleCardField})} />
                                {errors.cardNumber && <div className="error-message">{errors.cardNumber.message}</div>}

                            </div>

                            <div className="form-group form-group--30">
                                <label htmlFor="expiry_date"> Expiry* </label>
                                <input type="text" name="expiry_date" placeholder="MM/YY"
                                    className={`form-control ${errors.expiry ? "input-error" : ""}`}
                                    {...register("expiry", {...requiredConfig, onChange: handleExpiryField})} />
                                {errors.expiry && <div className="error-message">{errors.expiry.message}</div>}
                            </div>

                        </div>

                        <div className="form-row form-row-2">
                            <div className="form-group form-group--70">
                                <label htmlFor="card_name" >Name on Card * </label>
                                <input type="text" name="card_name" placeholder="Enter card name"
                                    className={`form-control ${errors.nameOnCard ? "input-error" : ""}`}
                                    {...register("nameOnCard", requiredConfig)} />
                                {errors.nameOnCard && <div className="error-message">{errors.nameOnCard.message}</div>}
                            </div>
                            <div className="form-group form-group--30">
                                <label htmlFor="ccv">CCV*</label>
                                <input type="number" name="ccv" placeholder="..."
                                    className={`form-control ${errors.ccv ? "input-error" : ""}`}
                                    {...register("ccv", { ...requiredConfig, maxLength: { value: 3, message: 'CCV cannot exceed more than 3 letters' }})} />
                                {errors.ccv && <div className="error-message">{errors.ccv.message}</div>}
                            </div>
                        </div>

                        <div className="form-row form-row-3">
                            <div className="form-group">
                                <label htmlFor="address"> Billing address* </label>
                                <input type="text" name="address"
                                    placeholder="Street Address (Apartment or Suite number)"
                                    className={`form-control ${errors.billing ? "input-error" : ""}`}
                                    {...register("billing", requiredConfig)} />
                                {errors.billing && <div className="error-message">{errors.billing.message}</div>}
                            </div>
                        </div>

                        <div className="form-row form-row-4">
                            <div className="form-group form-group--70">
                                <label htmlFor="city" >City* </label>
                                <input type="text" name="city" placeholder="Enter City"
                                    className={`form-control ${errors.city ? "input-error" : ""}`}
                                    {...register("city", requiredConfig)} />
                                {errors.city && <div className="error-message">{errors.city.message}</div>}
                            </div>
                            <div className="form-group form-group--30">
                                <label htmlFor="state"> State/Province* </label>
                                { Array.isArray(states) && states.length ? 
                                    (
                                        <select className={`form-control ${errors.state ? "input-error" : ""}`}
                                            name="state" {...register("state", requiredConfig)}>
                                            <option value="" disabled>Select State</option>
                                            {states.map(({state_code, name}) => (
                                                <option key={state_code} value={state_code}>{name}</option>
                                            ))}
                                        </select>
                                    ) :
                                    (
                                        <input type="text" name="state" className="form-control" placeholder="Enter State/Province" {...register("state", requiredConfig)}/>
                                    )
                                }
                                {errors.state && <div className="error-message">{errors.state.message}</div>}
                            </div>
                        </div>

                        <div className="form-row form-row-5">
                            <div className="form-group form-group--70">
                                <label htmlFor="zip" > Zip/Postal* </label>
                                <input type="text" name="zip" placeholder="Enter zip/postal code"
                                    className={`form-control ${errors.zip ? "input-error" : ""}`}
                                    {...register("zip", requiredConfig)} />
                                {errors.zip && <div className="error-message">{errors.zip.message}</div>}
                            </div>
                            <div className="form-group form-group--30">
                                <label htmlFor="state">Country*</label>
                                <select className={`form-control ${errors.country ? "input-error" : ""}`}
                                    name="country" id="country-list"
                                    {...register("country", {...requiredConfig, onChange: (e) => {
                                        setValue("country", e.target.value);
                                        setStates(countries.find(country => country.iso2 === e.target.value)?.states || []);
                                    }})}
                                >
                                    <option value="" disabled> Select Country </option>
                                    {countries.map(({iso2, name}) => (
                                        <option key={iso2} value={iso2}>{name}</option>
                                    ))}
                                </select>
                                {errors.country && <div className="error-message">{errors.country.message}</div>}
                            </div>
                        </div>

                        <div className="form-row form-row-6">
                            <div className="form-row-colfull">
                                { errorList.map(error => (
                                    <div className="alert-message">
                                        <div className="alert-svg">
                                            <img src={alertsvg} alt="Card Alert" />
                                        </div>
                                        <div className="alert-content">{error.message}</div>
                                    </div>
                                ))}
                                <div className="info-message">
                                    <div className="info-svg">
                                        <FontAwesomeIcon icon={faCircleInfo} />
                                    </div>
                                    <div className="info-content">
                                        By clicking "Agree and Create Cloud Computer", you agree to the following
                                        terms:<span>you will be charged {`$${total}`} monthly; you must cancel before {`${dateInAWeek} `}  
                                        in order to receive a full refund; and you accept the <a href="#"> Terms of Use. </a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="action-btn">
                            <button className="back-btn">
                                Previous Step
                            </button>
                            <button
                                className="verify-btn"
                                type="submit">
                                Agree and Create Cloud Computer
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="asset-details-container">
                <div className="packages-details-container-bg">
                    <div className="package-details-container">
                        <div className="title-message">
                            <div className="package-title">{formData.hardware?.display}</div>
                            <div className="message-content">7 Day No-Risk Trial*</div>
                        </div>
                        <div className="list-content">
                            <ul>
                                {[
                                    `${hardwarePlan?.cpus} Cores`,
                                    `${hardwarePlan?.memory_display} Memory (RAM)`,
                                    `${hardwarePlan?.storage1_display} Storage`,
                                ].map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                                <li>1 Admin included, $10 for additional users</li>
                                <li>{hardwarePlan?.users} Users - Recommended</li>
                                <li>Team Cloud Desktop</li>
                            </ul>
                        </div>
                        <div className="trial-message">
                            *Try our no-risk trial! Cancel in 7 days, nocharge and fees. Continue & we bill from Day 1.
                        </div>
                    </div>
                </div>


                <div className="pricing-container">

                    <div className="pricing-single-pack">
                        <div className="package-details">
                            <div className="package-title">Location</div>
                            <div className="package-value">{formData.region?.display}</div>
                        </div>
                        <div className="link">

                        </div>
                    </div>

                    <div className="pricing-single-pack">
                        <div className="package-details">
                            <div className="package-title">Template</div>
                            <div className="package-value"> {formData.software?.display} </div>
                        </div>
                        <div className="link">
                            <a href="#">Change</a>
                        </div>
                    </div>

                    <div className="pricing-single-pack">
                        <div className="package-details">
                            <div className="package-title">Commitment</div>
                            <div className="package-value"> {`${formData.contract_type} `}, 12 monthly payments </div>
                        </div>
                        <div className="link">
                            <a href="#">Change</a>
                            <span className="price">{`$${packagePrice}/mo`}</span>
                        </div>
                    </div>

                    <div className="pricing-single-pack">
                        <div className="package-details">
                            <div className="package-title">Backup Retention</div>
                            <div className="package-value">{formData.bck_retention.display || `1 week backup`}</div>
                        </div>
                        <div className="link">
                            <a href="#">Change</a>
                            <span className="price">{`$${backupPrice}/mo`}</span>
                        </div>
                    </div>

                    <div className="pricing-single-pack">
                        <div className="package-details">
                            <div className="package-title">IP Address</div>
                            <div className="package-value">{formData.ip ? `Public` : `Private`} IP address</div>
                        </div>
                        <div className="link">
                            <a href="#">Change</a>
                            <span className="price">{`$${ipPrice}/mo`}</span>
                        </div>
                    </div>

                </div>

                <div className="total-pricing-container">
                    <div className="total-title">
                        Total
                    </div>
                    <div className="total-price">
                        {`$${total}`}
                    </div>
                </div>

                <div className="condition-container">
                    <ul>
                        <li> Upon sign-up, your card is pre-authorized for {`$${total}`}</li>
                        <li> When you sign up, we place a hold on your credit card. It's just a placeholder,
                            <span> no actual charges are made. Cancl before {dateInAWeek}, and we'll release it.</span> </li>
                    </ul>
                </div>

            </div>

            <div className="info-message-mobile">
                <div className="info-svg">
                    <FontAwesomeIcon icon={faCircleInfo} />
                </div>
                <div className="info-content">
                    By clicking "Agree and Create Cloud Computer", you agree to the following
                    terms:<span>you will be charged {`$${total}`} monthly; you must cancel before {dateInAWeek} in order to receive a full refund; and you accept the <a href="#"> Terms of Use. </a>
                    </span>
                </div>
            </div>

            <div className="verification-actions-mobile">
                <button
                    className="verify-btn"
                    onClick={handleVerify}
                    type="submit"
                >
                    Agree and Create Cloud Computer
                </button>
            </div>

        </div>
        </>
    )
}

export default PaymentGateway;