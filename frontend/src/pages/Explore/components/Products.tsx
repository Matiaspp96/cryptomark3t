import { useFilters } from '@/hooks/useFilters';
import { useSorts } from '@/hooks/useSorts';
import { PublicRoutes } from '@/models';
import { AppStore } from '@/redux/store';
import { OpenInNewWindowIcon } from '@radix-ui/react-icons';
import { Icon } from '@radix-ui/react-select';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export type ProductsProps = {};

const Products: React.FC<ProductsProps> = () => {
	const { products } = useSelector((store: AppStore) => store.products);

	const { filterProducts } = useFilters();
	const { sortProducts } = useSorts();

	const filteredProducts = filterProducts(products);
	const sortedProducts = sortProducts(filteredProducts);

	return (
		<ul className='max-w-screen-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto gap-5'>
			{sortedProducts.map(product => {
				return (
					<li
						key={product.id}
						className='h-[430px] rounded-xl border border-zinc-700 bg-zinc-800 p-5 shadow-lg hover:shadow-xl transition duration hover:scale-[1.004]'
					>
						{product.isSold ? (
							<span className='absolute mt-1 ml-1 bg-rose-500 px-2 rounded-md font-bold text-sm'>
								Vendido
							</span>
						) : (
							<span className='absolute mt-1 ml-1 bg-emerald-500 px-2 rounded-md font-bold text-sm'>
								Disponible
							</span>
						)}
						<div className='hidden md:block'>
							<Link
								to={`${PublicRoutes.PRODUCT}/${product.id}`}
								className='h-48'
							>
								<img
									src={product.image}
									alt={product.name}
									className='aspect-video object-cover rounded-lg h-48'
								/>
							</Link>
						</div>

						<div className='md:hidden'>
							<img
								src={product.image}
								alt={product.name}
								className='aspect-video object-cover rounded-lg h-48'
							/>
						</div>

						<div className='flex flex-col h-48 justify-between'>
							<div className='flex flex-col justify-between'>
								<div className='flex items-center justify-between'>
									<h2 className='my-2 line-clamp-1 text-xl font-breul'>
										{product.name}
									</h2>
									<Link to={`${PublicRoutes.PRODUCT}/${product.id}`}>
										<Icon className='text-zinc-400'>
											<OpenInNewWindowIcon className='w-5 h-5' />
										</Icon>
									</Link>
								</div>
								<div className='flex items-center'>
									<p className='line-clamp-4'>{product.description}</p>
								</div>
							</div>
							<div className='flex items-center justify-between mt-2'>
								<p className='text-md font-bold relative '>$ {product.price}</p>
								<button className='bg-zinc-900 font-breul text-white px-3 py-1 rounded-md hover:bg-zinc-600 transition duration-300'>
									Add to cart
								</button>
							</div>
						</div>
					</li>
				);
			})}
		</ul>
	);
};

export default Products;
