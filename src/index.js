import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SetupContainer from './components/SetupContainer/SetupContainer';
import './styles/styles.css';
import Sidebar from './components/Sidebar/Sidebar';
import Password from './components/Password/Password';
import ChangeEmail from './components/changeEmail/ChangeEmail';
import PaymentGateway from './components/PaymentGateway/PaymentGateway';
import SelectPlan from './components/SelectPlan/SelectPlan';
import ConfigPcTeam from './components/ComputerConfig/ConfigPcTeam';
import ConfigPcIndividual from './components/ComputerConfig/ConfigPcIndividual';


const App = () => {

  const stepTitles = [
    "Setup Account",
    "Select Location",
    "Select Plan",
    "Computer Configuration",
    "Billing & Payment"
  ];
  const completionStatus = [true, true, true, false, false];
  const completionStats = [
    "Password Created",
    "Montreal (Canada East)",
    "The Startup/ Yearly commitment",
    "Window 11 multi-user/ Private IP/ 1 Week Backup",
  ]
  const currentStep = 5;

  return (
    <Router>
      <div className="container">
        <div className="sidebar">
          <Sidebar
            currentStep={currentStep}
            completionStatus={completionStatus}
            stepTitles={stepTitles}
            completionStats={completionStats}
          />
        </div>
        <div className="main">
          {/* <SetupContainer /> */}
          {/* <Switch>
            <Route exact path="/" component={SetupContainer} />
            <Route path="/password" component={Password} />
            <Route path="/change-email" component={ChangeEmail} />
            <Route path="/select-plan" component={SelectPlan} />
            <Route path="/config-pc-individual" component={ConfigPcIndividual} />
            <Route path="/config-pc-team" component={ConfigPcTeam} />
            <Route path="/payment-gateway" component={PaymentGateway} />
          </Switch> */}
        </div>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
