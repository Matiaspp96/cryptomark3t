import { AppStore } from '@/redux/store';
import { useSelector } from 'react-redux';
import CardCheckoutProduct from './components/CardProductCheckout';

const Checkout = () => {
	const { cart } = useSelector((store: AppStore) => store.cart);

	return (
		<div className='px-6 w-screen xl:container mx-auto mb-10'>
			<div className='flex flex-col justify-between items-center'>
				<h1 className='text-3xl font-bold text-foreground mb-4'>Checkout</h1>
				{cart.length > 0 &&
					cart.map(product => (
						<CardCheckoutProduct product={product} key={product.id} />
					))}
			</div>
		</div>
	);
};

export default Checkout;
