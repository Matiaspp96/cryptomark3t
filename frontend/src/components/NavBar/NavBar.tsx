import { PublicRoutes } from '@/models';
import { loginUser } from '@/redux/states/user';
import { getUserInfo } from '@/web3/WagmiConfig';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Connector, useAccount, useClient, useConnect } from 'wagmi';
import Dropdown from './Dropdown';

const Profile: React.FC = () => {
	const dispatch = useDispatch();
	const { address, isConnected, connector } = useAccount();
	const { connect, connectors } = useConnect();
	const client = useClient();

	const connectorWallet = connectors[0];

	const handleConnect = async (connector: Connector) => {
		try {
			connect({ connector });
		} catch (error) {
			console.log(error);
		}
	};

	const userInfo = useCallback(async () => {
		const user = await getUserInfo();
		console.log(user);
		return user;
	}, [client, address]);

	useEffect(() => {
		if (isConnected) {
			userInfo();
			const userPayload = {
				address,
				chainId: connector?.chains[0].id,
			};
			dispatch(loginUser(userPayload));
		}
	}, [isConnected]);

	if (isConnected) {
		return <Dropdown address={address} />;
	} else {
		return (
			<button
				className='relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'
				onClick={() => handleConnect(connectorWallet)}
			>
				<span className='relative px-5 py-2 transition-all ease-in duration-100 bg-white dark:bg-zinc-800 rounded-md group-hover:bg-opacity-0 font-breul text-lg'>
					Connect Wallet
				</span>
			</button>
		);
	}
};

export const NavBar: React.FC = () => {
	// const [nav, setNav] = useState(false);
	const [scroll, setScroll] = useState(0);
	const [navChangeBg, setNavChangeBg] = useState<boolean>(false);
	const navBar = useRef<HTMLDivElement>(null);
	const router = useLocation();

	console.log(router.pathname === PublicRoutes.ROOT);

	// const handleNav = () => {
	// 	setNav(!nav);
	// };

	const controlNavbar = () => {
		if (typeof window !== 'undefined') {
			if (window.scrollY > 100 && router.pathname === PublicRoutes.ROOT) {
				setNavChangeBg(true);
			} else if (
				window.scrollY > 100 &&
				router.pathname === PublicRoutes.EXPLORE
			) {
				setNavChangeBg(true);
			} else {
				setNavChangeBg(false);
			}
			setScroll(window.scrollY);
		}
	};

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', controlNavbar);
			return () => {
				window.removeEventListener('scroll', controlNavbar);
			};
		}
	}, [scroll]);

	return (
		<div
			ref={navBar}
			className={
				navChangeBg
					? 'flex max-h-[80px] bg-[#151c25] shadow shadow-zinc-800 bg-opacity-90 z-10 sticky top-0'
					: 'flex max-h-[80px] bg-transparent z-10 sticky top-0'
			}
		>
			<div className='flex container mx-auto items-center p-5 justify justify-between'>
				<Link to={PublicRoutes.ROOT} className='text-4xl font-breul font-bold'>
					Crypto Mark3t
				</Link>
				<ul className='hidden md:flex gap-2 justify-between list-none items-center h-full'>
					<li className='font-breul text-xl'>
						<Link to={PublicRoutes.ROOT}>Home</Link>
					</li>
					<li className='font-breul text-xl'>
						<Link to={PublicRoutes.EXPLORE}>Marketplace</Link>
					</li>
					<li className='font-breul text-xl'>
						<Link to={PublicRoutes.FAVORITES}>Favorites</Link>
					</li>
					<Profile />
				</ul>
			</div>
			{/* NavBar Small Screen */}
		</div>
	);
};
