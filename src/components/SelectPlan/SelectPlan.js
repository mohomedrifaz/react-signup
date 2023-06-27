import React, { useState, useEffect, useRef } from "react";
import PlanCards from './PlanCards';
import SpecialCard from "./SpecialCard";
import './selectPlan.css';
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const SelectPlan = ({ onNext, backupState }) => {

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

    const teamPlans = [
        {
            "title": "The Founder",
            "config": "2CPU 4GB RAM 50GB NVMe",
            "description": "User",
            "users": "1",
            "price_user_month": "",
            "price_user_year": "",
            "hardware_id": 36,
            "cpus": 2,
            "memory_display": "4 GB",
            "memory_total": 4096,
            "storage1_display": "50 GB",
            "ref": "",
            "price_yearly_contract_plan_1": "40.00",
            "price_monthly_contract_plan_1": "46.00",
            "yearly_contract_saving_plan_1": "72.00",
            "price_year_1": "600",
            "storage_price_1": "0.15",
            "price_yearly_contract_plan_2": "60.00",
            "price_monthly_contract_plan_2": "69.00",
            "yearly_contract_saving_plan_2": "108.00",
            "price_year_2": "900",
            "storage_price_2": "0.225"
        },
        {
            "title": "The Startup",
            "config": "2CPU 8GB RAM 50GB NVMe",
            "description": "Users",
            "users": "2 to 4",
            "price_user_month": "10",
            "price_user_year": "8",
            "hardware_id": 37,
            "cpus": 2,
            "memory_display": "8 GB",
            "memory_total": 8192,
            "storage1_display": "50 GB",
            "ref": "",
            "price_yearly_contract_plan_1": "70.00",
            "price_monthly_contract_plan_1": "80.50",
            "yearly_contract_saving_plan_1": "126.00",
            "price_year_1": "1020",
            "storage_price_1": "0.15",
            "price_yearly_contract_plan_2": "105.00",
            "price_monthly_contract_plan_2": "120.74",
            "yearly_contract_saving_plan_2": "188.87",
            "price_year_2": "1530",
            "storage_price_2": "0.225",
            "isPopular": true
        },
        {
            "title": "The SMB",
            "config": "4CPU 16GB RAM 50GB NVMe",
            "description": "Users",
            "users": "5 to 9",
            "price_user_month": "10",
            "price_user_year": "8",
            "hardware_id": 38,
            "cpus": 4,
            "memory_display": "16 GB",
            "memory_total": 16384,
            "storage1_display": "50 GB",
            "ref": "",
            "price_yearly_contract_plan_1": "140.00",
            "price_monthly_contract_plan_1": "161.00",
            "yearly_contract_saving_plan_1": "252.00",
            "price_year_1": "2100",
            "storage_price_1": "0.15",
            "price_yearly_contract_plan_2": "210.00",
            "price_monthly_contract_plan_2": "241.49",
            "yearly_contract_saving_plan_2": "377.88",
            "price_year_2": "3150",
            "storage_price_2": "0.225"
        },
        {
            "title": "The Firm",
            "config": "8CPU 32GB RAM 50GB NVMe",
            "description": "Users",
            "users": "10 to 16",
            "price_user_month": "10",
            "price_user_year": "8",
            "hardware_id": 39,
            "cpus": 8,
            "memory_display": "32 GB",
            "memory_total": 32768,
            "storage1_display": "50 GB",
            "ref": "",
            "price_yearly_contract_plan_1": "280.00",
            "price_monthly_contract_plan_1": "322.00",
            "yearly_contract_saving_plan_1": "504.00",
            "price_year_1": "4200",
            "storage_price_1": "0.15",
            "price_yearly_contract_plan_2": "420.00",
            "price_monthly_contract_plan_2": "482.99",
            "yearly_contract_saving_plan_2": "755.88",
            "price_year_2": "6300",
            "storage_price_2": "0.225"
        },
        {
            "title": "The Company",
            "config": "16CPU 64GB RAM 50GB NVMe",
            "description": "Users",
            "users": "17 to 32",
            "price_user_month": "10",
            "price_user_year": "8",
            "hardware_id": 40,
            "cpus": 16,
            "memory_display": "64 GB",
            "memory_total": 65536,
            "storage1_display": "50 GB",
            "ref": "",
            "price_yearly_contract_plan_1": "560.00",
            "price_monthly_contract_plan_1": "644.00",
            "yearly_contract_saving_plan_1": "1008.00",
            "price_year_1": "8400",
            "storage_price_1": "0.15",
            "price_yearly_contract_plan_2": "840.00",
            "price_monthly_contract_plan_2": "965.99",
            "yearly_contract_saving_plan_2": "1511.88",
            "price_year_2": "12600",
            "storage_price_2": "0.225"
        }
    ];

    const personalPlans = [
        {
            "title": "The Intern",
            "config": "2CPU 4GB 50GB NVMe",
            "description": "Data-entry, word-processing, Quickbooks, light multi-task",
            "users": "1",
            "price_user_month": "10",
            "price_user_year": "8",
            "hardware_id": 47,
            "cpus": 2,
            "memory_display": "4 GB",
            "memory_total": 4096,
            "storage1_display": "50 GB",
            "ref": "",
            "price_yearly_contract_plan_1": "35.00",
            "price_monthly_contract_plan_1": "40.25",
            "yearly_contract_saving_plan_1": "63.00",
            "price_year_1": "600",
            "storage_price_1": "0.15",
            "price_yearly_contract_plan_2": "52.50",
            "price_monthly_contract_plan_2": "60.37",
            "yearly_contract_saving_plan_2": "94.43",
            "price_year_2": "900",
            "storage_price_2": "0.225"
        },
        {
            "title": "The Doer",
            "config": "2CPU 8GB 50GB NVMe",
            "description": "Business applications, Photoshop design, medium",
            "users": "2 to 4",
            "price_user_month": "10",
            "price_user_year": "8",
            "hardware_id": 50,
            "cpus": 2,
            "memory_display": "8 GB",
            "memory_total": 8192,
            "storage1_display": "50 GB",
            "ref": "",
            "price_yearly_contract_plan_1": "60.00",
            "price_monthly_contract_plan_1": "69.00",
            "yearly_contract_saving_plan_1": "108.00",
            "price_year_1": "1020",
            "storage_price_1": "0.15",
            "price_yearly_contract_plan_2": "90.00",
            "price_monthly_contract_plan_2": "103.49",
            "yearly_contract_saving_plan_2": "161.87",
            "price_year_2": "1530",
            "storage_price_2": "0.225"
        },
        {
            "title": "The Workaholic",
            "config": "4CPU 16GB 50GB NVMe",
            "description": "Intensive applications, software development, heavy multi-task",
            "users": "5 to 9",
            "price_user_month": "10",
            "price_user_year": "8",
            "hardware_id": 53,
            "cpus": 4,
            "memory_display": "16 GB",
            "memory_total": 16384,
            "storage1_display": "50 GB",
            "ref": "",
            "price_yearly_contract_plan_1": "120.00",
            "price_monthly_contract_plan_1": "138.00",
            "yearly_contract_saving_plan_1": "216.00",
            "price_year_1": "2100",
            "storage_price_1": "0.15",
            "price_yearly_contract_plan_2": "180.00",
            "price_monthly_contract_plan_2": "206.99",
            "yearly_contract_saving_plan_2": "323.88",
            "price_year_2": "3150",
            "storage_price_2": "0.225"
        },
        {
            "title": "The Magnate",
            "config": "8CPU 32GB 50GB NVMe",
            "description": "Ultimate multi-task, multiple heavy apps, jet flying speed",
            "users": "10 to 16",
            "price_user_month": "10",
            "price_user_year": "8",
            "hardware_id": 56,
            "cpus": 8,
            "memory_display": "32 GB",
            "memory_total": 32768,
            "storage1_display": "50 GB",
            "ref": "",
            "price_yearly_contract_plan_1": "240.00",
            "price_monthly_contract_plan_1": "276.00",
            "yearly_contract_saving_plan_1": "432.00",
            "price_year_1": "4200",
            "storage_price_1": "0.15",
            "price_yearly_contract_plan_2": "360.00",
            "price_monthly_contract_plan_2": "413.99",
            "yearly_contract_saving_plan_2": "647.88",
            "price_year_2": "6300",
            "storage_price_2": "0.225"
        }
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

    const [selectedCardIndex, setSelectedCardIndex] = useState({
        teamCloud: null,
        individualCloud: null
    });

    const [selectedPlan, setSelectedPlan] = useState(null);

    const handleCardSelection = (index, category) => {
        setSelectedCardIndex((prevSelectedCardIndex) => {
            const newSelectedCardIndex = { ...prevSelectedCardIndex };
            newSelectedCardIndex[category] = index;
            return newSelectedCardIndex;
        });

        const selectedPlan = category === "teamCloud" ? teamPlans[index] : personalPlans[index];
        setSelectedPlan(selectedPlan, category)

    }

    const planVerification = () => {
        backupState(isBackup);
        onNext(selectedPlan);
    }

    const sliderSettings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
    }

    return (
        <div
            className={`select-plan-container ${showOverlay ? 'overlayed' : ''}`}
            onClick={handleOverlayClick}
        >

            <div className="main-title">
                <h3> Compare our plans and find yours </h3>
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
                    {teamPlans.map((plan, index) => {
                        const configParts = plan.config.split(' ');

                        return <PlanCards key={index}
                            hardwareId={plan.hardware_id}
                            title={plan.title}
                            monthlyprice={plan.price_monthly_contract_plan_1}
                            yearlyprice={plan.price_yearly_contract_plan_1}
                            features={configParts}
                            offervalue={plan.yearly_contract_saving_plan_1}
                            users={plan.users}
                            isPopular={plan.isPopular}
                            isBackup={isBackup}
                            isSelected={index === selectedCardIndex.teamCloud}
                            onClick={() => handleCardSelection(index, "teamCloud")}
                        />
                    })}
                </div>
                }
                {activeTab === 2 && <div className="team-individual-pricing-container">
                    {personalPlans.map((plan, index) => {
                        const configParts = plan.config.split(' ');

                        return <PlanCards key={index}
                            hardwareId={plan.hardware_id}
                            title={plan.title}
                            monthlyprice={plan.price_monthly_contract_plan_1}
                            yearlyprice={plan.price_yearly_contract_plan_1}
                            features={configParts}
                            offervalue={plan.yearly_contract_saving_plan_1}
                            users={plan.users}
                            isPopular={plan.isPopular}
                            functions={plan.description}
                            isSelected={index === selectedCardIndex.teamIndividual}
                            onClick={() => handleCardSelection(index, "teamIndividual")}
                        />
                    })}
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
                <button
                    className="verify-btn"
                    onClick={planVerification}>
                    Next
                </button>
            </div>

        </div>
    );
};

export default SelectPlan;