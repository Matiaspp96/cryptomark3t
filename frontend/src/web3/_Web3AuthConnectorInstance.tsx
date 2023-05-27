// Web3Auth Libraries
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector';
import { Web3Auth } from '@web3auth/modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { CHAIN_NAMESPACES } from '@web3auth/base';
import { TorusWalletConnectorPlugin } from '@web3auth/torus-wallet-connector-plugin';
import { Chain } from 'wagmi';

export default function Web3AuthConnectorInstance(chains: Chain[]) {
	const name = 'Crypto Mark3t';
	const iconUrl = 'https://web3auth.io/docs/contents/logo-ethereum.png';
	const web3AuthInstance = new Web3Auth({
		clientId:
			'BAn9j1A-NcXeIboH6LdNo7SACD5xIrrOB4s-_s_Yu9X19XmRr61nZGoFl3bY4inrq0yz41ZYva8x6s4J_ib9VmY',
		chainConfig: {
			chainNamespace: CHAIN_NAMESPACES.EIP155,
			chainId: '0x' + chains[0].id.toString(16),
			rpcTarget: chains[0].rpcUrls.default.http[0],
			displayName: chains[0].name,
			tickerName: chains[0].nativeCurrency?.name,
			ticker: chains[0].nativeCurrency?.symbol,
		},
		uiConfig: {
			appName: name,
			theme: 'dark',
			loginMethodsOrder: ['google', 'facebook'],
			defaultLanguage: 'es',
			appLogo: 'https://web3auth.io/images/w3a-L-Favicon-1.svg',
			modalZIndex: '2147483647',
		},
	});

	const openloginAdapterInstance = new OpenloginAdapter({
		adapterSettings: {
			network: 'testnet',
			uxMode: 'popup',
			whiteLabel: {
				name: 'Crypto Mark3t',
				logoLight: 'https://web3auth.io/images/w3a-L-Favicon-1.svg',
				logoDark: 'https://web3auth.io/images/w3a-D-Favicon-1.svg',
				defaultLanguage: 'en',
				dark: true,
			},
		},
	});
	web3AuthInstance.configureAdapter(openloginAdapterInstance);

	const torusPlugin = new TorusWalletConnectorPlugin({
		torusWalletOpts: {
			buttonPosition: 'bottom-left',
		},
		walletInitOptions: {
			whiteLabel: {
				theme: { isDark: true, colors: { primary: '#00a8ff' } },
				logoDark: iconUrl,
				logoLight: iconUrl,
			},
			useWalletConnect: true,
			enableLogging: true,
		},
	});
	web3AuthInstance.addPlugin(torusPlugin);

	return {
		Web3Auth: new Web3AuthConnector({
			chains: chains as any,
			options: {
				web3AuthInstance,
			},
		}),
		getUserInfo: async () => {
			const userInfo = await web3AuthInstance?.getUserInfo();
			return userInfo;
		},
	};
}
