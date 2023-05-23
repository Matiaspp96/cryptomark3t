import React, { useState } from 'react';
import AutoComplete from './AutoComplete';

const SearchBar = () => {
	const [searchValue, setSearchValue] = useState<string>('');

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	const handleSuggestionSelect = (suggestion: string) => {
		setSearchValue(suggestion);
	};

	return (
		<form className='hidden relative md:flex items-center w-1/4 lg:w-1/3 2xl:w-1/2'>
			<div className='relative w-full'>
				<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none '>
					<svg
						aria-hidden='true'
						className='w-5 h-5 text-gray-500 dark:text-gray-400'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							fillRule='evenodd'
							d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
							clipRule='evenodd'
						></path>
					</svg>
				</div>
				<input
					type='text'
					value={searchValue}
					onChange={handleSearchChange}
					placeholder='Buscar...'
					id='voice-search'
					className='bg-zinc-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:border-zinc-700  dark:bg-zinc-800 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:outline-none dark:focus:border-blue-500'
					required
				/>
				<button
					type='button'
					className='absolute inset-y-0 right-0 flex items-center pr-3'
				>
					<svg
						aria-hidden='true'
						className='w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							fillRule='evenodd'
							d='M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z'
							clipRule='evenodd'
						></path>
					</svg>
				</button>
			</div>
			<button
				type='submit'
				className='mx-2 relative justify-center p-0.5 text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'
			>
				<div className='inline-flex items-center relative px-4 py-2 transition-all ease-in duration-100 bg-white dark:bg-zinc-800 rounded-md group-hover:bg-opacity-0 font-breul text-base xl:text-lg'>
					<svg
						aria-hidden='true'
						className='w-5 h-5 xl:mr-2 xl:-ml-1'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
						></path>
					</svg>
					<span className='hidden xl:block '>Buscar</span>
				</div>
			</button>
			<AutoComplete
				searchQuery={searchValue}
				onSuggestionSelect={handleSuggestionSelect}
			/>
		</form>
	);
};

export default SearchBar;
