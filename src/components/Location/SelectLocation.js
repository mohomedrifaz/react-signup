import React, { useState, useEffect } from "react";
import ping from "web-pingjs"

import './SelectLocation.css';
import SelectCountry from "./SelectCountry";
import SG from "../../assets/svg/SG.svg";
import sydney from "../../assets/svg/AUSSYDNEY.svg";
import montreal from "../../assets/svg/CAMON.svg";
import london from "../../assets/svg/UKLONDON.svg";
import washington from "../../assets/svg/USWASH.svg";
import frankfurt from "../../assets/svg/GEFRANK.svg";
import france from "../../assets/svg/FR.svg";
import mumbai from "../../assets/svg/IN.svg";
import MobileHeader from "../mobileHeader";
import Map from "./Map";

const SelectLocation = ({ formData, setFormData, stepData: { nextStep, prevStep } }) => {
    const regions = [
        {
            "id": 1,
            "name": "lucy",
            "display": "Montreal (Canada East)",
            "ping_url": "51.222.82.69",
            "flag": montreal,
        },
        {
            "id": 2,
            "name": "lydia",
            "display": "Roubaix (France)",
            "ping_url": "146.59.149.201",
            "flag": france,
        },
        {
            "id": 4,
            "name": "mia",
            "display": "Washington DC (USA East)",
            "ping_url": "15.204.163.125",
            "flag": washington,
        },
        {
            "id": 5,
            "name": "julia",
            "display": "Singapore (Singapore)",
            "ping_url": "51.79.228.38",
            "flag": SG,
        },
        {
            "id": 7,
            "name": "kate",
            "display": "London (UK)",
            "ping_url": "51.89.218.130",
            "flag": london,
        },
        {
            "id": 10,
            "name": "mali",
            "display": "Portland (USA West)",
            "ping_url": "15.204.52.98",
            "flag": washington,
        },
        {
            "id": 14,
            "name": "amanda",
            "display": "Sydney 2 (Australia)",
            "ping_url": "117.120.15.196",
            "flag": sydney,
        },
        {
            "id": 22,
            "name": "angela",
            "display": "Frankfurt (Germany)",
            "ping_url": "162.19.234.32",
            "flag": frankfurt,
        },
        {
            "id": 30,
            "name": "rani",
            "display": "Mumbai (India)",
            "ping_url": "148.113.0.138",
            "flag": mumbai,
        }
    ];

    const countries = [
        {
            flag: SG,
            city: 'Singapore',
            country: 'Singapore',
            signal: `<svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.5 0.5C22.0078 0.5 22.4375 0.929688 22.4375 1.4375V19.5625C22.4375 20.1094 22.0078 20.5 21.5 20.5C20.9531 20.5 20.5625 20.1094 20.5625 19.5625V1.4375C20.5625 0.929688 20.9531 0.5 21.5 0.5ZM16.5 4.25C17.0078 4.25 17.4375 4.67969 17.4375 5.1875V19.5625C17.4375 20.1094 17.0078 20.5 16.5 20.5C15.9531 20.5 15.5625 20.1094 15.5625 19.5625V5.1875C15.5625 4.67969 15.9531 4.25 16.5 4.25ZM11.5 8C12.0078 8 12.4375 8.42969 12.4375 8.9375V19.5625C12.4375 20.1094 12.0078 20.5 11.5 20.5C10.9531 20.5 10.5625 20.1094 10.5625 19.5625V8.9375C10.5625 8.42969 10.9531 8 11.5 8ZM6.5 11.75C7.00781 11.75 7.4375 12.1797 7.4375 12.6875V19.5625C7.4375 20.1094 7.00781 20.5 6.5 20.5C5.95312 20.5 5.5625 20.1094 5.5625 19.5625V12.6875C5.5625 12.1797 5.95312 11.75 6.5 11.75ZM1.5 15.5C2.00781 15.5 2.4375 15.9297 2.4375 16.4375V19.5625C2.4375 20.1094 2.00781 20.5 1.5 20.5C0.953125 20.5 0.5625 20.1094 0.5625 19.5625V16.4375C0.5625 15.9297 0.953125 15.5 1.5 15.5Z" fill="#039855"/>
            </svg>`,
        },
        {
            flag: washington,
            city: 'Washington DC',
            country: 'USA East',
            signal: `<svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.5 0.5C22.0078 0.5 22.4375 0.929688 22.4375 1.4375V19.5625C22.4375 20.1094 22.0078 20.5 21.5 20.5C20.9531 20.5 20.5625 20.1094 20.5625 19.5625V1.4375C20.5625 0.929688 20.9531 0.5 21.5 0.5ZM16.5 4.25C17.0078 4.25 17.4375 4.67969 17.4375 5.1875V19.5625C17.4375 20.1094 17.0078 20.5 16.5 20.5C15.9531 20.5 15.5625 20.1094 15.5625 19.5625V5.1875C15.5625 4.67969 15.9531 4.25 16.5 4.25ZM11.5 8C12.0078 8 12.4375 8.42969 12.4375 8.9375V19.5625C12.4375 20.1094 12.0078 20.5 11.5 20.5C10.9531 20.5 10.5625 20.1094 10.5625 19.5625V8.9375C10.5625 8.42969 10.9531 8 11.5 8ZM6.5 11.75C7.00781 11.75 7.4375 12.1797 7.4375 12.6875V19.5625C7.4375 20.1094 7.00781 20.5 6.5 20.5C5.95312 20.5 5.5625 20.1094 5.5625 19.5625V12.6875C5.5625 12.1797 5.95312 11.75 6.5 11.75ZM1.5 15.5C2.00781 15.5 2.4375 15.9297 2.4375 16.4375V19.5625C2.4375 20.1094 2.00781 20.5 1.5 20.5C0.953125 20.5 0.5625 20.1094 0.5625 19.5625V16.4375C0.5625 15.9297 0.953125 15.5 1.5 15.5Z" fill="#039855"/>
            </svg>
            `,
        },
        {
            flag: montreal,
            city: 'Montreal',
            country: 'Canada East',
            signal: `<svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.5 0.5C22.0078 0.5 22.4375 0.929688 22.4375 1.4375V19.5625C22.4375 20.1094 22.0078 20.5 21.5 20.5C20.9531 20.5 20.5625 20.1094 20.5625 19.5625V1.4375C20.5625 0.929688 20.9531 0.5 21.5 0.5ZM16.5 4.25C17.0078 4.25 17.4375 4.67969 17.4375 5.1875V19.5625C17.4375 20.1094 17.0078 20.5 16.5 20.5C15.9531 20.5 15.5625 20.1094 15.5625 19.5625V5.1875C15.5625 4.67969 15.9531 4.25 16.5 4.25ZM11.5 8C12.0078 8 12.4375 8.42969 12.4375 8.9375V19.5625C12.4375 20.1094 12.0078 20.5 11.5 20.5C10.9531 20.5 10.5625 20.1094 10.5625 19.5625V8.9375C10.5625 8.42969 10.9531 8 11.5 8ZM6.5 11.75C7.00781 11.75 7.4375 12.1797 7.4375 12.6875V19.5625C7.4375 20.1094 7.00781 20.5 6.5 20.5C5.95312 20.5 5.5625 20.1094 5.5625 19.5625V12.6875C5.5625 12.1797 5.95312 11.75 6.5 11.75ZM1.5 15.5C2.00781 15.5 2.4375 15.9297 2.4375 16.4375V19.5625C2.4375 20.1094 2.00781 20.5 1.5 20.5C0.953125 20.5 0.5625 20.1094 0.5625 19.5625V16.4375C0.5625 15.9297 0.953125 15.5 1.5 15.5Z" fill="#039855"/>
            </svg>
            `,
        },
        {
            flag: frankfurt,
            city: 'Frankfurt',
            country: 'Germany',
            signal: `<svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.5 0.5C22.0078 0.5 22.4375 0.929688 22.4375 1.4375V19.5625C22.4375 20.1094 22.0078 20.5 21.5 20.5C20.9531 20.5 20.5625 20.1094 20.5625 19.5625V1.4375C20.5625 0.929688 20.9531 0.5 21.5 0.5ZM16.5 4.25C17.0078 4.25 17.4375 4.67969 17.4375 5.1875V19.5625C17.4375 20.1094 17.0078 20.5 16.5 20.5C15.9531 20.5 15.5625 20.1094 15.5625 19.5625V5.1875C15.5625 4.67969 15.9531 4.25 16.5 4.25ZM11.5 8C12.0078 8 12.4375 8.42969 12.4375 8.9375V19.5625C12.4375 20.1094 12.0078 20.5 11.5 20.5C10.9531 20.5 10.5625 20.1094 10.5625 19.5625V8.9375C10.5625 8.42969 10.9531 8 11.5 8ZM6.5 11.75C7.00781 11.75 7.4375 12.1797 7.4375 12.6875V19.5625C7.4375 20.1094 7.00781 20.5 6.5 20.5C5.95312 20.5 5.5625 20.1094 5.5625 19.5625V12.6875C5.5625 12.1797 5.95312 11.75 6.5 11.75ZM1.5 15.5C2.00781 15.5 2.4375 15.9297 2.4375 16.4375V19.5625C2.4375 20.1094 2.00781 20.5 1.5 20.5C0.953125 20.5 0.5625 20.1094 0.5625 19.5625V16.4375C0.5625 15.9297 0.953125 15.5 1.5 15.5Z" fill="#039855"/>
            </svg>
            `,
        },
        {
            flag: sydney,
            city: 'Sydney',
            country: 'Australia',
            signal: `<svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.5 0.5C22.0078 0.5 22.4375 0.929688 22.4375 1.4375V19.5625C22.4375 20.1094 22.0078 20.5 21.5 20.5C20.9531 20.5 20.5625 20.1094 20.5625 19.5625V1.4375C20.5625 0.929688 20.9531 0.5 21.5 0.5ZM16.5 4.25C17.0078 4.25 17.4375 4.67969 17.4375 5.1875V19.5625C17.4375 20.1094 17.0078 20.5 16.5 20.5C15.9531 20.5 15.5625 20.1094 15.5625 19.5625V5.1875C15.5625 4.67969 15.9531 4.25 16.5 4.25ZM11.5 8C12.0078 8 12.4375 8.42969 12.4375 8.9375V19.5625C12.4375 20.1094 12.0078 20.5 11.5 20.5C10.9531 20.5 10.5625 20.1094 10.5625 19.5625V8.9375C10.5625 8.42969 10.9531 8 11.5 8ZM6.5 11.75C7.00781 11.75 7.4375 12.1797 7.4375 12.6875V19.5625C7.4375 20.1094 7.00781 20.5 6.5 20.5C5.95312 20.5 5.5625 20.1094 5.5625 19.5625V12.6875C5.5625 12.1797 5.95312 11.75 6.5 11.75ZM1.5 15.5C2.00781 15.5 2.4375 15.9297 2.4375 16.4375V19.5625C2.4375 20.1094 2.00781 20.5 1.5 20.5C0.953125 20.5 0.5625 20.1094 0.5625 19.5625V16.4375C0.5625 15.9297 0.953125 15.5 1.5 15.5Z" fill="#039855"/>
            </svg>
            `,
        },
        {
            flag: london,
            city: 'London',
            country: 'UK',
            signal: `<svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.5 0.5C22.0078 0.5 22.4375 0.929688 22.4375 1.4375V19.5625C22.4375 20.1094 22.0078 20.5 21.5 20.5C20.9531 20.5 20.5625 20.1094 20.5625 19.5625V1.4375C20.5625 0.929688 20.9531 0.5 21.5 0.5ZM16.5 4.25C17.0078 4.25 17.4375 4.67969 17.4375 5.1875V19.5625C17.4375 20.1094 17.0078 20.5 16.5 20.5C15.9531 20.5 15.5625 20.1094 15.5625 19.5625V5.1875C15.5625 4.67969 15.9531 4.25 16.5 4.25ZM11.5 8C12.0078 8 12.4375 8.42969 12.4375 8.9375V19.5625C12.4375 20.1094 12.0078 20.5 11.5 20.5C10.9531 20.5 10.5625 20.1094 10.5625 19.5625V8.9375C10.5625 8.42969 10.9531 8 11.5 8ZM6.5 11.75C7.00781 11.75 7.4375 12.1797 7.4375 12.6875V19.5625C7.4375 20.1094 7.00781 20.5 6.5 20.5C5.95312 20.5 5.5625 20.1094 5.5625 19.5625V12.6875C5.5625 12.1797 5.95312 11.75 6.5 11.75ZM1.5 15.5C2.00781 15.5 2.4375 15.9297 2.4375 16.4375V19.5625C2.4375 20.1094 2.00781 20.5 1.5 20.5C0.953125 20.5 0.5625 20.1094 0.5625 19.5625V16.4375C0.5625 15.9297 0.953125 15.5 1.5 15.5Z" fill="#039855"/>
            </svg>
            `,
        },

    ];

    const [selectedCardIndex, setSelectedCardIndex] = useState({
        country: null,
    });

    const [selectedPlan, setSelectedPlan] = useState(null);


    const locationVerification = () => {
        nextStep();
    }

    useEffect(() => {
        const pings = [];

        const forEachSeries = async (iterable, action) => {
            const results = [];
            for (const x of iterable) {
                results.push(await action(x));
            }
            return results;
        }

        const pingAction = async (url) => {
            return await forEachSeries(
                Array(8).fill(url),
                () => ping(url).catch(err => err)
            );
        }

        async function fetchData() {
            const data = await forEachSeries(
                regions.map(region => region.ping_url),
                pingAction
            );
    
            console.log(data);
        }
        fetchData();

    }, []);

    return (
        <>
            <MobileHeader stepNo="Step 2" stepName="Data Centers" logo="step2"/>
            <div className="data-centers-container">

                <div className="main-title">
                    <h2> Data Centers </h2>
                </div>

                <div className="data-map-container">
                    <Map selected={formData.region?.value}/>
                </div>

                <div className="country-select-container">
                    {regions.map((countryData, index) => {

                        const countryName = countryData.display;
                        const [city, country] = countryName.split(" (").map(str => str.replace(")", ""));

                        return <SelectCountry key={index}
                            flag={countryData.flag}
                            city={city}
                            country={country}
                            signal={countryData.ping_url}
                            id={countryData.id}
                            isSelected={countryData.id === formData.region.value}
                            onClick={() => setFormData({ region: { value: countryData.id, display: countryName } })}
                        />
                    })}
                </div>

                <div className="action-btn">
                    <button
                        className="back-btn"
                    >
                        Previous Step
                    </button>
                    <button
                        className="verify-btn"
                        onClick={locationVerification}>
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default SelectLocation;
