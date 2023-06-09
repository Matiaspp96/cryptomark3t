import './App.css';

import store from '@/redux/store.ts';
import WagmiConfig from '@/web3/WagmiConfig.tsx';
import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';

import Layout from '@/components/Layout/Layout.tsx';
import { AuthGuard } from '@/guard';
import { PrivateRoutes, PublicRoutes } from '@/models';
import { ApolloProvider } from '@apollo/client';
import Loader from '@/components/Layout/Loader';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import { clientMumbai as client } from './providers/apolloClient';

const Home = lazy(async () => await import('@/pages/Home/Home.tsx'));
const Favorites = lazy(
	async () => await import('@/pages/Favorites/Favorites.tsx')
);
const Explore = lazy(async () => await import('@/pages/Explore/Explore.tsx'));
const Private = lazy(async () => await import('@/pages/Private/Private.tsx'));
const Publish = lazy(async () => await import('@/pages/Private/Publish/Publish.tsx'));
const ErrorBoundary = lazy(
	async () => await import('@/utilities/ErrorBoundary.tsx')
);

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path={PublicRoutes.ROOT} element={<Layout />}>
			<Route index element={<Home />} />
			<Route path={PublicRoutes.EXPLORE} element={<Explore />} />
			<Route path={`${PublicRoutes.PRODUCT}/*`} element={<ProductDetail />} />
			<Route path={PublicRoutes.FAVORITES} element={<Favorites />} />
			<Route path={PublicRoutes.ABOUT} element={<div>About</div>} />
			<Route path={PublicRoutes.PUBLISH} element={<Publish />} /> //addAuth


			<Route element={<AuthGuard privateValidation={true} />}> 
				<Route path={`${PrivateRoutes.ROOT}/*`} element={<Private />} />
			 </Route>
			<Route path='*' element={<ErrorBoundary />} />
		</Route>
	)
);

const App = () => {
	return (
		<Provider store={store}>
			<ApolloProvider client={client}>
				<WagmiConfig>
					<Suspense fallback={<Loader />}>
						<RouterProvider router={router} />
					</Suspense>
				</WagmiConfig>
			</ApolloProvider>
		</Provider>
	);
};

export default App;
