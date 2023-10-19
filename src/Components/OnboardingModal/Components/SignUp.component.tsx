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

const SignUpComponent = ({
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
			email: '',
			password: '',
		},
		validate: (values) => {
			const errors: {
				username?: string;
				email?: string;
				password?: string;
			} = {};

			if (!values.username) {
				errors.username = 'Username is required';
			}

			if (!values.email) {
				errors.email = 'Email is required';
			} else if (
				!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
			) {
				errors.email = 'Invalid email address';
			}

			if (!values.password) {
				errors.password = 'Password is required';
			}

			return errors;
		},
		onSubmit: async (values) => {
			try {
				const response = await axiosInstance.post('/auth/register', values);
				if (response.status === 201) {
					dispatch(addAccessToken(response.data));
					dispatch(addUserData(response.data));
					dispatch(setOnboardingModalState(false));
				}
			} catch (err: any) {
				if (err.response.status === 400) {
					toast.error('User already exists', {
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
					toast.error('Something went wrong. Please try again', {
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
			<ModalHeader>SignUp</ModalHeader>
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
						<FormLabel>Email</FormLabel>
						<Input
							id="email"
							name="email"
							type="email"
							onChange={formik.handleChange}
							value={formik.values.email}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.email && formik.errors.email && (
							<p className="mt-1 text-red-600 font-normal text-sm absolute">
								{formik.errors.email}
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
						onClick={() => setOnboardingState('LOGIN')}
						className=" text-sm hover:underline"
					>
						{`Already have an account? Sign In`}
					</a>
				</ModalBody>

				<ModalFooter>
					<Button variant="ghost" mr={3} onClick={() => {}}>
						Close
					</Button>
					<Button
						colorScheme="blue"
						type="submit"
						// isLoading={formik.isSubmitting}
					>
						Sign Up
					</Button>
				</ModalFooter>
			</form>
			<ToastContainer />
		</ModalContent>
	);
};

export default SignUpComponent;
