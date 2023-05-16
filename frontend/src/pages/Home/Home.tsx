import Storage from '@/assets/abi/Storage.json';
import { Product } from '@/models';
import { ApolloClient, InMemoryCache, useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { useClient, useContractWrite, usePrepareContractWrite } from 'wagmi';

export type HomeProps = {};
const AddressContract = '0x29333F9A6B1Ca909b840067e9F3950782f52aec1';

const Home: React.FC<HomeProps> = () => {
	const [number, setNumber] = useState<number>(0);
	const [products, setProducts] = useState<Product[]>([]);
	const { config } = usePrepareContractWrite({
		address: AddressContract,
		abi: Storage,
		functionName: 'store',
		args: [number],
	});
	// const { data, isLoading, isSuccess, write } = useContractWrite(config);

	const handleClick = async () => {
		// try {
		// const user = await getUserInfo(client);
		// 	console.log(user);
		// 	await write?.();
		// } catch (error) {
		// 	console.log(error);
		// }
	};

	return (
		<div>
			<button
				className='
			px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75
			'
				onClick={() => handleClick()}
			>
				Boton
			</button>
			{/* <input type='number' onChange={e => setNumber(Number(e.target.value))} />
			{isLoading && <div>Check Wallet</div>}
			{isSuccess && <div>Transaction: {JSON.stringify(data)}</div>} */}
		</div>
	);
};

export default Home;
