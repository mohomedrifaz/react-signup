import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SetupContainer from './components/SetupContainer/SetupContainer';
import './styles/styles.css';
import Sidebar from './components/Sidebar/Sidebar';
import Password from './components/Password/Password';
import ChangeEmail from './components/changeEmail/ChangeEmail';
import SelectLocation from './components/Location/SelectLocation';
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

  const [completionStatus, setCompletionStatus] = useState([false, false, false, false, false]);

  const [selectedPlanTitle, setSelectedPlanTitle] = useState("");
  const [windowsMainTitle, setWindowsMainTitle] = useState("");
  const [networkingMainTitle, setNetworkingMainTitle] = useState("");
  const [backupsMainTitle, setBackupsMainTitle] = useState("");

  const handlePlanStats = (selectedPlan) => {
    setSelectedPlanTitle(selectedPlan.title);
    handleNextStep();
  }

  const handleConfigStats = (selectedTitles) => {
    setWindowsMainTitle(selectedTitles.windows)
    setNetworkingMainTitle(selectedTitles.networking)
    setBackupsMainTitle(selectedTitles.backups)
    handleNextStep();
  };

  const completionStats = [
    "Password Created",
    "Montreal (Canada East)",
    `${selectedPlanTitle}/ "Yearly commitment"`,
    `${windowsMainTitle}/ ${networkingMainTitle}/ ${backupsMainTitle}`,
  ]

  const [currentStepB, setCurrentStepB] = useState(1);

  const handleNextStep = () => {
    setCurrentStepB(currentStepB + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStepB(currentStepB - 1);
  };

  useEffect(() => {
    switch (currentStepB) {
      case 4:
        setCompletionStatus((prevCompletionStatus) => {
          const updatedStatus = [...prevCompletionStatus];
          updatedStatus[0] = true;
          return updatedStatus;
        });
        break;
      case 5:
        setCompletionStatus((prevCompletionStatus) => {
          const updatedStatus = [...prevCompletionStatus];
          updatedStatus[1] = true;
          return updatedStatus;
        });
        break;
      case 6:
        setCompletionStatus((prevCompletionStatus) => {
          const updatedStatus = [...prevCompletionStatus];
          updatedStatus[2] = true;
          return updatedStatus;
        });
        break;
      case 7:
        setCompletionStatus((prevCompletionStatus) => {
          const updatedStatus = [...prevCompletionStatus];
          updatedStatus[2] = true;
          return updatedStatus;
        });
        break;
      case 8:
        setCompletionStatus((prevCompletionStatus) => {
          const updatedStatus = [...prevCompletionStatus];
          updatedStatus[3] = true;
          return updatedStatus;
        });
        break;
      default:
        break;
    }
  }, [currentStepB]);

  const [currentStep, setCurrentStep] = useState(1);
  useEffect(() => {
    switch (currentStepB) {
      case 1:
      case 2:
      case 3:
        setCurrentStep(1);
        break;
      case 4:
        setCurrentStep(2);
        break;
      case 5:
        setCurrentStep(3);
        break;
      case 6:
        setCurrentStep(4);
        break;
      case 7:
        setCurrentStep(4);
        break;
      case 8:
        setCurrentStep(5);
        break;
      default:
        break;
    }
  }, [currentStepB]);


  const renderCurrentStepComponent = () => {
    switch (currentStepB) {
      case 1:
        return <ChangeEmail onNext={handleNextStep} onPrevious={handlePreviousStep} />;
      case 2:
        return <SetupContainer onNext={handleNextStep} />;
      case 3:
        return <Password onNext={handleNextStep} onPrevious={handlePreviousStep} />;
      case 4:
        return <SelectLocation onNext={handleNextStep} onPrevious={handlePreviousStep} />;
      case 5:
        return <SelectPlan onNext={handlePlanStats} onPrevious={handlePreviousStep} />;
      case 6:
        return <ConfigPcIndividual onNext={handleConfigStats} onPrevious={handlePreviousStep} />;
      case 7:
        return <ConfigPcTeam onNext={handleNextStep} onPrevious={handlePreviousStep} />;
      case 8:
        return <PaymentGateway onPrevious={handlePreviousStep} />;
      default:
        return null;
    }
  };

  return (
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
        {renderCurrentStepComponent()}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
