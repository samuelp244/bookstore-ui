import React from 'react';
import {
	Button,
	FormControl,
	FormLabel,
	Input,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalFooter,
	FormErrorMessage,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import axiosInstance from '@/api/axiosInstance';
import { useDispatch } from 'react-redux';
import { addAccessToken, addUserData } from '@/redux/authSlice';
import { AxiosError } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setOnboardingModalState } from '@/redux/OnboardingStateSlice';
const SignInComponent = ({
	setOnboardingState,
}: {
	setOnboardingState: React.Dispatch<
		React.SetStateAction<'LOGIN' | 'REGISTER'>
	>;
}) => {
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			username: '',
			password: '',
		},
		validate: (values) => {
			const errors: { username?: string; password?: string } = {};
			if (!values.username) {
				errors.username = 'Username is required';
			}
			if (!values.password) {
				errors.password = 'Password is required';
			}
			return errors;
		},
		onSubmit: async (values) => {
			try {
				const response = await axiosInstance.post('/auth/login', values);
				if (response.status === 200) {
					dispatch(addAccessToken(response.data));
					dispatch(addUserData(response.data));
					dispatch(setOnboardingModalState(false));
				}
			} catch (err: any) {
				console.log(err.response.status);
				if (err.response.status === 404 || err.response.status === 403) {
					toast.error('Invalid user or password', {
						position: 'top-right',
						autoClose: 1000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'light',
					});
				} else if (err.response.status === 500) {
					toast.error('something went wrong,Please try again', {
						position: 'top-right',
						autoClose: 1000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'light',
					});
				}
			}
		},
	});
	return (
		<ModalContent borderRadius={'2xl'}>
			<ModalHeader>SignIn</ModalHeader>
			<ModalCloseButton />
			<form onSubmit={formik.handleSubmit}>
				<ModalBody>
					<FormControl className="relative mb-6">
						<FormLabel>Username</FormLabel>
						<Input
							id="username"
							name="username"
							onChange={formik.handleChange}
							value={formik.values.username}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.username && formik.errors.username && (
							<p className="mt-1 text-red-600 font-normal text-sm absolute">
								{formik.errors.username}
							</p>
						)}
					</FormControl>
					<FormControl className="relative mb-6">
						<FormLabel>Password</FormLabel>
						<Input
							id="password"
							name="password"
							type="password"
							onChange={formik.handleChange}
							value={formik.values.password}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.password && formik.errors.password && (
							<p className="mt-1 text-red-600 font-normal text-sm absolute">
								{formik.errors.password}
							</p>
						)}
					</FormControl>
					<a
						href="#"
						onClick={() => setOnboardingState('REGISTER')}
						className=" text-sm hover:underline"
					>
						{`Don't have an account? Sign up`}
					</a>
				</ModalBody>
				<ModalFooter>
					<Button
						variant="ghost"
						mr={3}
						onClick={() => {
							dispatch(setOnboardingModalState(false));
						}}
					>
						Close
					</Button>
					<Button
						colorScheme="blue"
						type="submit"
						// isLoading={formik.isSubmitting}
					>
						Sign In
					</Button>
				</ModalFooter>
			</form>
			<ToastContainer />
		</ModalContent>
	);
};

export default SignInComponent;
