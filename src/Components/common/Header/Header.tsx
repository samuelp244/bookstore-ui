import { Dispatch, SetStateAction, useState } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import axiosInstance from '@/api/axiosInstance';
import { RxHamburgerMenu } from 'react-icons/rx';
import {
	Avatar,
	AvatarBadge,
	Icon,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import { useAppSelector } from '@/redux/hooks';
import { FiShoppingBag } from 'react-icons/fi';
import { CheckoutModel } from '@/Components/CheckoutModel';
import { FaChevronDown } from 'react-icons/fa';
import { resetAccessToken } from '@/redux/authSlice';
import { setOnboardingModalState } from '@/redux/OnboardingStateSlice';

const Header: React.FC<{
	setShowNavigationDrawer: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowNavigationDrawer }) => {
	const authentication = useAppSelector((state) => state.authentication);
	const checkoutCart = useAppSelector((state) => state.checkoutCart);
	const dispatch = useDispatch();
	const router = useRouter();
	const [checkoutModal, setCheckoutModel] = useState(false);
	const HandleSignOut = async (): Promise<void> => {
		try {
			const response = await axiosInstance.post('/auth/signout');
			if (response.status === 200) {
				dispatch(resetAccessToken());
				await router.push('/');
			}
		} catch (error: any) {
			console.log(error);
		}
	};
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
					className="cursor-pointer"
				/>
			</div>

			<div className={'flex items-center gap-4'}>
				<div>
					{checkoutCart.booksCart.length > 0 ? (
						<Avatar
							icon={<Icon as={FiShoppingBag} fontSize="2rem" color="black" />}
							bg="white"
							cursor={'pointer'}
							onClick={() => {
								setCheckoutModel(true);
							}}
						>
							<AvatarBadge
								boxSize="1em"
								bg="teal"
								borderColor={'teal'}
								className="mb-2 mr-2"
							>
								<p className="text-sm font-light">
									{checkoutCart.booksCart.length}
								</p>
							</AvatarBadge>
						</Avatar>
					) : (
						<Avatar
							icon={<Icon as={FiShoppingBag} fontSize="2rem" color="black" />}
							bg="white"
							cursor={'pointer'}
							onClick={() => {
								setCheckoutModel(true);
							}}
						/>
					)}
				</div>
				{authentication.accessToken !== null && authentication.user !== null ? (
					<Menu>
						<MenuButton>
							<a
								onClick={(e) => {
									e.preventDefault();
								}}
								className="flex gap-3 justify-between cursor-pointer min-w-[100px] px-3 py-2 border-solid rounded-md border border-[#E0E0E0]"
							>
								<div className="flex gap-2">
									<p className=" text-base font-medium m-auto text-[#000000]">
										{authentication?.user.username !== undefined &&
											authentication?.user !== null && (
												<p>{authentication.user.username}</p>
											)}
									</p>
								</div>
								<Icon as={FaChevronDown} className="m-auto" />
							</a>
						</MenuButton>
						<MenuList>
							<MenuItem
								onClick={() => {
									void HandleSignOut();
								}}
							>
								Logout
							</MenuItem>
						</MenuList>
					</Menu>
				) : (
					<Menu>
						<MenuButton
							onClick={(e) => {
								e.preventDefault();
								dispatch(setOnboardingModalState(true));
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
			<CheckoutModel
				openModel={checkoutModal}
				onModalClose={() => {
					setCheckoutModel(false);
				}}
			/>
		</div>
	);
};

export default Header;
