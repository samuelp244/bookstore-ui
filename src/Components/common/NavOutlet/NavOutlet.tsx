import React, { useEffect, useState } from 'react';
// import moolForBlackBackground from '@/assets/logos/mool-logo-two.png';
// import { Drawer } from 'antd';
// import Header from '../Header/Header';
import NavigationLinksCreator from './NavigationLinksCreator';
// import crossIcon from '@/assets/icons/cross-icon.svg';
// import Image from 'next/image';
import getNewRefreshToken from '@/api/getNewRefreshToken';
import Link from 'next/link';
import { Drawer, Spinner } from '@chakra-ui/react';
import Header from '../Header/Header';
import { OnboardingModal } from '@/Components/OnboardingModal';

// import dayjs from 'dayjs';
// import SignInAndSignUpModal from '@/components/common/OnboardingModalV2';
// import Link from 'next/link';

interface NavigationComponentWithOutletProps {
	children: React.ReactNode;
}

const NavOutlet: React.FC<NavigationComponentWithOutletProps> = ({
	children,
}: NavigationComponentWithOutletProps) => {
	const [renderOutLet, setRenderOutlet] = useState(true);
	// const authenticationState = useSelector((state: any) => state);
	const [showNavigationDrawer, setShowNavigationDrawer] = useState(false);
	// const dispatch = useDispatch();

	// const fetchAccessToken = async (): Promise<void> => {
	// 	try {
	// 		await getNewRefreshToken();
	// 		setRenderOutlet(true);
	// 	} catch (error: any) {
	// 		setRenderOutlet(true);
	// 	}
	// };

	// // const router = useRouter();

	// useEffect(() => {
	// 	try {
	// 		void fetchAccessToken();
	// 	} catch (error: any) {}
	// }, []);
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
						// contentWrapperStyle={{ backgroundColor: '#292929' }}
						// rootStyle={{ backgroundColor: '#292929' }}
					>
						{/* <div>
							{
								<Image
									src={moolForBlackBackground}
									alt={'Mool logo'}
									className={'h-[22px] w-28 my-7 mx-5'}
								/>
							}
							<a
								className="absolute top-0 right-0 mt-5"
								onClick={() => {
									setShowNavigationDrawer(false);
								}}
							>
								<Image src={crossIcon} alt="" />
							</a>
						</div> */}
						<NavigationLinksCreator
							setShowNavigationDrawer={setShowNavigationDrawer}
						/>
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
