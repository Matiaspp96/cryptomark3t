import { AppStore } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from '../models';

interface Props {
	privateValidation: boolean;
}

const PrivateValidationFragment = <Outlet />;
const PublicValidationFragment = <Navigate replace to={PrivateRoutes.ROOT} />;

export const AuthGuard = ({ privateValidation }: Props) => {
	const userState = useSelector((store: AppStore) => store.user);
	console.log(userState.walletAddress, 'userState.walletAddress');
	return userState.walletAddress ? (
		privateValidation ? (
			PrivateValidationFragment
		) : (
			PublicValidationFragment
		)
	) : (
		<Navigate replace to={PublicRoutes.ROOT} />
	);
};

export default AuthGuard;
