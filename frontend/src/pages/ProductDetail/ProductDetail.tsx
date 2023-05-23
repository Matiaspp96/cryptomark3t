import { getProductByIdQuery } from '@/graphql';
import { Product } from '@/models';
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface ProductByIDQueryData {
	productCreated: any;
}

const ProductDetail: React.FC = () => {
	const params = useParams();
	const id = params['*'];
	const [product, setProduct] = useState<Product>();
	const getProductsData = useQuery<ProductByIDQueryData>(getProductByIdQuery, {
		variables: { id },
	});
	const adaptProducts = (data: Product) => {
		setProduct(data);
	};

	useEffect(() => {
		let isActive = true;
		if (getProductsData.data && isActive) {
			adaptProducts(getProductsData.data.productCreated);
		}
		return () => {
			isActive = false;
		};
	}, [getProductsData.data]);

	if (!product) return <h1>Loading...</h1>;

	return (
		<div className='px-6 xl:container mx-auto mb-10'>
			<h1>ProductDetail</h1>
			<img src={product.image} alt={product.name} />
			<p>
				{product.name} ${product.price}
			</p>
		</div>
	);
};

export default ProductDetail;
