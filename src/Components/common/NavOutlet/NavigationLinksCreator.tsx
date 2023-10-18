import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FiBook } from 'react-icons/fi';
import { FaBook } from 'react-icons/fa';
import { Icon } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setOnboardingModalState } from '@/redux/OnboardingStateSlice';
// FiBook
// FaBook
const NavigationLinksCreator: React.FC<{
	setShowNavigationDrawer: (value: boolean) => void;
}> = ({ setShowNavigationDrawer }) => {
	const router = useRouter();
	const accessToken = useAppSelector(
		(state) => state.authentication.accessToken
	);
	const dispatch = useAppDispatch();
	const navigationLinksProps = [
		{
			name: 'Home',
			icon: FiBook,
			hoverStateIcon: FaBook,
			path: '/',
		},
		{
			name: 'Browse',
			icon: FiBook,
			hoverStateIcon: FaBook,
			path: '/browse',
		},
		{
			name: 'Library',
			icon: FiBook,
			hoverStateIcon: FaBook,
			path: '/library',
		},
	];

	return (
		<>
			<div className={'mt-10 mx-1 text-[#BDBDBD]'}>
				{navigationLinksProps.map((navigationLink, index) => {
					return (
						<a
							className={[
								`cursor-pointer pl-5 py-3 my-4 pr-5 no-underline text-gray-600 hover:text-black hover:font-semibold font-medium text-lg flex justify-start align-center`,

								router.pathname.split('/')[1] ===
								navigationLink.path.split('/')[1]
									? 'text-black font-semibold rounded-md'
									: '',
							].join(' ')}
							key={navigationLink.path}
							onClick={() => {
								if (
									navigationLink.path === '/library' &&
									accessToken === null
								) {
									dispatch(setOnboardingModalState(true));
								} else {
									void router.push(navigationLink.path);
									setShowNavigationDrawer(false);
								}
							}}
						>
							{navigationLink.name}{' '}
						</a>
					);
				})}
			</div>
		</>
	);
};
export default NavigationLinksCreator;
