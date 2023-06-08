import React from 'react';
import './Layout.css';
import Spinner from '../Spinner/Spinner';

export type LoaderProps = {};

const Loader: React.FC<LoaderProps> = () => {
	return (
		<main className='flex flex-col h-full md:w-screen gradient-bg'>
			<Spinner />
		</main>
	);
};

export default Loader;
