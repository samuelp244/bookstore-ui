import type { Dispatch, SetStateAction } from 'react';
import React from 'react';
// import { Dropdown, Menu } from 'antd';
// import navigationPanelOpenIcon from '@/assets/icons/navigationPanelOpen.svg';
// import chevronDown from '@/assets/icons/chevron-down.svg';
// import userIcon from '@/assets/icons/userIcon.svg';
// import notificationIcon from '../../assets/icons/notification-icon.svg';
// import { setModalStateTrue } from '@/redux/OnboardingModalSlice';
import { useDispatch, useSelector } from 'react-redux';
// import { signOutUser } from '@/apis/auth.apis';
// import { CustomAxiosErrorResponse } from '../../apis';
// import { useNotification } from '@/mool-components/components';
// import { type BackendResponse } from '@/types/types';
// import { resetAccessToken } from '@/redux/authenticationslice';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import axiosInstance from '@/api/axiosInstance';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Icon, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useAppSelector } from '@/redux/hooks';
const Header: React.FC<{
	setShowNavigationDrawer: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowNavigationDrawer }) => {
	const authentication = useAppSelector((state) => state.authentication);
	// const notification = useNotification();
	const dispatch = useDispatch();
	// const navigate = useNavigate();
	const router = useRouter();
	// const HandleSignOut = async (): Promise<void> => {
	// 	try {
	// 		const response = await axiosInstance.post(signOutUser, {
	// 			clientType: 'WEB',
	// 		});
	// 		if (response.status === 200 && response.data.success === true) {
	// 			dispatch(resetAccessToken());
	// 			await router.push('/');
	// 		}
	// 	} catch (error: any) {
	// 		if (error.handled === true) {
	// 			notification.error({
	// 				heading: error.errorMessage ?? '',
	// 				description: error.errorDescription ?? '',
	// 			});
	// 			if (error.navigate != null) {
	// 				await router.push(error.navigate);
	// 			}
	// 		} else {
	// 			const data: BackendResponse = error.axiosError.response
	// 				?.data as BackendResponse;
	// 			if (data?.type === 'US-IUACWP-1') {
	// 				notification.error({
	// 					description: 'This number has already been used in our system',
	// 				});
	// 			}
	// 		}
	// 	}
	// };
	return (
		<div
			className={
				'py-[0.6rem] shadow-2xl pr-9 border-b-[1px] border-x-0 border-t-0 border-b-[##e0e2e8] border-solid flex items-center max-xl:justify-between xl:justify-end'
			}
		>
			<div className={'mx-5 xl:hidden'}>
				<Icon
					as={RxHamburgerMenu}
					onClick={() => {
						setShowNavigationDrawer(true);
					}}
				/>
			</div>

			<div className={'flex items-center gap-4'}>
				{/* <a
				onClick={(e) => {
					e.preventDefault();
				}}
			>
				<Image className="cursor-pointer" src={notificationIcon} alt="" />
			</a> */}

				{authentication.accessToken !== null && authentication.user !== null ? (
					<Menu>
						<MenuButton>
							<a
								onClick={(e) => {
									e.preventDefault();
								}}
								className="flex gap-3 justify-between cursor-pointer min-w-[100px] px-3 py-2 border-solid rounded-md border border-[#E0E0E0]"
							>
								{/* <div className="flex gap-2">
									<Image src={userIcon} alt="" />
									<p className=" text-base font-medium m-auto text-[#000000]">
										{authentication?.user?.name?.first !== undefined &&
										authentication?.user?.name?.first !== null
											? `${
													(authentication?.user?.name?.first as string) ?? ''
											  } ${(authentication?.user?.name?.last as string) ?? ''}`
											: 'User'}
									</p>
								</div> */}
								hii
								{/* <Image src={chevronDown} alt="" className="m-auto" /> */}
							</a>
						</MenuButton>
						<MenuList>
							<MenuItem>
								<a
									onClick={(e) => {
										// e.preventDefault();
										// HandleSignOut()
										// 	.then(() => {})
										// 	.catch(() => {});
									}}
								>
									Logout
								</a>
							</MenuItem>
						</MenuList>
					</Menu>
				) : (
					<Menu>
						<MenuButton
							onClick={(e) => {
								e.preventDefault();
								// dispatch(setModalStateTrue());
							}}
							className="flex gap-3 justify-between cursor-pointer min-w-[100px] px-3 py-2 border-solid rounded-md border border-[#E0E0E0]"
						>
							<div className="flex gap-2">
								{/* <Image src={userIcon} alt="" /> */}
								<p className=" text-base font-medium m-auto text-[#000000]">
									Signup/ Login
								</p>
							</div>
						</MenuButton>
					</Menu>
				)}
			</div>
		</div>
	);
};

export default Header;
