import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';

import './styles/styles.css';
import SetupContainer from './components/SetupContainer/SetupContainer';
import Sidebar from './components/Sidebar/Sidebar';
import Password from './components/Password/Password';
import ChangeEmail from './components/changeEmail/ChangeEmail';
import SelectLocation from './components/Location/SelectLocation';
import PaymentGateway from './components/PaymentGateway/PaymentGateway';
import SelectPlan from './components/SelectPlan/SelectPlan';
import ConfigPcIndividual from './components/ComputerConfig/ConfigPcIndividual';
import RegistrationForm from './components/RegistrationForm';
import useSteps from './hooks/useSteps';

const CurrentStepComponent = (props) => {
	const { stepData: { currentStep, currentChildStep } } = props;
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
			return <PaymentGateway {...props} />;
	}
};

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
        contract_type: '',
		malwarebytes_install: false
    });

	const [appData, setApplicationdata] = useState({
		token: ''
	});

	// helper function set only the data that is passed in
	const setFormData = (data) => setUserRegistrationData({ ...userRegistrationData, ...data });

	const setAppData = (data) => setApplicationdata({ ...appData, ...data });

	const stepProps = {
		stepData: {
			currentStep,
			currentChildStep,
			setCurrentStep,
			...stepData
		},
		formData: userRegistrationData,
		setFormData,
	}

	useEffect(() => {
		axios.get('/wp-json/v2cloud/v1/access-token')
			.then(res => setAppData({ token: res.data.access_token }))
			.catch(err => console.log(err));
	}, []);

	return (
		<>
			{ currentStep === 0 && <RegistrationForm  {...stepProps} /> }
			{ currentStep > 0 && currentStep <= 5 && (
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