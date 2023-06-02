import React from 'react';
import classNames from 'classnames';

interface SpinnerProps {
	className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ className = 'h-20 w-20' }) => {
	return (
		<div className='flex justify-center items-center my-auto mx-auto'>
			<div
				className={classNames(
					'animate-spin rounded-full border-t-2 border-b-2 border-pink-700',
					className
				)}
			></div>
		</div>
	);
};

export default Spinner;
