import React, { useEffect } from "react";
import './sidebar.css';

const BulletIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="white"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<line x1="5" y1="12" x2="19" y2="12" />
		<polyline points="12 5 19 12 12 19" />
	</svg>
);

const CompletedIcon = () => (
	<svg width="16" height="20" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M14.6875 1.3125C15.0938 1.6875 15.0938 2.34375 14.6875 2.71875L6.6875 10.7188C6.3125 11.125 5.65625 11.125 5.28125 10.7188L1.28125 6.71875C0.875 6.34375 0.875 5.6875 1.28125 5.3125C1.65625 4.90625 2.3125 4.90625 2.6875 5.3125L6 8.59375L13.2812 1.3125C13.6562 0.90625 14.3125 0.90625 14.6875 1.3125Z" fill="white"/>
	</svg>
);

const Sidebar = ({ currentStep, formData }) => {

	const steps = [
		{
			header: 'Setup Account',
			completedTitle: 'Password Created',
		},
		{
			header: 'Select Location',
			completedTitle: (() => formData.region?.display || '')(),
		},
		{
			header: 'Select Plan',
			completedTitle: 'Plan Selected',
		},
		{
			header: 'Computer Configuration',
			completedTitle: 'Computer Configured',
		},
		{
			header: 'Billing & Payment',
			completedTitle: 'Payment Info Entered',
		}
	];

	return (
		<div className="sidebar-container">
			<div className="sidebar-navbar">
				{steps.map((step, index) => {

					const currentIndex = index + 1;
					const isCompleted = currentIndex < currentStep;
					const isCurrent = currentStep === currentIndex;

					return (
						<div
							key={currentIndex}
							className={`single-nav ${currentStep === currentIndex ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
						>
							<div className="nav-bullet">
								{isCompleted && <CompletedIcon />}
								{isCurrent && <BulletIcon />}
								{(!isCurrent && !isCompleted) && ( currentIndex )}
							</div>
							<div className="nav-content">
								<div className="nav-topic">{step.header}</div>
								{(!isCompleted && !isCurrent) && <div className="nav-subtopic">Step {currentIndex}</div>}
								{(!isCompleted && isCurrent) && <div className="nav-subtopic">Current</div>}
								{isCompleted && <div className="nav-subtopic">{step.completedTitle}</div>}
								{isCompleted && <div className="nav-subtopic">Complete</div>}
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Sidebar;