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
		console.log(data);
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
		<div className='px-6 xl:container mx-auto mb-10' style={{ width: '100%' }}>
			<br />
			<h1>Product Detail:</h1>
			<br />
			<br />
			<figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
				<div className="pt-6 md:p-8">
					<img className='rounded float-start' src={product.image} alt={product.name} />
				</div>
				<div className="pt-6 md:p-8 text-center md:text-left space-y-4" style={{ position: 'relative' }}>
					<blockquote>
						<h1 className='text-black'>
							{product.name}
						</h1>
						<hr style={{ border: '0.01px solid #2a5880'}}></hr>
						<br />
						<div className="md: p-2">
							<p className='text-black'> 
								{product.description}
							</p>
						</div>
					</blockquote>
					<br />
					<br />
					<figcaption className="font-medium" style={{ position: 'absolute', bottom: '2em', width: '100%'}}>
						<hr style={{ border: '0.01px solid #2a5880', marginRight: '4em' }}></hr>				
						<div className="text-sky-501 dark:text-sky-500 text-2xl font-semibold">
							Price: ${product.price}
						</div>
					</figcaption>
				</div>
			</figure>

		</div>
	);
};

export default ProductDetail;