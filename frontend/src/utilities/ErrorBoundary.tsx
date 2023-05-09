import { PublicRoutes } from '@/models';
import { Link } from 'react-router-dom';

const ErrorBoundary = () => {
	return (
		<div className='flex flex-col items-center justify-center w-screen h-screen text-9xl text-gray-900 dark:text-gray-100 font-bold font-breul gradient-bg'>
			<Link
				className='absolute top-10 left-10 px-4 py-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white dark:hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 '
				to={PublicRoutes.ROOT}
			>
				Back
			</Link>
			<div className='text-9xl'>Error: Not Found</div>
		</div>
	);
};
export default ErrorBoundary;
