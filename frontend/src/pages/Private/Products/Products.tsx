import Spinner from '@/components/Spinner/Spinner';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/components/UI/Tabs/Tabs';
import { getProductsBySeller } from '@/graphql';
import { Product } from '@/models';
import { AppStore } from '@/redux/store';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CardProductSeller from './components/CardProductSeller';

const Products = () => {
	const { walletAddress } = useSelector((store: AppStore) => store.user);
	const [productsOnSale, setProductsOnSale] = useState<Product[]>([]);

	const { loading: loadingProductsOnSale } = useQuery(getProductsBySeller, {
		variables: { product_seller: walletAddress },
		onCompleted: data => {
			const products = data?.escrowCreateds.map(adapterProduct);
			console.log(products);
			setProductsOnSale(products);
		},
	});

	const adapterProduct = (product: any): Partial<Product> => {
		return {
			productId: product.product_id,
			isSold: product.product_isSold,
			name: product.product_name,
			price: product.product_price,
			image: product.product_image,
			description: product.product_description,
			category: product.product_category,
			escrowAddress: product.escrowAddress,
		};
	};

	return (
		<div className='container mx-auto px-4 py-6'>
			<Tabs defaultValue='seller' className='container'>
				<TabsList className='flex w-full gap-8 mb-4'>
					<TabsTrigger
						value='seller'
						className='text-4xl border-b-2 border-transparent focus:border-blue-500'
					>
						Panel Rol Vendedor
					</TabsTrigger>
					<TabsTrigger
						value='delivery'
						className='text-4xl border-b-2 border-transparent focus:border-blue-500'
					>
						Panel Rol Delivery
					</TabsTrigger>
				</TabsList>
				<TabsContent
					value='seller'
					className='container mx-auto py-4 bg-zinc-700/60 rounded-lg min-h-[50vh]'
				>
					<p className='text-xl font-bold mb-4 text-center w-full px-4'>
						Administra tus productos y realiza un seguimiento de tus ventas en
						el rol de vendedor. Publica nuevos productos, edita los existentes y
						mantén un control sobre tus ingresos.
					</p>
					{productsOnSale.length > 0 ? (
						productsOnSale.map(product => (
							<CardProductSeller product={product} key={product.productId} />
						))
					) : loadingProductsOnSale ? (
						<Spinner />
					) : (
						<p className='text-xl font-bold mb-4 text-center w-full px-4'>
							No tienes productos en venta.
						</p>
					)}
				</TabsContent>
				<TabsContent
					value='delivery'
					className='container mx-auto py-4 bg-zinc-700/60 rounded-lg min-h-[50vh]'
				></TabsContent>
			</Tabs>
		</div>
	);
};
export default Products;
