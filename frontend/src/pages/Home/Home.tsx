import React from 'react';
import { useSigner } from 'wagmi';

export type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
	const { data, error, isLoading, refetch } = useSigner();

	const handleClick = async () => {
		try {
			console.log('Signer: ', data, error, isLoading, refetch);
		} catch (error) {
			console.log(error);
		}
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
		</div>
	);
};

export default Home;
