import { useAsync } from '@/hooks/useAsync';
import useFetchAndLoad from '@/hooks/useFetchAndLoad';
import { getCategories } from '@/redux/states/categories';
import { getProducts } from '@/redux/states/products';
import { getCategoriesApi, getProductsApi } from '@/services/public.services';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Products } from './components';
import Filter from './components/Filter';
import Sort from './components/Sort';

export type ExploreProps = {};

const Explore: React.FC<ExploreProps> = () => {
	const { loading, callEndpoint } = useFetchAndLoad();
	const dispatch = useDispatch();

	/* Get Products */
	const getProductsData = async () => await getProductsApi();
	const adaptProducts = (data: any) => {
		dispatch(getProducts(data));
	};
	useAsync(getProductsData, adaptProducts, () => {});

	/* Get Categories */
	const getCategoriesData = async () => await getCategoriesApi();
	const adaptCategories = (data: any) => {
		dispatch(getCategories(data));
	};
	useAsync(getCategoriesData, adaptCategories, () => {});

	return (
		<div className='container mx-auto mb-10'>
			<div className='flex gap-5'>
				<div className='w-min flex flex-col gap-5'>
					<Filter />
					<Sort />
				</div>
				{loading ? <h1>Loading...</h1> : <Products />}
			</div>
		</div>
	);
};

export default Explore;
