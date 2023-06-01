import TokenABI from '@/assets/abi/Token.json';
import Spinner from '@/components/Spinner/Spinner';
import { getEscrowByIdQuery } from '@/graphql';
import { Product } from '@/models';
import { useQuery } from '@apollo/client';
import { utils } from 'ethers';
import React, { useCallback, useEffect, useState } from 'react';
import { useContract, useSigner } from 'wagmi';

interface CardCheckoutProductProps {
	product: Product;
}

const CardCheckoutProduct: React.FC<CardCheckoutProductProps> = ({
	product,
}) => {
	const [escrowAddress, setEscrowAddress] = useState<`0x${string}`>('0x');
	const [tokenAddress, setTokenAddress] = useState<string>('');
	const [, setSeller] = useState<string>('');
	const [pay, setPay] = useState<boolean>(false);

	const { data, loading } = useQuery(getEscrowByIdQuery, {
		variables: { product_id: product.productId },
	});

	useEffect(() => {
		if (data) {
			setEscrowAddress(data.escrowCreateds[0].escrowAddress);
			setTokenAddress(data.escrowCreateds[0].token);
			setSeller(data.escrowCreateds[0].seller);
		}
	}, [data]);

	const amountToDelivery = 10;
	const amountToApprove = Number(product.price) + amountToDelivery;
	const { data: signer } = useSigner();
	const tokenContract = useContract({
		address: tokenAddress as `0x${string}`,
		abi: TokenABI.abi,
		signerOrProvider: signer,
	});
	const approve = useCallback(async () => {
		const result = await tokenContract
			?.connect(signer as any)
			.approve(escrowAddress, utils.parseEther(amountToApprove.toString()));
		await result?.wait();
		console.log(result);
		setPay(true);
		return result;
	}, [amountToApprove, amountToDelivery, escrowAddress, tokenAddress]);

	const handlePay = async () => {
		console.log('paying');
		try {
			await approve();
			console.log('paid');
		} catch (error) {
			console.log(error);
		}
	};

	if (loading) return <Spinner />;

	return (
		<div className='flex flex-col md:flex-row justify-between items-center w-1/2 bg-zinc-700 rounded-xl my-4'>
			<div className='flex flex-col md:flex-row justify-between items-center'>
				<img
					src={product.image}
					alt='product'
					className='w-36 h-36 rounded-lg object-cover'
				/>
				<div className='flex flex-col md:flex-row items-center w-full gap-4'>
					<h1 className='text-3xl font-bold text-foreground mb-4'>
						{product.name}
					</h1>
					<p className='text-3xl font-bold text-foreground mb-4'>
						${product.price}
					</p>
				</div>
				{!pay && (
					<button
						onClick={handlePay}
						// disabled={!writePay}
						className={
							loading
								? 'bg-gray-500 text-white font-bold py-2 px-4 rounded transition duration-300 w-full md:w-auto'
								: 'bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 w-full md:w-auto'
						}
					>
						{loading ? <Spinner /> : <span>Pagar</span>}
					</button>
				)}
			</div>
		</div>
	);
};

export default CardCheckoutProduct;
