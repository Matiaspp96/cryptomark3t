import { Navigate, Outlet } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { PrivateRoutes, PublicRoutes } from '../models';

interface Props {
	privateValidation: boolean;
}

const PrivateValidationFragment = <Outlet />;
const PublicValidationFragment = <Navigate replace to={PrivateRoutes.ROOT} />;

export const AuthGuard = ({ privateValidation }: Props) => {
	const account = useAccount();
	return account.address ? (
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
