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
import useSteps from './hooks/useSteps';

const App = () => {

	const { currentStep, nextStep, prevStep, currentChildStep, nextChildStep, prevChildStep  } = useSteps();

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
    nextStep();
  }

  const handleLocationStats = (selectedLocation) => {
    console.log(selectedLocation);
    const countryName = selectedLocation.display;
    const [city, Country] = countryName.split(" (").map(str => str.replace(")", ""));
    setSelectedLocationCity(city);
    setSelectedLocationCountry(Country);
    nextStep();
  }

	const handleConfigStats = (selectedTitles) => {
		setWindowsMainTitle(selectedTitles.windows)
		setNetworkingMainTitle(selectedTitles.networking)
		setBackupsMainTitle(selectedTitles.backups)
		nextStep();
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


  const renderCurrentStepComponent = () => {
    switch (currentStep) {
      case 1:
		switch (currentChildStep) {
			case 2:
				return <SetupContainer onNext={nextChildStep} />;
			case 3:
				return <Password onNext={nextStep} onPrevious={prevChildStep} />;
		}
        return <ChangeEmail onNext={nextChildStep} onPrevious={null} />;
      case 2:
        return <SelectLocation onNext={handleLocationStats} onPrevious={prevStep} />;
      case 3:
        return <SelectPlan onNext={handlePlanStats} onPrevious={prevStep} backupState={handleBackup} />;
      case 4:
        return <ConfigPcIndividual onNext={handleConfigStats} onPrevious={prevStep} isBackup={isBackup} />;
      case 5:
		return <ConfigPcTeam onNext={handleConfigStats} onPrevious={prevStep} isBackup={isBackup} />;
      case 6:
		return <PaymentGateway onPrevious={prevStep}
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
							completionStatus={[false, false, false, false, false]}
							stepTitles={[
								"Setup Account",
								"Select Location",
								"Select Plan",
								"Computer Configuration",
								"Billing & Payment"
							]}
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