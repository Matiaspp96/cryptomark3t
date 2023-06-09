import Spinner from '@/components/Spinner/Spinner';
import { getProductsQuery } from '@/graphql';
import { useAsync } from '@/hooks/useAsync';
import { Product } from '@/models';
import { getCategories } from '@/redux/states/categories';
import { getProducts } from '@/redux/states/products';
import { getCategoriesApi } from '@/services/public.services';
import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Products } from './components';
import Filter from './components/Filter';
import Sort from './components/Sort';

export type ExploreProps = {};

interface ProductsQueryData {
	productCreateds: Product[];
}

const Explore: React.FC<ExploreProps> = () => {
	const dispatch = useDispatch();

	/* Get Products */
	const getProductsData = useQuery<ProductsQueryData>(getProductsQuery);
	const adaptProducts = (data: any) => {
		dispatch(getProducts(data));
	};

	useEffect(() => {
		let isActive = true;
		if (getProductsData.data && isActive) {
			adaptProducts(getProductsData.data.productCreateds);
		}
		return () => {
			isActive = false;
		};
	}, [getProductsData.data]);

	/* Get Categories */
	const getCategoriesData = async () => await getCategoriesApi();
	const adaptCategories = (data: any) => {
		dispatch(getCategories(data));
	};
	useAsync(getCategoriesData, adaptCategories, () => {});

	return (
		<div className='px-6 w-screen xl:container mx-auto mb-10'>
			<div className='flex flex-col md:flex-row gap-5'>
				<div className='w-full flex gap-2 md:flex md:w-min md:flex-col md:gap-5'>
					<Filter />
					<Sort />
				</div>
				{getProductsData.loading ? <Spinner /> : <Products />}
			</div>
		</div>
	);
};

export default Explore;
