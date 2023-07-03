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

	// Step data for global use
	const { currentStep, currentChildStep, setCurrentStep, ...stepData  } = useSteps();
	// Registration data for global use
	const [userRegistrationData, setUserRegistrationData] = useState({
        email: '',
        stripeToken: '',
        user_password: '',
        first_name: '',
        last_name: '',
        phone: '',
        company: '',
        region: '',
        software: '',
        hardware: '',
        plan: '',
        ip: '',
        description: '',
        password: '',
        ssd: 1,
        cycle: "month",
        contract_type: ''
    });

	// helper function set only the data that is passed in
	const setFormData = (data) => setUserRegistrationData({ ...userRegistrationData, data });

	const CurrentStepComponent = (props) => {
		switch (currentStep) {
			case 1:
				switch(currentChildStep) {
					// case 1 is passed as 1 is always the parent step
					case 2:
						return <ChangeEmail {...props} />;
					case 3:
						return <Password {...props} />;
				}
				return <SetupContainer {...props} />;
			case 2:
				return <SelectLocation {...props} />;
			case 3:
				return <SelectPlan {...props} />;
			case 4:
				return <ConfigPcIndividual {...props} />;
			case 5:
				return <ConfigPcTeam {...props} />;
			case 6:
				return <PaymentGateway {...props} />;
		}
		// switch (currentStep) {
		// 	case 1:
		// 		switch (currentChildStep) {
		// 			case 2:
		// 				return <SetupContainer {...props} onNext={nextChildStep} />;
		// 			case 3:
		// 				return <Password {...props} onNext={nextStep} onPrevious={prevChildStep} />;
		// 		}
		// 	return <ChangeEmail {...props} onNext={nextChildStep} onPrevious={null} />;
		// 	case 2:
		// 		return <SelectLocation {...props} onNext={handleLocationStats} onPrevious={prevStep} />;
		// 	case 3:
		// 		return <SelectPlan {...props} onNext={handlePlanStats} onPrevious={prevStep} backupState={handleBackup} />;
		// 	case 4:
		// 		return <ConfigPcIndividual onNext={handleConfigStats} onPrevious={prevStep} isBackup={isBackup} />;
		// 	case 5:
		// 		return <ConfigPcTeam onNext={handleConfigStats} onPrevious={prevStep} isBackup={isBackup} />;
		// 	case 6:
		// 		return <PaymentGateway onPrevious={prevStep}
		// 			plan={selectedPlan}
		// 			planTitle={selectedPlanTitle}
		// 			selectedCity={selectedLocationCity} 
		// 			selectedCountry={selectedLocationCountry}
		// 			windowsTitle={windowsMainTitle}
		// 			networkTitle={networkingMainTitle}
		// 			backupsTitle={backupsMainTitle} 
		// 			planConfig={selectedPlanConfig} 
		// 			planUsers={selectedPlanUsers}
		// 		/>;
		// 	default:
		// 		return null;
		// }
	};

	const stepProps = {
		stepData: {
			currentStep,
			currentChildStep,
			setCurrentStep,
			...stepData
		},
		formData: userRegistrationData,
		setFormData
	}

	return (
		<>
			{ currentStep === 0 && <RegistrationForm /> }
			{ currentStep > 0 && (
				<div className="steps-container">
					<div className="sidebar">
						<Sidebar
							formData={userRegistrationData}
							currentStep={currentStep}
							setCurrentStep={setCurrentStep}
						/>
					</div>
					<div className="main">
						<CurrentStepComponent {...stepProps} />
					</div>
				</div>
			) }
		</>
	);
};

const root = createRoot( document.getElementById( 'root' ) );
root.render(<App />);