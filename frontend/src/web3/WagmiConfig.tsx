import React from 'react';

// WAGMI Libraries
import { WagmiConfig as Wagmi, configureChains, createClient } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';

import Web3AuthConnectorInstance from './_Web3AuthConnectorInstance';

const { chains, provider } = configureChains(
	[polygonMumbai],
	[alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_API_KEY as string })]
);

export const { Web3Auth, getUserInfo } = Web3AuthConnectorInstance(chains);

const client = createClient({
	autoConnect: true,
	connectors: [Web3Auth],
	provider,
});

type WagmiConfigProps = {
	children: React.ReactNode;
};

const WagmiConfig: React.FC<WagmiConfigProps> = ({ children }) => {
	return <Wagmi client={client}>{children}</Wagmi>;
};

export default WagmiConfig;
