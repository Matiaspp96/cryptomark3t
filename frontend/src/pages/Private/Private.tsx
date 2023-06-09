import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoutes } from '@/models';

const Products = lazy(() => import('./Products/Products'));
const Profile = lazy(() => import('./Profile/Profile'));
const Publish = lazy(() => import('./Publish/Publish'));

function Private() {
	return (
		<Routes>
			<Route path={PrivateRoutes.PRODUCTS} element={<Products />} />
			<Route path={PrivateRoutes.PROFILE} element={<Profile />} />
			<Route path={PrivateRoutes.PUBLISH} element={<Publish />} />
		</Routes>
	);
}
export default Private;
