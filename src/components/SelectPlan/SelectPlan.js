import React, { useState, useEffect, useRef } from "react";
import PlanCards from './PlanCards';
import SpecialCard from "./SpecialCard";
// import SpecialCardImg from "./special-card-img.png";
import './selectPlan.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SelectPlan = () => {

    const sliderRef = useRef(null);

    useEffect(() => {
        // Optionally, configure any settings for the slider
        // For example, if you want to show multiple cards at a time:
        // sliderRef.current.slickSetOption({
        //   slidesToShow: 3,
        //   slidesToScroll: 1,
        // });
      }, []);
      
    const pricingPlans = [
        {
            title: 'The Founder',
            users: '1',
            monthlyprice: '$25',
            yearlyprice: '$20',
            offervalue: '$60',
            features: ['2 CPU core', '4 GB Memory RAM', '50 GB Storage'],
            isPopular: false
        },
        {
            title: 'The Startup',
            users: '2 - 4',
            monthlyprice: '$55',
            yearlyprice: '$45',
            offervalue: '$120',
            features: ['2 CPU core', '8 GB Memory RAM', '50 GB Storage'],
            isPopular: true
        },
        {
            title: 'The SMB',
            users: '5 - 9',
            monthlyprice: '$85',
            yearlyprice: '$65',
            offervalue: '$240',
            features: ['4 CPU core', '16 GB Memory RAM', '50 GB Storage'],
            isPopular: false
        },
        {
            title: 'The Firm',
            users: '10 - 16',
            monthlyprice: '$125',
            yearlyprice: '$100',
            offervalue: '$350',
            features: ['8 CPU core', '32 GB Memory RAM', '50 GB Storage'],
            isPopular: false
        },
        {
            title: 'The Company',
            users: '17 - 32',
            monthlyprice: '$150',
            yearlyprice: '$120',
            offervalue: '$420',
            features: ['16 CPU core', '64 GB Memory RAM', '50 GB Storage'],
            isPopular: false
        },

    ];

    const pricingPlansIndividual = [
        {
            title: 'The Intern',
            users: '',
            functions: 'Data-entry, word-processing, Quickbooks, light multi-task*',
            monthlyprice: '$35',
            yearlyprice: '$30',
            offervalue: '$60',
            features: ['2 CPU core', '4 GB Memory RAM', '50 GB Storage'],
            isPopular: false
        },
        {
            title: 'The Doer',
            users: '',
            functions: 'Business applications, Photoshop design, medium*',
            monthlyprice: '$75',
            yearlyprice: '$65',
            offervalue: '$120',
            features: ['2 CPU core', '8 GB Memory RAM', '50 GB Storage'],
            isPopular: false
        },
        {
            title: 'The Workholic',
            users: '',
            functions: 'Intensive applications, software development, heavy multi-task*',
            monthlyprice: '$95',
            yearlyprice: '$85',
            offervalue: '$130',
            features: ['4 CPU core', '16 GB Memory RAM', '50 GB Storage'],
            isPopular: false
        },
        {
            title: 'The Magnate',
            users: '',
            functions: 'Ultimate multi-task, multiple heavy apps, jet flying speed*',
            monthlyprice: '$115',
            yearlyprice: '$105',
            offervalue: '$170',
            features: ['8 CPU core', '32 GB Memory RAM', '50 GB Storage'],
            isPopular: false
        },

    ];

    const [activeTab, setActiveTab] = useState(1);

    const handleTabChange = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    const [isBackup, setIsBackup] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

    const handleCheckboxChange = () => {
        setIsBackup(!isBackup);
    }

    const handleOverlayClick = () => {
        setShowOverlay(false);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowOverlay(true);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div
            className={`select-plan-container ${showOverlay ? 'overlayed' : ''}`}
            onClick={handleOverlayClick}
        >

            <div className="main-title">
                <h2> Compare our plans and find yours </h2>
            </div>

            <div className="tab-container">
                <div
                    className={`tab ${activeTab === 1 ? 'active' : ''}`}
                    onClick={() => handleTabChange(1)}
                >
                    Team cloud desktop
                </div>
                <div
                    className={`tab ${activeTab === 2 ? 'active' : ''}`}
                    onClick={() => handleTabChange(2)}
                >
                    Individual cloud desktops
                </div>
            </div>
            <div className="tab-content">
                {activeTab === 1 && <div className="team-cloud-container">
                    <ul>
                        <li> Multi-User virtual machines based on Windows server </li>
                        <li> Good for general purpose computing </li>
                        <li> One admin included, $10 for additional users </li>
                        <li className="cross"> Certain versions of Office 365 are not compatible </li>
                    </ul>
                </div>}
                {activeTab === 2 && <div className="team-individual-container">
                    <ul>
                        <li> Single-User virtual machines based on Windows 10 desktop </li>
                        <li> This type of plan requires you to bring your own license for windows </li>
                        <li> Good for apps not compatible with Windows server </li>
                        <li> One admin included </li>
                    </ul>
                </div>}
            </div>

            <div className="backups-checbox-container">
                <div className={`enable-backups-container ${showOverlay ? 'overlayed' : ''}`}>
                    <label className="checkbox-label">
                        <input type="checkbox"
                            className="checkbox-input"
                            checked={isBackup}
                            onChange={handleCheckboxChange} />
                    </label>
                    <div className="info-box">
                        Enable Daily Backups and a Professional Antivirus <span className="business-card"> Business Plan </span>
                        <span className="recommended-card"> Recommended </span>
                    </div>
                </div>
                <div className="upgrade-plans-message">
                    - Upgrade available for all plans
                </div>
                <div className={`tooltip ${showOverlay ? 'overlayed' : ''}`}>
                    <div className="tooltip-title">
                        Enhance Your Data Security
                    </div>
                    <div className="tooltip-content">
                        Your Current Plan May Not Provide Adequate protection.<br />
                        Lack of Antivirus or Daily Backups Leaves Your Business <br />at Risk: Data Breach,
                        Financial Strain, and Reputational Damage.<br /> Are you sure you want to proceed without
                        upgrading to <br /> Our Business Plan?
                    </div>
                    <div className="cta-btns">
                        <button className="skip-btn">
                            Skip &gt;&gt;
                        </button>
                        <button className="upgrade-btn">
                            Upgrade to Business Plan
                        </button>
                    </div>
                </div>
            </div>

            <div className="pricing-cards" >
                {activeTab === 1 && <div className="team-cloud-pricing-container">
                    {pricingPlans.map((plan, index) => (
                        <PlanCards key={index} title={plan.title} monthlyprice={plan.monthlyprice} yearlyprice={plan.yearlyprice}
                            features={plan.features} offervalue={plan.offervalue} users={plan.users} isPopular={plan.isPopular} isBackup={isBackup} />
                    ))}
                </div>
                }
                {activeTab === 2 && <div className="team-individual-pricing-container">
                    {pricingPlansIndividual.map((plan, index) => (
                        <PlanCards key={index} title={plan.title} monthlyprice={plan.monthlyprice} yearlyprice={plan.yearlyprice}
                            features={plan.features} offervalue={plan.offervalue} users={plan.users} isPopular={plan.isPopular} functions={plan.functions} />
                    ))}
                    <SpecialCard
                        title="The Enterprise"
                        buttonText="Talk to an Expert"
                        imageUrl=""
                    />
                </div>}
            </div>

            <div className="users-message-box">
                *Actual number of users can differ depending on resource consumption (CPU, RAM) of your applications
            </div>

            <div className="action-btn">
                <button className="back-btn">
                    Previous Step
                </button>
                <button className="verify-btn">
                    Next
                </button>
            </div>

        </div>
    );
};

export default SelectPlan;