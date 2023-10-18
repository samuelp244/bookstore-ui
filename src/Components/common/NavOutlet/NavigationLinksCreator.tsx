import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FiBook } from 'react-icons/fi';
import { FaBook } from 'react-icons/fa';
import { Icon } from '@chakra-ui/react';
// FiBook
// FaBook
const NavigationLinksCreator: React.FC<{
	setShowNavigationDrawer: (value: boolean) => void;
}> = ({ setShowNavigationDrawer }) => {
	const router = useRouter();
	// const dispatch = useDispatch();
	const navigationLinksProps = [
		{
			name: 'Browse',
			icon: FiBook,
			hoverStateIcon: FaBook,
			path: '/',
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
								void router.push(navigationLink.path);
								setShowNavigationDrawer(false);
							}}
							// onMouseEnter={() => handleMouseEnter(index)}
							// onMouseLeave={() => handleMouseLeave(index)}
						>
							{/* {router.pathname === navigationLink.path ? (
								<Icon
									as={navigationLink.hoverStateIcon}
									className={'text-black bg-orange-500 ml-4 mr-2 my-auto h-4 w-4 block'}
								/>
							) : (
								<Icon
									as={navigationLink.icon}
									className={'text-black  ml-4 mr-2 my-auto h-4 w-4 block'}
								/>
							)} */}
							{navigationLink.name}{' '}
						</a>
					);
				})}
			</div>
		</>
	);
};
export default NavigationLinksCreator;
