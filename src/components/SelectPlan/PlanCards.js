import React, { useState } from "react";

const PlanCards = ({
	title,
	hardware_id,
	price_monthly_contract_plan_1: basicMonthlyPlan,
	price_yearly_contract_plan_1: basicYearlyPlan,
	yearly_contract_saving_plan_1: yearlySaving,
	price_monthly_contract_plan_2: businessMonthlyPlan,
	price_yearly_contract_plan_2: businessYearlyPlan,
	yearly_contract_saving_plan_2: businessYearlySaving,
	config,
	users,
	isPopular,
	description,
	isSelected,
	onSelect,
	isBusiness,
	plan,
	planType,
    showTooltip
}) => {
    const configItems = config.split(' ').slice(0, 3);
    const customString = ['core', 'Memory RAM', 'Storage'];
    const UpdatedconfigItems = configItems.map( (val, index) => `${val} ${customString[index]}`);
    const [isHovered, setHover] = useState(false);

    return (
        <div 
            className={`pricing-card ${isSelected ? "selected" : ""} ${isPopular ? "popular-container" : ""}`}
            onClick={(e) => {
                // skip if the click is exactly on the monthly or annual plan
                const target = e.target;
                if ( target.closest('.pricing-monthly') || target.closest('.pricing-annual') ) {
                    return;
                }
                // by default clicking on the card make the plan monthly
                onSelect('monthly');
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >

            {showTooltip && isHovered && (
                <div className="card-tooltip">
                    <div className="tooltip-title">Best User of {title}</div>
                    <ul className="tooltip-datalist">
                        {description.split(',').map((func, index) => (
                            <li key={index}>{func}</li>
                        ))}
                    </ul>
                </div>
            )}

            {isPopular && <div className="popular-badge">Most Popular</div>}

            <h3 className="pricing-card-title">{title}</h3>
            <div className={`no-of-users ${isSelected ? "selected" : ""}`}>
                {users} users*
            </div>
            <div className={`functions ${isSelected ? "selected" : ""}`}>
                {description}
            </div>

            <hr className="custom-hr" />

            <ul className={`pricing-card-features ${isSelected ? "selected" : ""}`}>
                {
                    UpdatedconfigItems.map((part, index) => (
                        <li key={index}>{part}</li>
                    ))
                }
            </ul>
            <div className="pricing-monthly" onClick={() => onSelect('monthly')}>
                <div className={`monthly-title-check ${planType === 'monthly' && plan === hardware_id ? "selected" : ""}`}>
                    <div>
                        <input type="checkbox"
                            className="checkbox-input"
                            checked={planType === 'monthly' && plan === hardware_id}
                            onChange={() => onSelect('monthly')} />
                    </div>
                    <div className="monthly-title-box">
                        <div className="monthly-title"> Monthly Commitment </div>
                        <div className="monthly-amount">
                            <div className="pricing-card-price">
                                <span className="amount">{`$${isBusiness ? businessMonthlyPlan : basicMonthlyPlan}` }</span>
                                <span className="month">/mo </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="pricing-annual" onClick={() => onSelect('yearly')}>
                <div className={`annual-title-check ${planType === 'yearly' && plan === hardware_id ? "selected" : ""}`}>
                    <div>
                        <input type="checkbox"
                            className="checkbox-input"
                            checked={planType === 'yearly' && plan === hardware_id}
							onChange={() => onSelect('yearly')}
						/>
                    </div>
                    <div className="annual-title-box">
                        <div className="annual-title">
                            Annual Commitment paid monthly
                        </div>
                        <div className="annual-amount">
                            <div className="pricing-card-price">
                                <span className="amount">{`$${isBusiness ? businessYearlyPlan : basicYearlyPlan}`}</span> 
                                <span className="month">/mo</span>
                            </div>
                            <div className="offer-infobox">
                                Save {`$${isBusiness ? businessYearlySaving : yearlySaving}`} per year
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

}

export default PlanCards;