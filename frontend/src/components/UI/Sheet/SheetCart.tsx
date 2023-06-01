import { useCart } from '@/hooks/useCart';
import { PrivateRoutes, PublicRoutes } from '@/models';
import { AppStore } from '@/redux/store';
import { TrashIcon } from '@radix-ui/react-icons';
import { BsCart3 } from 'react-icons/bs';
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from './Sheet';
import { Connector, useAccount, useConnect } from 'wagmi';

interface SheetCartProps {
	children: ReactNode;
}

const SheetCart: React.FC<SheetCartProps> = ({ children }) => {
	const { removeProduct, resetCart } = useCart();
	const { cart } = useSelector((store: AppStore) => store.cart);
	const account = useAccount();
	const { connect, connectors } = useConnect();
	const connectorWallet = connectors[0];

	const handleConnect = async (connector: Connector) => {
		try {
			connect({ connector });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent
				className='flex flex-col space-y-4 bg-zinc-800 rounded-l-xl border-zinc-700 w-10/12 xl:w-1/3 '
				size='default'
			>
				<SheetHeader>
					<SheetTitle>Carrito</SheetTitle>
					<SheetDescription>{cart.length} productos</SheetDescription>
				</SheetHeader>
				<div className='flex flex-col items-start h-full gap-4 overflow-y-auto'>
					{cart.map(product => (
						<div
							key={product.id}
							className='flex w-full items-center justify-between'
						>
							<Link
								className='flex items-center w-3/4 text-left gap-4'
								to={`${PublicRoutes.PRODUCT}/${product.id}`}
							>
								<img
									src={product.image}
									alt={product.name}
									className='w-16 h-16 rounded-lg object-cover'
								/>
								<div className='flex flex-col'>
									<span className='text-sm font-bold text-gray-100 line-clamp-1 xl:line-clamp-2'>
										{product.name}
									</span>
									<span className='text-xs text-gray-400 line-clamp-1 xl:line-clamp-2'>
										{product.description}
									</span>
								</div>
							</Link>
							<div className='flex items-center space-x-2'>
								<span className='text-sm font-bold text-gray-100'>
									$ {product.price}
								</span>
								<button
									className='text-gray-400 hover:text-gray-100'
									onClick={() => removeProduct(product.id)}
								>
									<TrashIcon />
								</button>
							</div>
						</div>
					))}
				</div>
				{/* Checkout */}
				<SheetFooter>
					<div className='flex flex-col items-center justify-between w-full gap-4'>
						<div className='flex items-center justify-between w-full'>
							<span className='text-2xl font-bold text-gray-100'>Total:</span>
							<span className='text-2xl font-bold text-gray-100'>
								$ {cart.reduce((acc, curr) => acc + Number(curr.price), 0)}
							</span>
						</div>
						{cart.length === 0 ? (
							<span className='text-md font-bold text-gray-100 w-full'>
								No hay productos en el carrito
							</span>
						) : (
							<div className='flex items-center justify-center w-full gap-4'>
								<button
									className='flex items-center justify-center w-1/3 px-4 py-2 text-sm font-medium text-white border border-orange-600 rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:pointer-events-none data-[state=open]:bg-orange-600'
									onClick={() => resetCart()}
								>
									Limpiar carrito
									<TrashIcon className='w-4 h-4 ml-2' />
								</button>
								{account.isConnected ? (
									<Link
										to={`${PrivateRoutes.ROOT}${PrivateRoutes.CHECKOUT}`}
										className={
											'flex items-center justify-center w-2/3 px-4 py-2 text-sm font-medium text-white bg-rose-600 bg-opacity-100 border border-transparent rounded-md shadow-sm hover:bg-rose-600/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:pointer-events-none data-[state=open]:bg-orange-600'
										}
									>
										Checkout
										<BsCart3 className='w-4 h-4 ml-2' />
									</Link>
								) : (
									<button
										className='flex items-center justify-center w-2/3 px-4 py-2 text-sm font-medium text-white bg-rose-600 bg-opacity-100 border border-transparent rounded-md shadow-sm hover:bg-rose-600/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:pointer-events-none data-[state=open]:bg-orange-600'
										onClick={() => handleConnect(connectorWallet)}
									>
										Conectar wallet
									</button>
								)}
							</div>
						)}
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default SheetCart;
