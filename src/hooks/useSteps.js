import { useState, useEffect, useRef } from 'react';

export default function useSteps() {
	const [currentStep, setCurrentStep] = useState(1);
	const [currentChildStep, setCurrentChildStep] = useState(1);
	let previousStep = useRef(currentStep).current;

	useEffect(() => {
		// reset child step to 1 when current step changes
		if ( currentStep !== previousStep ) {
			setCurrentChildStep(1);
		}

		return () => {
			previousStep = currentStep;
		}
	}, [currentStep]);

	const nextStep = () => {
		setCurrentStep(currentStep + 1);
	}

	const prevStep = () => {
		setCurrentStep(currentStep - 1);
	}

	const nextChildStep = () => {
		setCurrentChildStep(currentChildStep + 1);
	}

	const prevChildStep = () => {
		setCurrentChildStep(currentChildStep - 1);
	}

	return {
		currentStep,
		nextStep,
		prevStep,
		currentChildStep,
		nextChildStep,
		prevChildStep,
		setCurrentStep,
		setCurrentChildStep
	}
}