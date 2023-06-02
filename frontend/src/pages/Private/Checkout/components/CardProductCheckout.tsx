import EscrowABI from '@/assets/abi/Escrow.json';
import TokenABI from '@/assets/abi/Token.json';
import Spinner from '@/components/Spinner/Spinner';
import { getEscrowByIdQuery } from '@/graphql';
import { Product } from '@/models';
import { useQuery } from '@apollo/client';
import { utils } from 'ethers';
import React, { useCallback, useEffect, useState } from 'react';
import { useAccount, useContract, useProvider, useSigner } from 'wagmi';

interface CardCheckoutProductProps {
	product: Product;
}

const CardCheckoutProduct: React.FC<CardCheckoutProductProps> = ({
	product,
}) => {
	const [escrowAddress, setEscrowAddress] = useState<`0x${string}`>('0x');
	const [tokenAddress, setTokenAddress] = useState<string>('');
	const [, setSeller] = useState<string>('');
	const [hasPay, setHasPay] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const { data, loading: loadingQuery } = useQuery(getEscrowByIdQuery, {
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
	const account = useAccount();
	const provider = useProvider();

	/* Contracts */
	const tokenContract = useContract({
		address: tokenAddress as `0x${string}`,
		abi: TokenABI.abi,
		signerOrProvider: provider,
	});

	const escrowContract = useContract({
		address: escrowAddress as `0x${string}`,
		abi: EscrowABI.abi,
		signerOrProvider: provider,
	});

	const approve = useCallback(async () => {
		const result = await tokenContract
			?.connect(signer as any)
			.approve(escrowAddress, utils.parseEther(amountToApprove.toString()));
		await result?.wait();
		return result;
	}, [amountToApprove, amountToDelivery, escrowAddress, tokenAddress]);

	const pay = useCallback(async () => {
		const result = await escrowContract
			?.connect(signer as any)
			.pay(account.address, utils.parseEther(amountToDelivery.toString()));
		await result?.wait();
		console.log('Pay:', result);
		return result;
	}, [escrowAddress, tokenAddress]);

	const hasPayEscrow = useCallback(async () => {
		const result = await escrowContract?.status();
		setHasPay(result);
		return result;
	}, [escrowAddress, tokenAddress]);

	useEffect(() => {
		hasPayEscrow();
	}, [escrowAddress, tokenAddress]);

	const handlePay = async () => {
		console.log('paying');
		setLoading(true);
		try {
			await approve();
			await pay();
			console.log('paid');
			setHasPay(true);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	if (loadingQuery) return <Spinner />;

	return (
		<div className='flex flex-col md:flex-row justify-between items-center w-full bg-zinc-700 rounded-xl my-4'>
			<div className='flex flex-col md:flex-row justify-between items-center w-full m-2'>
				<img
					src={product.image}
					alt='product'
					className='w-36 h-36 rounded-lg object-cover'
				/>
				<div className='flex flex-col w-full mx-4 justify-between h-32'>
					<h3 className='text-2xl font-bold text-foreground w-9/12 font-montserrat'>
						{product.name}
					</h3>
					<div className='flex flex-row justify-between w-full'>
						<p className='text-3xl font-bold text-foreground'>
							${product.price}
						</p>
						{!hasPay ? (
							<div className='relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'>
								<button
									onClick={handlePay}
									className='relative md:text-2xl hover:text-white px-5 py-2 transition-all ease-in duration-100 bg-white dark:bg-zinc-800 rounded-md group-hover:bg-opacity-0 font-breul'
								>
									{loading ? (
										<Spinner className='h-7 w-7' />
									) : (
										<span className='text-lg'>Pagar</span>
									)}
								</button>
							</div>
						) : (
							<div className='relative inline-flex md:text-lg items-center justify-center px-5 py-2 font-medium rounded-lg font-breul bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 select-none hover:bg-opacity-80'>
								Pagado
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardCheckoutProduct;
