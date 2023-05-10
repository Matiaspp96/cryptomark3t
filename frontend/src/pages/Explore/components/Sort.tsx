import { SortBy } from '@/models/sort.model';
import { sortProductsBy } from '@/redux/states/products';
import { capitalizeFirstLetter } from '@/utilities/utils';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { useDispatch } from 'react-redux';

export default function Sort() {
	const dispatch = useDispatch();

	const handleSortChange = (e: string) => {
		dispatch(sortProductsBy(e));
	};

	const sorts = [
		SortBy.LOWEST,
		SortBy.HIGHEST,
		SortBy.TOP_RATED,
		SortBy.NEWEST,
	];

	return (
		<div className='flex-col bg-zinc-800 p-5 h-min rounded-xl'>
			<h2 className='font-bold text-2xl pb-4'>Sorts</h2>
			<form className='flex flex-col gap-4'>
				<RadioGroup.Root
					className='flex flex-col gap-2.5'
					defaultValue='default'
					aria-label='View density'
					onValueChange={e => handleSortChange(e)}
				>
					<h3 className='text-m font-bold pb-1'>Sort By</h3>
					{sorts.map(sort => {
						return (
							<div className='flex items-center' key={sort}>
								<RadioGroup.Item
									className='bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-black hover:bg-violet-500 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default'
									value={sort}
									id={`r${sort}`}
								>
									<RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-violet-300" />
								</RadioGroup.Item>
								<label
									className='text-white text-[15px] leading-none pl-[15px]'
									htmlFor={`r${sort}`}
								>
									{capitalizeFirstLetter(sort)}
								</label>
							</div>
						);
					})}
				</RadioGroup.Root>
			</form>
		</div>
	);
}
