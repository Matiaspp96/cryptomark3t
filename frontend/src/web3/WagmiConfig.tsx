import React from 'react';

// WAGMI Libraries
import { WagmiConfig as Wagmi, createClient, configureChains } from 'wagmi';
import { mainnet, polygon, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import Web3AuthConnectorInstance from './_Web3AuthConnectorInstance';

const { chains, provider, webSocketProvider } = configureChains(
	[polygonMumbai],
	[publicProvider()]
);

const client = createClient({
	autoConnect: true,
	connectors: [Web3AuthConnectorInstance(chains)],
	provider,
	webSocketProvider,
});

type WagmiConfigProps = {
	children: React.ReactNode;
};

const WagmiConfig: React.FC<WagmiConfigProps> = ({ children }) => {
	return <Wagmi client={client}>{children}</Wagmi>;
};

export default WagmiConfig;
