import { PublicRoutes } from '@/models';
import { AppStore } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

interface AutoCompleteProps {
	searchQuery: string;
	onSuggestionSelect: (suggestion: string) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
	searchQuery,
	onSuggestionSelect,
}) => {
	const { products } = useSelector((store: AppStore) => store.products);

	// no repetir productos con el mismo nombre

	const filteredProducts = products
		.filter(product =>
			product.name.toLowerCase().includes(searchQuery.toLowerCase())
		)
		.filter(
			(product, index, self) =>
				index === self.findIndex(p => p.name === product.name)
		)
		.slice(0, 5);

	return (
		<ul
			className={
				searchQuery.length > 0
					? 'w-1/4 lg:w-1/3 2xl:w-1/2 bg-zinc-700 rounded-md shadow-lg absolute z-10 top-12'
					: 'hidden'
			}
		>
			{filteredProducts.map(product => {
				return (
					<li
						key={product.id}
						className='p-2 hover:bg-zinc-600 cursor-pointer '
						onClick={() => onSuggestionSelect(product.name)}
					>
						<Link
							className='flex items-center gap-2 rounded-md justify-between hover:text-emerald-500'
							to={`${PublicRoutes.PRODUCT}/${product.id}`}
						>
							<div className='flex items-center gap-2'>
								<img
									src={product.image}
									alt={product.name}
									className='w-10 h-10 rounded-full object-cover'
								/>
								<span className='line-clamp-1'>{product.name}</span>
							</div>
							<span
								className='
                                text-emerald-500 font-bold
                            '
							>
								${product.price}
							</span>
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default AutoComplete;
