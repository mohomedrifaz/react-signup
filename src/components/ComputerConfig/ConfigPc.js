import React, { useState } from "react";
import './ConfigPc.css';

const ConfigPc = () => {

    const handleCopyPassword = () => {
        const passwordInput = document.querySelector('.name-password-input-fields input[type="password"]');
        passwordInput.select();
        document.execCommand('copy');
    };

    return (
        <div className="config-pc-container">

            <div className="main-title">
                <h2> Your Windows Computer </h2>
            </div>

            <div className="name-password-container">
                <div className="name-password-input-fields">
                    <div className="form-row-colfull">
                        <label className="label"> Computer name </label>
                        <input required class="input" type="text" name="pc_name" placeholder="Eg: Tharaka's PC" />
                    </div>
                    <div className="form-row-colfull col2">
                        <label className="label"> Windows administrator password </label>
                        <div className="password-container">
                            <input required class="input" type="text" name="pc_pass" placeholder="" />
                            <button className="copy-button" onClick={handleCopyPassword}>
                              
                                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.6875 2.21875L14.7812 0.3125C14.5938 0.125 14.3438 0 14.0625 0H8.96875C7.84375 0 6.96875 0.90625 6.96875 2V10C7 11.125 7.875 12 9 12H15C16.0938 12 17 11.125 17 10V2.9375C17 2.65625 16.875 2.40625 16.6875 2.21875ZM15.5 10C15.5 10.2812 15.25 10.5 15 10.5H8.96875C8.6875 10.5 8.46875 10.2812 8.46875 10V2.03125C8.46875 1.75 8.6875 1.53125 8.96875 1.53125H12.9688L13 3C13 3.5625 13.4375 4 14 4H15.4688V10H15.5ZM9.5 14C9.5 14.2812 9.25 14.5 9 14.5H2.96875C2.6875 14.5 2.46875 14.2812 2.46875 14V6.03125C2.46875 5.75 2.71875 5.53125 2.96875 5.53125H6V4H2.96875C1.875 4 0.96875 4.90625 0.96875 6L1 14C1 15.125 1.875 16 3 16H9C10.0938 16 11 15.125 11 14V13H9.5V14Z" fill="#212529" />
                                    </svg>
                            
                                <span> Copy </span>
                            </button>
                            <button className="regenerate-pass">
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.0742 9.7207C14.6426 9.58789 14.2109 9.82031 14.0781 10.252C13.3809 12.7422 11.0566 14.4688 8.4668 14.4688C6.24219 14.4688 4.25 13.207 3.25391 11.2812H6.60742C7.03906 11.2812 7.4043 10.9492 7.4043 10.4844C7.4043 10.0527 7.07227 9.6875 6.60742 9.6875H1.29492C0.863281 9.6875 0.498047 10.0527 0.498047 10.4844V15.7969C0.498047 16.2617 0.863281 16.5938 1.29492 16.5938C1.75977 16.5938 2.0918 16.2617 2.0918 15.7969V12.4102C3.41992 14.6348 5.84375 16.0625 8.4668 16.0625C11.7539 16.0625 14.6758 13.8711 15.6055 10.7168C15.7383 10.2852 15.5059 9.85352 15.0742 9.7207ZM15.6719 0.65625C15.207 0.65625 14.875 1.02148 14.875 1.45312V4.87305C13.5469 2.64844 11.123 1.1875 8.5 1.1875C5.21289 1.1875 2.25781 3.41211 1.32812 6.56641C1.22852 6.96484 1.46094 7.42969 1.89258 7.5293C2.32422 7.66211 2.75586 7.42969 2.85547 6.99805C3.58594 4.54102 5.91016 2.78125 8.5 2.78125C10.6914 2.78125 12.6836 4.07617 13.6797 5.96875H10.3594C9.89453 5.96875 9.5625 6.33398 9.5625 6.76562C9.5625 7.23047 9.89453 7.5625 10.3594 7.5625H15.6719C16.1035 7.5625 16.4688 7.23047 16.4688 6.76562V1.45312C16.4688 1.02148 16.1035 0.65625 15.6719 0.65625Z" fill="#003875" />
                                </svg>
                                <span> Regenerate </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="notice">
                    <div className="title"> Note </div>
                    <div className="content"> This will be the local administrator password of the virtual machine.
                        You may need this password later so please copy it and store it in a secure location.
                        It is strongly recommended to have a random password different from all the virtual machines.
                        We do NOT recommend putting the same password as your V2 Cloud account.
                    </div>
                </div>
            </div>

            <div className="main-title">
                <h2> Select Operating System <span className="sub-topic"> For Team Cloud Desktops </span></h2>
            </div>

            <div className="windows-cards-container">

            </div>

        </div>
    )
}

export default ConfigPc;