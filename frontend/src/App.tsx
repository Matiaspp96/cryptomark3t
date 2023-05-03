import './App.css';

import { lazy } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import store from '@/redux/store.ts';
import WagmiConfig from '@/web3/WagmiConfig.tsx';

import { PublicRoutes } from '@/models';
import Layout from '@/components/Layout/Layout.tsx';
const Home = lazy(async () => await import('@/pages/Home/Home.tsx'));
const Favorites = lazy(
	async () => await import('@/pages/Favorites/Favorites.tsx')
);
const ErrorBoundary = lazy(
	async () => await import('@/utilities/ErrorBoundary.tsx')
);

const router = createBrowserRouter([
	{
		path: PublicRoutes.ROOT,
		element: <Layout />,
		errorElement: <ErrorBoundary />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: PublicRoutes.EXPLORE,
				element: <div>Explore</div>,
			},
			{
				path: PublicRoutes.FAVORITES,
				element: <Favorites />,
			},
			{
				path: PublicRoutes.ABOUT,
				element: <div>About</div>,
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
