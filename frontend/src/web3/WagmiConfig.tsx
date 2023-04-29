import React from 'react';

// WAGMI Libraries
import { WagmiConfig as Wagmi, configureChains, createClient } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';

import Web3AuthConnectorInstance from './_Web3AuthConnectorInstance';

const { chains, provider, webSocketProvider } = configureChains(
	[polygonMumbai],
	[alchemyProvider({ apiKey: '' })]
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
