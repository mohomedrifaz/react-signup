import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/styles.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SetupContainer from './components/SetupContainer/SetupContainer';
import Sidebar from './components/Sidebar/Sidebar';
import Password from './components/Password/Password';
import ChangeEmail from './components/changeEmail/ChangeEmail';
import SelectLocation from './components/Location/SelectLocation';
import PaymentGateway from './components/PaymentGateway/PaymentGateway';
import SelectPlan from './components/SelectPlan/SelectPlan';
import ConfigPcTeam from './components/ComputerConfig/ConfigPcTeam';
import ConfigPcIndividual from './components/ComputerConfig/ConfigPcIndividual';
import RegistrationForm from './components/RegistrationForm';


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
  const [selectedPlanConfig, setSelectedPlanConfig] = useState("");
  const [selectedPlanUsers, setSelectedPlanUsers] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");


  const [selectedLocationCity, setSelectedLocationCity] = useState("");
  const [selectedLocationCountry, setSelectedLocationCountry] = useState("");

  const [windowsMainTitle, setWindowsMainTitle] = useState("");
  const [networkingMainTitle, setNetworkingMainTitle] = useState("");
  const [backupsMainTitle, setBackupsMainTitle] = useState("");

  const handlePlanStats = (selectedPlan, category) => {
    setSelectedPlanTitle(selectedPlan.title);
    setSelectedPlanConfig(selectedPlan.config);
    setSelectedPlanUsers(selectedPlan.users);
    setSelectedPlan(category);
    handleNextStep();
  }

  const handleLocationStats = (selectedLocation) => {
    console.log(selectedLocation);
    const countryName = selectedLocation.display;
    const [city, Country] = countryName.split(" (").map(str => str.replace(")", ""));
    setSelectedLocationCity(city);
    setSelectedLocationCountry(Country);
    handleNextStep();
  }

	const handleConfigStats = (selectedTitles) => {
		setWindowsMainTitle(selectedTitles.windows)
		setNetworkingMainTitle(selectedTitles.networking)
		setBackupsMainTitle(selectedTitles.backups)
		handleNextStep();
	};

  const [isBackup, setIsBackup] = useState(false);

  const handleBackup = (backup) => {
    setIsBackup(backup);
  };

  const completionStats = [
    "Password Created",
    `${selectedLocationCity} (${selectedLocationCountry})`,
    `${selectedPlanTitle}/ "Yearly commitment"`,
    `${windowsMainTitle ? `${windowsMainTitle} /` : ''} ${networkingMainTitle ? `${networkingMainTitle} /` : ''} ${backupsMainTitle ? `${backupsMainTitle}` : ''}`,
  ]

	const [currentStepB, setCurrentStepB] = useState(0);

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

	const [currentStep, setCurrentStep] = useState(0);
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
        return <SelectLocation onNext={handleLocationStats} onPrevious={handlePreviousStep} />;
      case 5:
        return <SelectPlan onNext={handlePlanStats} onPrevious={handlePreviousStep} backupState={handleBackup} />;
      case 6:
        return <ConfigPcIndividual onNext={handleConfigStats} onPrevious={handlePreviousStep} isBackup={isBackup} />;
      case 7:
        return <ConfigPcTeam onNext={handleConfigStats} onPrevious={handlePreviousStep} isBackup={isBackup} />;
      case 8:
        return <PaymentGateway onPrevious={handlePreviousStep}
        plan={selectedPlan}
        planTitle={selectedPlanTitle}
        selectedCity={selectedLocationCity} 
        selectedCountry={selectedLocationCountry}
        windowsTitle={windowsMainTitle}
        networkTitle={networkingMainTitle}
        backupsTitle={backupsMainTitle} 
        planConfig={selectedPlanConfig} 
        planUsers={selectedPlanUsers} />;
      default:
        return null;
    }
  };

	return (
		<>
			{ currentStep === 0 && <RegistrationForm /> }
			{ currentStep > 0 && (
				<div className="steps-container">
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
			) }
		</>
	);
};

const root = createRoot( document.getElementById( 'root' ) );
root.render(<App />);