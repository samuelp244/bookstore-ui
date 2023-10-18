import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setOnboardingModalState } from '@/redux/OnboardingStateSlice';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import SignInComponent from './Components/SignIn.component';
import SignUpComponent from './Components/SignUp.component';

const OnboardingModal = () => {
	const ModalStateSlice = useAppSelector((state) => state.onboardingModal);
	const dispatch = useAppDispatch();
	const [onboardingState, setOnboardingState] = useState<'LOGIN' | 'REGISTER'>(
		'LOGIN'
	);
	return (
		<Modal
			blockScrollOnMount={false}
			isOpen={ModalStateSlice.modalState}
			onClose={() => {
				dispatch(setOnboardingModalState(false));
			}}
		>
			<ModalOverlay />
			{onboardingState === 'LOGIN' && (
				<SignInComponent setOnboardingState={setOnboardingState} />
			)}
			{onboardingState === 'REGISTER' && (
				<SignUpComponent setOnboardingState={setOnboardingState} />
			)}
		</Modal>
	);
};

export { OnboardingModal };
