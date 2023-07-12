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
import Loading from './components/Loading';
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
        firstname: '',
        lastname: '',
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
		bck_retention: '',
		malwarebytes_install: false
    });

	const [appData, setApplicationdata] = useState({
		token: ''
	});

	const [loading, setLoading] = useState(false);

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
		appData,
		loading,
		setLoading
	}

	useEffect(() => {
		axios.get('/wp-json/v2cloud/v1/access-token')
			.then(res => setAppData({ token: res.data.access_token }))
			.catch(err => console.log(err));
	}, []);

	useEffect(() => {
		if ( ! appData.token ) {
			return;
		}
		if ( appData.plans ) {
			return;
		}
		axios.get('/wp-json/v2cloud/v1/plans', { params: { token: appData.token } } )
			.then(res => setAppData({...res.data}))
			.catch(err => console.log(err?.response?.data || err.message));
	}, [appData]);

	useEffect(() => {
		if ( ! appData.regions ) {
			return;
		}

		// if ping is already set for atleast one region, don't ping again
		if ( appData.regions.some(region => !!region?.ping) ) {
			return;
		}

		// ping function to ping the url and return the time taken
		const ping = (url) => {
			return new Promise((resolve, reject) => {
				const started = new Date().getTime();
				const http = new XMLHttpRequest();
				http.open("OPTIONS", "https://" + url, true);
				http.onreadystatechange = function () {
					const ended = new Date().getTime();
					let milliseconds = ended - started;
					if ( http.readyState === 4 ) {
						resolve(milliseconds);
					}
					resolve(0);
				};
				http.onerror = () => resolve(0);
				http.send();
			});
		}

		// run ping synchronously for each region for 8 times
		const data = appData.regions.map(async (region) => {
			const pingTime = await Promise.all(
				Array(8).fill(region.ping_url).map(url => ping(url)))
					.then(pings => pings.reduce((total, curr) => total + curr, 0) / pings.length
			);
			return { ...region, ping: pingTime };
		});

		// wait for all pings to finish and set the state
		Promise.all(data).then(regionsWithPing => setAppData({ regions: regionsWithPing }));
	}, [appData]);

	return (
		<>
			{ loading && <Loading progress={loading}/> }
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