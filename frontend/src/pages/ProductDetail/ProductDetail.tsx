import EscrowABI from '@/assets/abi/Escrow.json';
import Spinner from '@/components/Spinner/Spinner';
import SheetCart from '@/components/UI/Sheet/SheetCart';
import { getEscrowByIdQuery, getProductByIdQuery } from '@/graphql';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/models';
import { useQuery } from '@apollo/client';
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useContract, useProvider } from 'wagmi';

interface ProductByIDQueryData {
	productCreated: any;
}

const ProductDetail: React.FC = () => {
	const params = useParams();
	const id = params['*'];
	const provider = useProvider();
	const [escrowAddress, setEscrowAddress] = useState<`0x${string}`>('0x');
	const [hasPay, setHasPay] = useState<boolean>(false);
	const [product, setProduct] = useState<Product>();
	const getProductsData = useQuery<ProductByIDQueryData>(getProductByIdQuery, {
		variables: { id },
	});
	const adaptProducts = (data: Product) => {
		setProduct(data);
	};
	const { addProduct } = useCart();
	useQuery(getEscrowByIdQuery, {
		variables: { product_id: product?.productId },
		onCompleted: data => {
			setEscrowAddress(data.escrowsCreateds[0].escrowAddress);
		},
	});

	const escrowContract = useContract({
		address: escrowAddress as `0x${string}`,
		abi: EscrowABI.abi,
		signerOrProvider: provider,
	});

	const hasPayEscrow = useCallback(async () => {
		const result = await escrowContract?.status();
		setHasPay(result);
		return result;
	}, [escrowAddress]);

	useEffect(() => {
		hasPayEscrow();
	}, [escrowAddress]);

	useEffect(() => {
		let isActive = true;
		if (getProductsData.data && isActive) {
			adaptProducts(getProductsData.data.productCreated);
		}
		return () => {
			isActive = false;
		};
	}, [getProductsData.data]);

	if (!product) return <Spinner />;

	return (
		<div
			className='container mb-10 flex bg-slate-100 rounded-xl py-4 gap-8 dark:bg-slate-800 h-auto mx-auto px-6'
			style={{ backgroundColor: '#27272a' }}
		>
			<img
				className='rounded float-start aspect-video overflow-hidden h-72 object-contain'
				src={product.image}
				alt={product.name}
			/>
			<div className='text-center md:text-left flex flex-col justify-between w-full gap-8'>
				<blockquote>
					<h1 className='text-white border-b-2 border-[#2a5880]'>
						{product.name}
					</h1>
					<div className='my-4'>
						<h2 className='text-white'>Descripción:</h2>
						<p className='text-white'>{product.description}</p>
					</div>
				</blockquote>
				<figcaption
					className='font-medium flex border-t-2 border-[#2a5880] justify-between'
					style={{ width: '100%' }}
				>
					<div className='text-sky-501 dark:text-sky-500 text-2xl font-semibold'>
						Precio: ${product.price}
					</div>
					<div className='text-sky-501 dark:text-sky-500 text-2xl font-semibold'>
						Vendedor:{' '}
						{`${product.seller.slice(0, 10)}...${product.seller.slice(-10)}`}
					</div>
				</figcaption>
				{!hasPay ? (
					<SheetCart>
						<button
							className='bg-emerald-600 font-breul text-white w-max px-3 py-2 text-xl rounded-md hover:bg-emerald-700 transition duration-300'
							onClick={() => {
								addProduct(product);
							}}
						>
							Agregar al carrito
						</button>
					</SheetCart>
				) : (
					<span className='bg-purple-700 font-breul text-white w-max px-3 py-2 text-xl rounded-md hover:bg-purple-800 transition duration-300 select-none'>
						Ya ha sido comprado
					</span>
				)}
			</div>
		</div>
	);
};

export default ProductDetail;
