
import React, { useState, useRef } from "react";
import './styles.css';

const mobileHeader = ({stepNo , stepName, logo}) => {

    const svg = {
            step1 : (<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.25 17.5C29.25 17.2266 29.1953 16.9531 29.1406 16.625H27.5C26.6797 16.625 25.9141 16.3516 25.3672 15.75L24.9844 15.4219C23.9453 16.7344 22.3594 17.5 20.6094 17.5H18.75V18.375C18.75 21.2734 21.1016 23.625 24 23.625C26.8984 23.625 29.25 21.2734 29.25 18.375V17.5ZM24.2188 13.3984C24.5469 13.0703 25.1484 13.0703 25.4766 13.3984L26.5703 14.4922C26.8438 14.7656 27.1719 14.875 27.5 14.875H28.5391C27.6094 13.3438 25.9141 12.25 24 12.25C21.7031 12.25 19.7344 13.7266 19.0234 15.75H20.6094C22.0859 15.75 23.3984 14.9297 24.0547 13.6719C24.1094 13.5625 24.1641 13.4531 24.2188 13.3984ZM17 17.5C17 13.6719 20.1172 10.5 24 10.5C27.8281 10.5 31 13.6719 31 17.5V18.375C31 22.2578 27.8281 25.375 24 25.375C20.1172 25.375 17 22.2578 17 18.375V17.5ZM21.8672 33.4141L18.75 29.2031C15.6875 30.1328 13.5 32.9766 13.5 36.3125V36.75H34.5V36.3125C34.5 32.9766 32.2578 30.1328 29.1953 29.2031L26.0781 33.4141C25.0391 34.7812 22.9062 34.7812 21.8672 33.4141ZM18.9688 27.3438C19.2422 27.2891 19.5703 27.3984 19.7891 27.6719L23.2891 32.3203C23.6172 32.8125 24.3281 32.8125 24.6562 32.3203L28.1562 27.6719C28.375 27.3984 28.7031 27.2891 29.0312 27.3438C33.1328 28.2734 36.25 31.9375 36.25 36.3125V36.75C36.25 37.7344 35.4297 38.5 34.5 38.5H13.5C12.5156 38.5 11.75 37.7344 11.75 36.75V36.3125C11.75 31.9375 14.8125 28.2734 18.9688 27.3438Z" fill="#00438B" />
            <rect x="1" y="1" width="46" height="46" rx="23" stroke="#00438B" stroke-width="2" />
            </svg>),
            step2 :(<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 36.75C29.8516 36.75 34.7734 32.6484 35.9766 27.125L33.4609 26.4688C32.5859 26.25 31.875 25.5938 31.6016 24.7734L30.6719 21.9844C30.2344 20.6719 30.8906 19.25 32.2031 18.7031L34.2812 17.8828C32.1484 14.5469 28.4297 12.3594 24.1641 12.25L24.5469 12.9609C25.0938 13.9453 24.9844 15.1484 24.2734 15.9688L23.1797 17.2812C23.0156 17.3906 23.0156 17.6641 23.1797 17.8281L24.1641 18.9766C24.7109 19.6328 24.7656 20.5625 24.2734 21.2734C23.7812 21.9844 22.9062 22.3125 22.0859 22.0391L20.7188 21.6016C20.6094 21.5469 20.5 21.5469 20.3359 21.6016C20.1172 21.7656 20.0078 22.0391 20.1172 22.3125L20.1719 22.3672C20.2266 22.4766 20.3359 22.5859 20.4453 22.6406L22.9609 23.8984C23.1797 24.0078 23.4531 24.0625 23.7266 24.0625H26.4062C27.3359 24.0625 28.2109 24.4453 28.8672 25.1016L29.0859 25.3203C29.7422 25.9766 30.0703 26.8516 30.0703 27.7812V28.2734C30.0703 29.5312 29.4141 30.6797 28.3203 31.2812L27.7188 31.6641C27.2266 31.9375 26.8438 32.4297 26.6797 32.9766L26.4609 33.9609C26.1875 35.1094 25.1484 35.9297 23.9453 35.9297C22.5234 35.9297 21.375 34.7266 21.375 33.3047V32.0469C21.375 31.8281 21.2109 31.5547 20.9375 31.4453C20.1172 31.0078 19.625 30.1875 19.625 29.2578V28.4375C19.625 27.5078 19.0234 26.7422 18.1484 26.4688L14.7031 25.375C13.5547 25.0469 12.5703 24.1719 12.0234 23.0234L11.8594 22.6406C11.75 23.2422 11.75 23.8984 11.75 24.5C11.75 31.2812 17.2188 36.75 24 36.75ZM12.625 19.9609L13.6641 22.2578C13.9375 22.9688 14.5391 23.5156 15.25 23.7344L18.6953 24.7734C20.2812 25.3203 21.375 26.7422 21.375 28.4375V29.2578C21.375 29.4766 21.4844 29.75 21.7578 29.8594C22.5781 30.2969 23.125 31.1172 23.125 32.0469V33.3047C23.125 33.7969 23.5078 34.1797 23.9453 34.1797C24.3281 34.1797 24.6562 33.9062 24.7656 33.5234L24.9844 32.5391C25.2578 31.5547 25.9141 30.6797 26.8438 30.1328L27.5 29.75C27.9922 29.4766 28.375 28.875 28.375 28.2734V27.7812C28.375 27.3438 28.1562 26.9062 27.8281 26.5781L27.6094 26.3594C27.2812 26.0312 26.8438 25.8125 26.4062 25.8125H23.7266C23.1797 25.8125 22.6328 25.7031 22.1406 25.4844L19.625 24.2266C19.1875 24.0078 18.8047 23.625 18.5859 23.1875V23.0781C17.9844 21.9844 18.4766 20.6172 19.5703 20.0703C20.1172 19.7969 20.7188 19.7422 21.3203 19.9609L22.6328 20.3984C22.6875 20.3984 22.7969 20.3984 22.7969 20.3438C22.8516 20.2344 22.8516 20.1797 22.7969 20.125L21.8125 18.9219C21.1562 18.1016 21.1562 16.9531 21.8672 16.1328L22.9609 14.8203C23.1797 14.5469 23.2344 14.1641 23.0156 13.8359L22.25 12.4141C17.8203 13.0156 14.2109 15.9688 12.625 19.9609ZM36.25 24.5L36.1953 24.5547C36.1953 22.6953 35.8125 21 35.1016 19.4141L32.8047 20.3438C32.4219 20.5078 32.2031 21 32.3125 21.4375L33.2422 24.2266C33.3516 24.5 33.5703 24.7188 33.8438 24.7734L36.1953 25.375C36.1953 25.1016 36.25 24.8281 36.25 24.5ZM24 38.5C18.9688 38.5 14.375 35.875 11.8594 31.5C9.34375 27.1797 9.34375 21.875 11.8594 17.5C14.375 13.1797 18.9688 10.5 24 10.5C28.9766 10.5 33.5703 13.1797 36.0859 17.5C38.6016 21.875 38.6016 27.1797 36.0859 31.5C33.5703 35.875 28.9766 38.5 24 38.5Z" fill="#00438B"/>
            <rect x="1" y="1" width="46" height="46" rx="23" stroke="#00438B" stroke-width="2"/>
            </svg>),
            step3 :(<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M38.875 12.25H23.125C22.6328 12.25 22.25 12.6875 22.25 13.125V17.5H20.5V13.125C20.5 11.7031 21.6484 10.5 23.125 10.5H38.875C40.2969 10.5 41.5 11.7031 41.5 13.125V35.875C41.5 37.3516 40.2969 38.5 38.875 38.5H27.3359C27.4453 38.2266 27.5 37.9531 27.5 37.625V36.75H38.875C39.3125 36.75 39.75 36.3672 39.75 35.875V13.125C39.75 12.6875 39.3125 12.25 38.875 12.25ZM36.8516 27.8359C37.1797 28.1641 37.1797 28.7656 36.8516 29.0938C36.5234 29.4219 35.9219 29.4219 35.5938 29.0938L33.625 27.0703V34.125C33.625 34.6172 33.1875 35 32.75 35C32.2578 35 31.875 34.6172 31.875 34.125V27.0703L29.8516 29.0938C29.5234 29.4219 28.9219 29.4219 28.5938 29.0938C28.2656 28.7656 28.2656 28.1641 28.5938 27.8359L32.0938 24.3359C32.4219 24.0078 33.0234 24.0078 33.3516 24.3359L36.8516 27.8359ZM25.75 21H8.25V24.5H10H24H25.75V21ZM6.5 24.5V21C6.5 20.0703 7.26562 19.25 8.25 19.25H25.75C26.6797 19.25 27.5 20.0703 27.5 21V24.5C27.5 25.4844 26.6797 26.25 25.75 26.25V36.75C25.75 37.7344 24.9297 38.5 24 38.5H10C9.01562 38.5 8.25 37.7344 8.25 36.75V26.25C7.26562 26.25 6.5 25.4844 6.5 24.5ZM10 26.25V36.75H24V26.25H10ZM14.375 28H19.625C20.0625 28 20.5 28.4375 20.5 28.875C20.5 29.3672 20.0625 29.75 19.625 29.75H14.375C13.8828 29.75 13.5 29.3672 13.5 28.875C13.5 28.4375 13.8828 28 14.375 28Z" fill="#00438B"/>
            <rect x="1" y="1" width="46" height="46" rx="23" stroke="#00438B" stroke-width="2"/>
            </svg>),
            step4 :(<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M38.875 12.25H23.125C22.6328 12.25 22.25 12.6875 22.25 13.125V17.5H20.5V13.125C20.5 11.7031 21.6484 10.5 23.125 10.5H38.875C40.2969 10.5 41.5 11.7031 41.5 13.125V35.875C41.5 37.3516 40.2969 38.5 38.875 38.5H27.3359C27.4453 38.2266 27.5 37.9531 27.5 37.625V36.75H38.875C39.3125 36.75 39.75 36.3672 39.75 35.875V13.125C39.75 12.6875 39.3125 12.25 38.875 12.25ZM36.8516 27.8359C37.1797 28.1641 37.1797 28.7656 36.8516 29.0938C36.5234 29.4219 35.9219 29.4219 35.5938 29.0938L33.625 27.0703V34.125C33.625 34.6172 33.1875 35 32.75 35C32.2578 35 31.875 34.6172 31.875 34.125V27.0703L29.8516 29.0938C29.5234 29.4219 28.9219 29.4219 28.5938 29.0938C28.2656 28.7656 28.2656 28.1641 28.5938 27.8359L32.0938 24.3359C32.4219 24.0078 33.0234 24.0078 33.3516 24.3359L36.8516 27.8359ZM25.75 21H8.25V24.5H10H24H25.75V21ZM6.5 24.5V21C6.5 20.0703 7.26562 19.25 8.25 19.25H25.75C26.6797 19.25 27.5 20.0703 27.5 21V24.5C27.5 25.4844 26.6797 26.25 25.75 26.25V36.75C25.75 37.7344 24.9297 38.5 24 38.5H10C9.01562 38.5 8.25 37.7344 8.25 36.75V26.25C7.26562 26.25 6.5 25.4844 6.5 24.5ZM10 26.25V36.75H24V26.25H10ZM14.375 28H19.625C20.0625 28 20.5 28.4375 20.5 28.875C20.5 29.3672 20.0625 29.75 19.625 29.75H14.375C13.8828 29.75 13.5 29.3672 13.5 28.875C13.5 28.4375 13.8828 28 14.375 28Z" fill="#00438B"/>
            <rect x="1" y="1" width="46" height="46" rx="23" stroke="#00438B" stroke-width="2"/>
            </svg>),
            step5 :(<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32.75 35V21H26.625C25.1484 21 24 19.8516 24 18.375V12.25H17C16.0156 12.25 15.25 13.0703 15.25 14V35C15.25 35.9844 16.0156 36.75 17 36.75H31C31.9297 36.75 32.75 35.9844 32.75 35ZM32.6953 19.25C32.6406 19.1406 32.5859 18.9766 32.4766 18.8672L26.1328 12.5234C26.0234 12.4141 25.8594 12.3594 25.75 12.3047V18.375C25.75 18.8672 26.1328 19.25 26.625 19.25H32.6953ZM13.5 14C13.5 12.0859 15.0312 10.5 17 10.5H25.5312C26.1875 10.5 26.8984 10.8281 27.3906 11.3203L33.6797 17.6094C34.1719 18.1016 34.5 18.8125 34.5 19.4688V35C34.5 36.9688 32.9141 38.5 31 38.5H17C15.0312 38.5 13.5 36.9688 13.5 35V14ZM17 14.875C17 14.4375 17.3828 14 17.875 14H21.375C21.8125 14 22.25 14.4375 22.25 14.875C22.25 15.3672 21.8125 15.75 21.375 15.75H17.875C17.3828 15.75 17 15.3672 17 14.875ZM17 18.375C17 17.9375 17.3828 17.5 17.875 17.5H21.375C21.8125 17.5 22.25 17.9375 22.25 18.375C22.25 18.8672 21.8125 19.25 21.375 19.25H17.875C17.3828 19.25 17 18.8672 17 18.375ZM24.875 23.8438V24.6094C25.3125 24.6641 25.75 24.7188 26.1328 24.8281C26.625 24.9375 26.8984 25.4297 26.7891 25.8672C26.6797 26.3594 26.1875 26.6328 25.75 26.5234C25.1484 26.4141 24.5469 26.3047 23.9453 26.3047C23.5078 26.25 22.9609 26.3594 22.6328 26.5781C22.3047 26.7422 22.25 26.9062 22.25 27.0703C22.25 27.1797 22.25 27.2891 22.5781 27.4531C22.9609 27.6719 23.5078 27.7812 24.2188 28C24.8203 28.1641 25.5859 28.3828 26.1875 28.7109C26.8438 29.0391 27.4453 29.6953 27.5 30.6797C27.5 31.7188 26.8984 32.375 26.1875 32.8125C25.8047 33.0312 25.3125 33.1406 24.875 33.25V33.9609C24.875 34.4531 24.4375 34.8359 24 34.8359C23.5078 34.8359 23.125 34.4531 23.125 33.9609V33.1953C22.5234 33.0859 21.9219 32.9219 21.4297 32.7578C21.3203 32.7031 21.2109 32.7031 21.1016 32.6484C20.6641 32.5391 20.3906 32.0469 20.5 31.5547C20.6641 31.1172 21.1562 30.8438 21.5938 30.9531C21.7578 31.0078 21.8672 31.0625 21.9766 31.1172C22.7422 31.3359 23.3438 31.5 24 31.5C24.5469 31.5547 25.0391 31.4453 25.3672 31.2812C25.6406 31.1172 25.75 30.8984 25.75 30.6797C25.75 30.5703 25.6953 30.4062 25.3672 30.2422C24.9844 30.0234 24.4375 29.8594 23.7266 29.6953L23.6719 29.6406C23.0703 29.4766 22.3594 29.3125 21.7578 28.9844C21.1562 28.6562 20.5 28.0547 20.5 27.0703C20.5 26.0312 21.1562 25.375 21.8125 24.9922C22.25 24.7734 22.6875 24.6641 23.125 24.6094V23.8438C23.125 23.3516 23.5078 22.9688 24 22.9688C24.4922 22.9688 24.875 23.3516 24.875 23.8438Z" fill="#00438B"/>
            <rect x="1" y="1" width="46" height="46" rx="23" stroke="#00438B" stroke-width="2"/>
            </svg>),
    }

    const progress = {
        step1 :(<svg width="358" height="4" viewBox="0 0 358 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="68" height="4" rx="2" fill="#F8F9FA" />
        <rect x="72.5" width="68" height="4" rx="2" fill="#F8F9FA" />
        <rect x="145" width="68" height="4" rx="2" fill="#F8F9FA" />
        <rect x="217.5" width="68" height="4" rx="2" fill="#F8F9FA" />
        <rect x="290" width="68" height="4" rx="2" fill="#F8F9FA" />
        <rect width="34" height="4" rx="2" fill="#039855" />
        </svg>),
        step2 : (<svg width="358" height="4" viewBox="0 0 358 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="68" height="4" rx="2" fill="#F8F9FA"/>
        <rect x="72.5" width="68" height="4" rx="2" fill="#F8F9FA"/>
        <rect x="145" width="68" height="4" rx="2" fill="#F8F9FA"/>
        <rect x="217.5" width="68" height="4" rx="2" fill="#F8F9FA"/>
        <rect x="290" width="68" height="4" rx="2" fill="#F8F9FA"/>
        <rect width="68" height="4" rx="2" fill="#039855"/>
        <rect x="72.5" width="68" height="4" rx="2" fill="#039855"/>
        <rect x="145" width="0.01" height="4" rx="0.005" fill="#F8F9FA"/>
        </svg>),
        step3 :(<svg width="358" height="4" viewBox="0 0 358 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="68" height="4" rx="2" fill="#F8F9FA"/>
        <rect x="72.5" width="68" height="4" rx="2" fill="#F8F9FA"/>
        <rect x="145" width="68" height="4" rx="2" fill="#F8F9FA"/>
        <rect x="217.5" width="68" height="4" rx="2" fill="#F8F9FA"/>
        <rect x="290" width="68" height="4" rx="2" fill="#F8F9FA"/>
        <rect width="68" height="4" rx="2" fill="#039855"/>
        <rect x="72.5" width="68" height="4" rx="2" fill="#039855"/>
        <rect x="145" width="68" height="4" rx="2" fill="#039855"/>
        <rect x="217.5" width="0.01" height="4" rx="0.005" fill="#F8F9FA"/>
        </svg>),
        step4 :(<svg width="358" height="4" viewBox="0 0 358 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="68" height="4" rx="2" fill="#F8F9FA"/>
        <rect x="72.5" width="68" height="4" rx="2" fill="#F8F9FA"/>
        <rect x="145" width="68" height="4" rx="2" fill="#F8F9FA"/>
        <rect x="217.5" width="68" height="4" rx="2" fill="#F8F9FA"/>
        <rect x="290" width="68" height="4" rx="2" fill="#F8F9FA"/>
        <rect width="68" height="4" rx="2" fill="#039855"/>
        <rect x="72.5" width="68" height="4" rx="2" fill="#039855"/>
        <rect x="145" width="68" height="4" rx="2" fill="#039855"/>
        <rect x="217.5" width="68" height="4" rx="2" fill="#039855"/>
        <rect x="290" width="0.01" height="4" rx="0.005" fill="#F8F9FA"/>
        </svg>),
        step5 :(<svg width="358" height="4" viewBox="0 0 358 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="68" height="4" rx="2" fill="#039855"/>
        <rect x="72.5" width="68" height="4" rx="2" fill="#039855"/>
        <rect x="145" width="68" height="4" rx="2" fill="#039855"/>
        <rect x="217.5" width="68" height="4" rx="2" fill="#039855"/>
        <rect x="290" width="68" height="4" rx="2" fill="#039855"/>
        </svg>),
    }
    return (

        <div className="header-container">
            <div className="step-details">
                <div className="step-logo">
                    {svg[logo]}
                </div>
                <div className="step-description">
                    <div className="step-no">
                        {stepNo}
                    </div>
                    <div className="step-name">
                        {stepName}
                    </div>
                </div>
            </div>
            <div className="step-progress">
                {progress[logo]}
            </div>
        </div>
    )
}

export default mobileHeader;