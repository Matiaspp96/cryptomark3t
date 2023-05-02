// WAGMI Libraries
import { loginUser } from '@/redux/states/user';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Connector, useAccount, useConnect, useDisconnect } from 'wagmi';

const Profile: React.FC = () => {
	const { address, isConnected, connector } = useAccount();
	const { connect, connectors, error } = useConnect();
	const { disconnect } = useDisconnect();
	const dispatch = useDispatch();

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
		return (
			<div className='w-max '>
				<span className='relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 px-4 py-2 bg-blue-500 text-white hover:bg-gradient-to-bl text-center mr-2'>
					{}
					{address?.slice(0, 6)}...
					{address?.slice(address.length - 4, address.length)}
				</span>
				<button
					className='text-gray-900bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-center font-breul text-lg relative inline-flex items-center justify-center p-0.5 overflow-hidden group group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white'
					onClick={disconnect as any}
				>
					<span className='relative px-5 py-2 transition-all ease-in duration-100 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 font-breul text-lg'>
						Disconnect
					</span>
				</button>
			</div>
		);
	} else {
		return (
			<div>
				{connectors.map(connector => {
					return (
						<button
							className='relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'
							key={connector.id}
							onClick={() => handleConnect(connector)}
						>
							<span className='relative px-5 py-2 transition-all ease-in duration-100 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 font-breul text-lg'>
								Connect Wallet
							</span>
						</button>
					);
				})}
				{error && <div>{error.message}</div>}
			</div>
		);
	}
};

export const NavBar: React.FC = () => {
	return (
		<nav className='flex min-h-[80px] min-w-[100vw] items-center p-5 justify justify-between'>
			<h3 className='text-4xl font-breul font-bold'>Crypto Mark3t</h3>
			<ul className='flex gap-2 justify-between list-none items-center h-full'>
				<li className='font-breul text-xl'>
					<Link to={'/'}>Home</Link>
				</li>
				<li className='font-breul text-xl'>
					<Link to={'/explore'}>Marketplace</Link>
				</li>
				<li className='font-breul text-xl'>
					<Link to={'/favorites'}>Favorites</Link>
				</li>
				<Profile />
			</ul>
		</nav>
	);
};
