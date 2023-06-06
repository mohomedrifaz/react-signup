import React, { useState } from "react";
import PlanCards from './PlanCards';

const SelectPlan = () => {

    const pricingPlans = [
        {
            title: 'The Founder',
            users: '1',
            monthlyprice: '$25',
            yearlyprice: '$20',
            offervalue: '$60',
            features: ['2 CPU core', '4 GB Memory RAM', '50 GB Storage']
        },
        {
            title: 'The Startup',
            users: '2-4',
            monthlyprice: '$55',
            yearlyprice: '$45',
            offervalue: '$120',
            features: ['2 CPU core', '8 GB Memory RAM', '50 GB Storage']
        },
        {
            title: 'The SMB',
            users: '5-9',
            monthlyprice: '$85',
            yearlyprice: '$65',
            offervalue: '$240',
            features: ['4 CPU core', '16 GB Memory RAM', '50 GB Storage']
        },
        {
            title: 'The Firm',
            users: '10-16',
            monthlyprice: '$125',
            yearlyprice: '$100',
            offervalue: '$350',
            features: ['8 CPU core', '32 GB Memory RAM', '50 GB Storage']
        },
        {
            title: 'The Company',
            users: '17-32',
            monthlyprice: '$150',
            yearlyprice: '$120',
            offervalue: '$420',
            features: ['16 CPU core', '64 GB Memory RAM', '50 GB Storage']
        },

    ];

    const [activeTab, setActiveTab] = useState(1);

    const handleTabChange = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    return (
        <div className="select-plan-container">

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

            <div className="enable-backups-container">
                <label className="checkbox-label">
                    <input type="checkbox" className="checkbox-input" />
                </label>
                <div className="info-box">
                    Enable Daily Backups and a Professional Antivirus <span className="business-card"> Business Plan </span>
                    <span className="recommended-card"> Recommended </span>
                </div>
            </div>

            <div className="pricing-cards">
                {pricingPlans.map((plan, index) => (
                    <PlanCards key={index} title={plan.title} monthlyprice={plan.monthlyprice} yearlyprice={plan.yearlyprice}
                    features={plan.features} offervalue={plan.offervalue} users={plan.users}/>
                ))}
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