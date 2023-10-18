import React, { useEffect, useState } from 'react';
import NavigationLinksCreator from './NavigationLinksCreator';
import getNewRefreshToken from '@/api/getNewRefreshToken';
import Link from 'next/link';
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Spinner,
} from '@chakra-ui/react';
import Header from '../Header/Header';
import { OnboardingModal } from '@/Components/OnboardingModal';

interface NavigationComponentWithOutletProps {
	children: React.ReactNode;
}

const NavOutlet: React.FC<NavigationComponentWithOutletProps> = ({
	children,
}: NavigationComponentWithOutletProps) => {
	const [renderOutLet, setRenderOutlet] = useState(true);
	const [showNavigationDrawer, setShowNavigationDrawer] = useState(false);

	const fetchAccessToken = async (): Promise<void> => {
		try {
			await getNewRefreshToken();
			setRenderOutlet(true);
		} catch (error: any) {
			setRenderOutlet(true);
		}
	};

	useEffect(() => {
		try {
			void fetchAccessToken();
		} catch (error: any) {}
	}, []);
	return (
		<>
			{renderOutLet ? (
				<div
					className={
						'w-screen min-h-[100vh] bg-white grid grid-cols-12 overflow-hidden'
					}
				>
					<div
						className={
							'border-r-[1px] border-y-0 border-l-0 border-r-[#E9EDFF] shadow-2xl border-solid col-span-0 xl:col-span-2 hidden xl:block'
						}
					>
						<div className={' h-screen fixed left-0 w-[calc((100vw/12)*2)]'}>
							<Link href="/" className={'h-[22px] w-28 mt-4 ml-6 flex text-xl'}>
								<p className=" font-bold">Book</p>Store
							</Link>
							<NavigationLinksCreator
								setShowNavigationDrawer={setShowNavigationDrawer}
							/>
						</div>
					</div>
					<Drawer
						placement="left"
						isOpen={showNavigationDrawer}
						onClose={() => {
							setShowNavigationDrawer(false);
						}}
					>
						<DrawerOverlay />
						<DrawerContent>
							<DrawerCloseButton />
							<DrawerHeader borderBottomWidth="1px">
								<Link href="/" className={' flex text-xl'}>
									<p className=" font-bold">Book</p>Store
								</Link>
							</DrawerHeader>
							<DrawerBody>
								<NavigationLinksCreator
									setShowNavigationDrawer={setShowNavigationDrawer}
								/>
							</DrawerBody>
						</DrawerContent>
					</Drawer>
					<div className={'col-span-12 xl:col-span-10'}>
						<div className={'h-full'}>
							<Header setShowNavigationDrawer={setShowNavigationDrawer} />
							<div className={' bg-[#ebeef5]'}>{children}</div>
						</div>
					</div>
				</div>
			) : (
				<div className="flex justify-center items-center h-screen">
					<Spinner className="" />
				</div>
			)}
			<OnboardingModal />
		</>
	);
};

export default NavOutlet;
