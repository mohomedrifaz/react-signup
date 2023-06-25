import React from "react";
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
    <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 32C24.8125 32 32 24.875 32 16C32 7.1875 24.8125 0 16 0C7.125 0 0 7.1875 0 16C0 24.875 7.125 32 16 32Z" fill="#039855" />
        <path d="M16 35C26.4617 35 35 26.5395 35 16H29C29 23.2105 23.1633 29 16 29V35ZM35 16C35 5.53065 26.4694 -3 16 -3V3C23.1556 3 29 8.84435 29 16H35ZM16 -3C5.46052 -3 -3 5.53828 -3 16H3C3 8.83671 8.78948 3 16 3V-3ZM-3 16C-3 26.5319 5.46815 35 16 35V29C8.78185 29 3 23.2181 3 16H-3Z" fill="#F8F9FA" />
    </svg>

);

const Sidebar = ({ currentStep, completionStatus, stepTitles, completionStats }) => {

    return (
        <div className="sidebar-container">
            <div className="sidebar-navbar">
                {completionStatus.map((isCompleted, index) => (
                    <div
                        key={index}
                        className={`single-nav ${currentStep === index + 1 ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                    >
                        {isCompleted && (
                            <div className="nav-bullet-completed">
                                <p>
                                    <CompletedIcon />
                                </p>
                            </div>
                        )}
                        <div className="nav-bullet active">
                            <p>
                                <BulletIcon />
                            </p>
                        </div>
                        <div className="nav-bullet">
                            <p> {index + 1} </p>
                        </div>
                        <div className="nav-content">
                            <div className="nav-topic">{stepTitles[index]}</div>
                            <div className="nav-subtopic">Step {index + 1}</div>
                            {currentStep === index + 1 && <div className="nav-subtopic current">Current</div>}
                            {isCompleted && <div className="nav-subtopic-complete">{completionStats[index]}</div>}
                            {isCompleted && <div className="nav-subtopic-done">Complete</div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar;