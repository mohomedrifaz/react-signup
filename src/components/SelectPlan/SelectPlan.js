import React, { useState, useEffect, useRef } from "react";
import PlanCards from './PlanCards';
import SpecialCard from "./SpecialCard";
import './selectPlan.css';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const SelectPlan = ({ formData, setFormData, stepData: { nextStep } }) => {

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

    const [showOverlay, setShowOverlay] = useState(false);


    const handleOverlayClick = () => {
        setShowOverlay(false);
    }

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setShowOverlay(true);
    //     }, 3000);

    //     return () => {
    //         clearTimeout(timer);
    //     };
    // }, []);



    const planVerification = () => {
        nextStep();
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
                            checked={formData.plan === 2}
                            onChange={(e) => setFormData({plan: e.target.checked ? 2 : 1})} />
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
                        Your Current Plan May Not Provide Adequate protection.
                        Lack of Antivirus or Daily Backups Leaves Your Business at Risk: Data Breach,
                        Financial Strain, and Reputational Damage. Are you sure you want to proceed without
                        upgrading to Our Business Plan?
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
                        return <PlanCards key={index}
                            {...plan}
                            isSelected={plan.hardware_id === formData.hardware?.value}
                            onSelect={(contract) => setFormData({hardware: { value: plan.hardware_id, display: plan.display }, contract_type: contract})}
                            isBusiness={formData.plan === 2}
                            plan={formData.hardware?.value}
                            planType={formData.contract_type}
                        />
                    })}
                </div>
                }
                {activeTab === 2 && <div className="team-individual-pricing-container">
                    {personalPlans.map((plan, index) => {
                        return <PlanCards key={index}
                            {...plan}
                            isSelected={plan.hardware_id === formData.hardware?.value}
                            onSelect={(contract) => setFormData({hardware: { value: plan.hardware_id, display: plan.display }, contract_type: contract})}
                            isBusiness={formData.plan === 2}
                            plan={formData.hardware?.value}
                            planType={formData.contract_type}
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