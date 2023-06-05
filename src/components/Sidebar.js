import React from "react";

const Sidebar = () => {
    return (
        <div className="sidebar sidebar-container">
            <div className="sidebar-navbar">
                <div className="single-nav">
                    <div className="nav-bullet active"> <p> <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg> </p> </div>
                    <div className="nav-content">
                        <div className="nav-topic active"> Setup Account </div>
                        <div className="nav-subtopic"> Current </div>
                    </div>
                </div>
                <div className="single-nav">
                    <div className="nav-bullet"> <p> 2 </p> </div>
                    <div className="nav-content">
                        <div className="nav-topic"> Select Location </div>
                        <div className="nav-subtopic"> Step 2 </div>
                    </div>
                </div>
                <div className="single-nav">
                    <div className="nav-bullet"> <p> 3 </p> </div>
                    <div className="nav-content">
                        <div className="nav-topic"> Select Plan </div>
                        <div className="nav-subtopic"> Step 3 </div>
                    </div>
                </div>
                <div className="single-nav">
                    <div className="nav-bullet"> <p> 4 </p> </div>
                    <div className="nav-content">
                        <div className="nav-topic"> Computer Configuration </div>
                        <div className="nav-subtopic"> Step 4 </div>
                    </div>
                </div>
                <div className="single-nav">
                    <div className="nav-bullet"> <p> 5 </p> </div>
                    <div className="nav-content">
                        <div className="nav-topic"> Billing & Payment </div>
                        <div className="nav-subtopic"> Step 5 </div>
                    </div>
                </div>                      
            </div>
        </div>
    )
}

export default Sidebar;