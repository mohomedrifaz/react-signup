import { useState } from "react";
import { register } from 'swiper/element/bundle';

import PlanCards from './PlanCards';
import SpecialCard from "./SpecialCard";
import MobileHeader from "../mobileHeader";

import arrowRight from './../../assets/svg/chevron-right.svg';

import './selectPlan.css';

register();

const PrevArrow = ({ onClick }) => {
	return (
		<div className="left-arrow" onClick={ onClick }>
			<img src={arrowRight} width="44" height="44" />
		</div>
	)
}

const NextArrow = ({ onClick }) => {
	return (
		<div className="right-arrow" onClick={ onClick }>
			<img src={arrowRight} width="44" height="44" />
		</div>
	)
}

const TabNav = ({ title, isActive, handleTabChange }) => {
    return (
        <div className={ `tab ${isActive ? 'active' : ''}` } onClick={handleTabChange}>{ title }</div>
    );
}

const SelectPlan = ({ formData, setFormData, appData }) => {
    const tabs = appData.plan_tabs.map(({name}) => name);

    const tabPlans = [
        appData.team_hardwares_plans.map(({ref, ...rest}) => ({...rest})),
        appData.personal_hardwares_plans.map(({ref, ...rest}) => ({...rest}))
    ];

    const [activeTab, setActiveTab] = useState(0);
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
        <>
            <MobileHeader stepNo="Step 3" stepName="Select Plan" logo="step3" />
            <div
                className={`select-plan-container ${showOverlay ? 'overlayed' : ''}`}
                onClick={handleOverlayClick}
            >
                <div className="main-title">
                    <h3>Compare our plans and find yours</h3>
                </div>

                <div className="tab-container">
                    { tabs.map(( title, index ) =>  (
                        <TabNav key={index} title={title} isActive={activeTab === index} handleTabChange={() => setActiveTab(index)} />
                    ) ) }
                </div>

                <div className="tab-content">
                    {activeTab === 0 && <div className="team-cloud-container">
                        <ul>
                            <li> Multi-User virtual machines based on Windows server </li>
                            <li> Good for general purpose computing </li>
                            <li> One admin included, $10 for additional users </li>
                            <li className="cross"> Certain versions of Office 365 are not compatible </li>
                        </ul>
                    </div>}
                    {activeTab === 1 && <div className="team-individual-container">
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
                                onChange={(e) => setFormData({ plan: e.target.checked ? 2 : 1 })} />
                        </label>
                        <div className="info-box">
                            Enable Daily Backups and a Professional Antivirus
                            <span className="business-card"> Business Plan </span>
                            <span className="recommended-card"> Recommended </span>
                        </div>
                        <div className="info-box-mobile">
                            <p>Enable Daily Backups and a Professional Antivirus </p>
                            <div className="info-btns">
                                <span className="recommended-card"> Recommended </span>
                                <span className="business-card"> Business Plan </span>
                            </div>
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
                    <div className={`team-${activeTab === 0 ? 'cloud' : 'individual'}-pricing-container`}>
                        <NextArrow />
                        <PrevArrow />
                        <swiper-container slides-per-view="4" free-mode="true" navigation='{"prevEl": ".left-arrow", "nextEl": ".right-arrow"}'>
                            { tabPlans[activeTab].map((plan, index) => {
                                return (
                                    <swiper-slide key={index}>
                                        <PlanCards
                                            {...plan}
                                            isPopular={plan.hardware_id === 37}
                                            isSelected={plan.hardware_id === formData.hardware?.value}
                                            onSelect={(contract) => setFormData({ hardware: { value: plan.hardware_id, display: plan.title }, contract_type: contract }) }
                                            isBusiness={formData.plan === 2}
                                            plan={formData.hardware?.value}
                                            planType={formData.contract_type}
                                            showUsers={activeTab === 0}
                                        />
                                    </swiper-slide>
                                )
                            })}
                            { activeTab === 1 && (
                                <swiper-slide key={tabPlans[activeTab].length}>
                                    <SpecialCard
                                        title="The Enterprise"
                                        buttonText="Talk to an Expert"
                                        imageUrl=""
                                    />
                                </swiper-slide>
                            ) }
                        </swiper-container>
                    </div>
                </div>

                <div className="upgrade-plans-message-mobile">
                    - Upgrade available for all plans
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
        </>
    );
};

export default SelectPlan;