// WAGMI Libraries
import { PublicRoutes } from '@/models';
import { loginUser } from '@/redux/states/user';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Connector, useAccount, useConnect } from 'wagmi';
import Dropdown from './Dropdown';

const Profile: React.FC = () => {
	const dispatch = useDispatch();
	const { address, isConnected, connector } = useAccount();
	const { connect, connectors, error } = useConnect();

	const connectorWallet = connectors[0];

	const handleConnect = async (connector: Connector) => {
		try {
			connect({ connector });
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (isConnected) {
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
				key={connectorWallet.id}
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
	return (
		<nav className='flex max-h-[80px] container mx-auto items-center p-5 justify justify-between'>
			<h3 className='text-4xl font-breul font-bold'>Crypto Mark3t</h3>
			<ul className='flex gap-2 justify-between list-none items-center h-full'>
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
		</nav>
	);
};
