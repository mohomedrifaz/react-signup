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

const SelectLocation = ({ formData, setFormData, stepData: { nextStep, prevStep }, appData }) => {
    const regions = appData.regions.map(region => {
        let flag = '';
        switch ( region.id ){
            case 1:
                flag = montreal;
                break;
            case 2:
                flag = france;
                break;
            case 4:
                flag = washington;
                break;
            case 5:
                flag = SG;
                break;
            case 7:
                flag = london;
                break;
            case 10:
                flag = washington;
                break;
            case 14:
                flag = sydney;
                break;
            case 22:
                flag = frankfurt;
                break;
            case 30:
                flag = mumbai;
                break;
            default:
                flag = null;
                break;
        };

        return {
            ...region,
            flag
        };
    }).sort((regionA, regionB) => regionA.ping - regionB.ping);

    const locationVerification = () => {
        nextStep();
    };

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
                    {
                        regions.map((countryData, index) => {

                            const countryName = countryData.display;
                            const [city, country] = countryName.split(" (").map(str => str.replace(")", ""));


                            return <SelectCountry key={index}
                                flag={countryData.flag}
                                city={city}
                                country={country}
                                signal={countryData.ping_url}
                                id={countryData.id}
                                strength={countryData.ping - regions[0].ping <= 100 ? 'full' : ( countryData.ping - regions[0].ping <= 300 ? 'medium' : 'poor' )}
                                isSelected={countryData.id === formData.region.value}
                                onClick={() => setFormData({ region: { value: countryData.id, display: countryName } })}
                            />
                        })
                    }
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
