import React, {useState} from "react";

const configCards = ({ logo, mainTitle, subTitle, content, logoSelected, recommended, isSelected, onClick }) => {

    const handleCardSelection = () => {
        onClick();
    };
    

    return (
        <div className={`config-card ${isSelected ? "selected" : ""}`}
            onClick={handleCardSelection}
        >

            {recommended && <div className="recommended-box"> Recommended </div>}

            <div className="checkbox-icon selected">
                <svg width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 32C11.25 32 6 29 3.125 24C0.25 19.0625 0.25 13 3.125 8C6 3.0625 11.25 0 17 0C22.6875 0 27.9375 3.0625 30.8125 8C33.6875 13 33.6875 19.0625 30.8125 24C27.9375 29 22.6875 32 17 32ZM24.0625 13.0625H24C24.625 12.5 24.625 11.5625 24 10.9375C23.4375 10.375 22.5 10.375 21.9375 10.9375L15 17.9375L12.0625 15C11.4375 14.375 10.5 14.375 9.9375 15C9.3125 15.5625 9.3125 16.5 9.9375 17.0625L13.9375 21.0625C14.5 21.6875 15.4375 21.6875 16.0625 21.0625L24.0625 13.0625Z" fill="#00438B" />
                </svg>
            </div>
            <div className="checkbox-icon">
                <svg width="32" height="34" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M29 17C29 12.375 26.5 8.125 22.5 5.75C18.4375 3.4375 13.5 3.4375 9.5 5.75C5.4375 8.125 3 12.375 3 17C3 21.6875 5.4375 25.9375 9.5 28.3125C13.5 30.625 18.4375 30.625 22.5 28.3125C26.5 25.9375 29 21.6875 29 17ZM0 17C0 11.3125 3 6.0625 8 3.1875C12.9375 0.3125 19 0.3125 24 3.1875C28.9375 6.0625 32 11.3125 32 17C32 22.75 28.9375 28 24 30.875C19 33.75 12.9375 33.75 8 30.875C3 28 0 22.75 0 17Z" fill="#DEE2E6" />
                </svg>
            </div>
            <div className="logo" dangerouslySetInnerHTML={{ __html: isSelected ? logoSelected : logo }}></div>
            <div className="main-title">
                {mainTitle}
            </div>
            <div className="sub-title">
                { subTitle === "" ? "" : subTitle === "INCLUDED" ? subTitle : subTitle + "/month"} 
            </div>
            <div className="content">
                {content}
            </div>
        </div>
    )
}

export default configCards;