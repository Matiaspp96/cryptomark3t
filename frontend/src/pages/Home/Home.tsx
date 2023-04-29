import React from 'react';
import { useProvider } from 'wagmi';

export type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
	const provider = useProvider();
	console.log(provider);
	return <div>Home</div>;
};

export default Home;
