import React from 'react';

const Spinner: React.FC = () => {
	return (
		<div className='flex justify-center items-center my-auto mx-auto'>
			<div
				className='animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-pink-700
			'
			></div>
		</div>
	);
};

export default Spinner;
