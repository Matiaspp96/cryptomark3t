import './App.css';

import { Provider } from 'react-redux';
import store from './redux/store.ts';
import WagmiConfig from './web3/WagmiConfig.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from '@/components/Layout/Layout.tsx';
import Home from '@/pages/Home/Home.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
		],
	},
]);

const App = () => {
	return (
		<Provider store={store}>
			<WagmiConfig>
				<RouterProvider router={router} />
			</WagmiConfig>
		</Provider>
	);
};

export default App;
