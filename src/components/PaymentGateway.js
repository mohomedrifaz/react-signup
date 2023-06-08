import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const PaymentGateway = () => {

    const [totalPrice, setTotalPrice] = useState('$120');


    return (
        <div className="payment-gateway payment-container" >

            <div className="form-container">

                <div className="main-title">
                    <h2> Enter payment info </h2>
                </div>

                <div className="card-verification-info">
                    <div className="info-content">
                       Credit card identify verification by our clients
                       plays a crucial role in preventing bad actors from
                       misusing our cloud services
                    </div>
                    <div className="info-img">
                        
                    </div>
                </div>

                <div id="signup-form">
                    <div className="support-card-images">

                    </div>
                    <div className="form-row form-row-1">
                        <div className="form-row-col1">
                            <label className="label row2-label" for="card_number"> Card number* </label>
                            <input required type="text" name="card_number" className="input row1-input" placeholder="Enter card number" />
                            <span className="card-verification-note">  </span>
                        </div>
                        <div className="form-row-col2">
                            <label className="label row2-label" for="expiry_date"> Expiry* </label>
                            <input required type="text" name="expiry_date" className="input row1-input" placeholder="MM/YY" />
                        </div>
                    </div>

                    <div className="form-row form-row-2">
                        <div className="form-row-col1">
                            <label className="label row2-label" for="card_name"> Name on Card * </label>
                            <input required type="text" name="card_name" className="input row2-input" placeholder="Enter card name" />
                            <span className="name-verification-note">  </span>
                        </div>
                        <div className="form-row-col2">
                            <label className="label row2-label" for="expiry_date"> CCV* </label>
                            <input required type="text" name="ccv" className="input row1-input" placeholder="..." />
                        </div>
                    </div>

                    <div className="form-row form-row-3">
                        <div className="form-row-colfull">
                            <label className="label row3-label" for="address"> Billing address* </label>
                            <input required class="input row3-input" type="text" name="address" placeholder="Street Address (Apartment or Suite number)" />
                        </div>
                    </div>

                    <div className="form-row form-row-4">
                        <div className="form-row-col1">
                            <label className="label row4-label" for="city"> City* </label>
                            <input required className="input row4-input" type="text" name="city" placeholder="Enter City" />
                        </div>
                        <div className="form-row-col2">
                            <label className="label row4-label" for="state"> State/Province* </label>
                            <select className="select row4-select" name="state" >
                                <option value="" disabled> Select State </option>
                                <option>1-4</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row form-row-5">
                        <div className="form-row-col1">
                            <label className="label row4-label" for="zip"> Zip/Postal* </label>
                            <input required className="input row4-input" type="text" name="zip" placeholder="Enter zip/postal code" />
                        </div>
                        <div className="form-row-col2">
                            <label className="label row4-label" for="state"> Country* </label>
                            <select class="select row3-select" name="country" id="country-list" >
                                <option value="" disabled> Select Country </option>
                                <option>SL</option>
                                <option>US</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row form-row-6">
                        <div className="form-row-colfull">
                            <div className="info-message">
                                <div className="info-svg">
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                </div>
                                <div className="info-content">
                                    By clicking "Agree and Create Cloud Computer", you agree to the following
                                    terms:<span>you will be charged {totalPrice} monthly; you must cancel before Apr 25,
                                        2023 in order to receive a full refund; and you accept the <a href="#"> Terms of Use. </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="action-btn">
                        <button className="back-btn">
                            Previous Step
                        </button>
                        <button className="verify-btn">
                            Agree and Create Cloud Computer
                        </button>
                    </div>
                </div>
            </div>

            <div className="asset-details-container">
                <div className="package-details-container">
                    <div className="title-message">
                        <div className="package-title"> The Startup </div>
                        <div className="message-content"> 7 Day No-Risk Trial* </div>
                    </div>
                    <div className="list-content">
                        <ul>
                            <li>2 CPU Cores</li>
                            <li>8 GB Memory (RAM)</li>
                            <li>50 GB Storage</li>
                            <li>1 Admin included, $10 for additional users</li>
                            <li>2 to 4 Users - Recommended</li>
                            <li>Team Cloud Desktop</li>
                        </ul>
                    </div>
                    <div className="trial-message">
                        *Try our no-risk trial! Cancel in 7 days, nocharge and fees. Continue & we bill from Day 1.
                    </div>
                </div>
                
                <div className="pricing-container">
                    
                    <div className="pricing-single-pack">
                        <div className="package-details">
                            <div className="package-title"> Location </div>
                            <div className="package-value"> Montreal (Canada East) </div>
                        </div>
                        <div className="link">
                          
                        </div>
                    </div>

                    <div className="pricing-single-pack">
                        <div className="package-details">
                            <div className="package-title"> Template </div>
                            <div className="package-value"> Windows 11 Multi-User </div>
                        </div>
                        <div className="link">
                            <a href="#"> Change </a>
                        </div>
                    </div>

                    <div className="pricing-single-pack">
                        <div className="package-details">
                            <div className="package-title"> Commitment </div>
                            <div className="package-value"> Yearly, 12 monthly payments </div>
                        </div>
                        <div className="link">
                            <a href="#"> Change </a>
                            <span className="price"> $105.00/mo </span>
                        </div>
                    </div>

                    <div className="pricing-single-pack">
                        <div className="package-details">
                            <div className="package-title"> Backup Retention </div>
                            <div className="package-value"> 2 Weeks backup </div>
                        </div>
                        <div className="link">
                            <a href="#"> Change </a>
                            <span className="price"> $7.50/mo </span>
                        </div>
                    </div>

                    <div className="pricing-single-pack">
                        <div className="package-details">
                            <div className="package-title"> IP Address </div>
                            <div className="package-value"> Public IP Address </div>
                        </div>
                        <div className="link">
                            <a href="#"> Change </a>
                            <span className="price"> $5.50/mo </span>
                        </div>
                    </div>

                </div>

                <div className="total-pricing-container">
                    <div className="total-title">
                        Total
                    </div>
                    <div className="total-price">
                        $117.50
                    </div>
                </div>

                <div className="condition-container">
                    <ul>
                        <li> Upon sign-up, your card is pre-authorized for $117.50 </li>
                        <li> When you sign up, we place a hold on your credit card. It's just a placeholder,
                            <span> no actual charges are made. Cancl before Apr 25, 2023, and we'll release it.</span> </li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default PaymentGateway;