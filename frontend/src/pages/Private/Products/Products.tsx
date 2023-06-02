import { AppStore } from '@/redux/store';
import { useSelector } from 'react-redux';

const Products = () => {
	const { walletAddress } = useSelector((store: AppStore) => store.user);
	console.log(walletAddress);

	return <div>Products</div>;
};
export default Products;
