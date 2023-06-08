import { selectMaxPriceByCategory } from '@/redux/selector/maxPriceByCategory';
import {
	filterProductsByCategory,
	filterProductsByMinPrice,
	searchProducts,
} from '@/redux/states/products';
import { AppStore } from '@/redux/store';
import { capitalizeFirstLetter } from '@/utilities/utils';
import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Slider from '@radix-ui/react-slider';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectComponent from './Select';

export default function Filter() {
	const { categories } = useSelector((store: AppStore) => store.categories);
	const maxPriceByCategory = useSelector(selectMaxPriceByCategory);
	const [value, setValue] = useState<number>(0);
	const [category, setCategory] = useState<string>('all');
	const dispatch = useDispatch();
	const checkbound = (val: any) => {
		setValue(val);
		dispatch(filterProductsByMinPrice(val));
	};

	const [maxValue, setMaxValue] = useState(maxPriceByCategory.all);

	const resetCategories = () => {
		dispatch(filterProductsByCategory('all'));
	};

	const resetSearchQuery = () => {
		dispatch(searchProducts(''));
	};

	const handleCategoryChange = (e: string) => {
		if (e === 'all') {
			resetCategories();
			resetSearchQuery();
			return;
		}
		setCategory(e);
		dispatch(filterProductsByCategory(e));
	};

	useEffect(() => {
		setMaxValue(maxPriceByCategory[category]);
		setValue(0);
		dispatch(filterProductsByMinPrice(0));
	}, [category, maxPriceByCategory]);

	return (
		<div className='flex flex-col gap-5 w-full'>
			{/* Filter Mid Screen */}
			<div className='hidden md:flex flex-col border border-zinc-700 bg-zinc-800 p-5 md:h-[430px] rounded-xl'>
				<h2 className='font-bold text-2xl pb-4'>Filters</h2>
				<form className='flex flex-col gap-4'>
					<RadioGroup.Root
						className='flex flex-col gap-2.5'
						defaultValue='default'
						aria-label='View density'
						onValueChange={e => handleCategoryChange(e)}
					>
						<h3 className='text-m font-bold pb-1'>Categories</h3>
						{categories.map((category, index) => {
							return (
								<div className='flex items-center' key={index}>
									<RadioGroup.Item
										className='bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-black hover:bg-gradient-to-br hover:from-purple-400 hover:to-fuchsia-500 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default'
										value={category.toString()}
										id={`r${index}`}
									>
										<RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-violet-300" />
									</RadioGroup.Item>
									<label
										className='text-white text-[15px] leading-none pl-[15px]'
										htmlFor={`r${index}`}
									>
										{capitalizeFirstLetter(category.toString().split('-')[0])}
									</label>
								</div>
							);
						})}
						<div className='flex items-center' onClick={resetCategories}>
							<RadioGroup.Item
								className='bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-black hover:bg-gradient-to-br hover:from-purple-400 hover:to-fuchsia-500 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default'
								value='all'
								id={`r${categories.length}`}
							>
								<RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-violet-300" />
							</RadioGroup.Item>
							<label className='text-white text-[15px] leading-none pl-[15px]'>
								All
							</label>
						</div>
					</RadioGroup.Root>
					<div className='flex flex-col'>
						<p className='text-m font-bold pb-1'>Min. Price: ${value}</p>
						<Slider.Root
							className='relative flex items-center select-none touch-none w-[200px] h-5'
							value={[value]}
							max={maxValue}
							step={10}
							minStepsBetweenThumbs={1}
							aria-label='Price Range'
							onValueChange={e => {
								checkbound(e[0]);
							}}
						>
							<Slider.Track className='bg-blackA10 relative grow rounded-full h-[3px]'>
								<Slider.Range className='absolute bg-gradient-to-br from-purple-400 to-fuchsia-900 group-hover:from-purple-600 rounded-full h-full' />
							</Slider.Track>
							<Slider.Thumb className='block w-4 h-4 bg-gradient-to-tl from-purple-600 to-fuchsia-500 group-hover:from-purple-600 shadow-[0_2px_10px] shadow-black rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_1px]' />
						</Slider.Root>
					</div>
				</form>
			</div>
			{/* Filter Small Screen */}
			<div className='flex md:hidden flex-col bg-zinc-800 rounded-xl'>
				<SelectComponent
					title='Filters'
					options={categories.map(category => {
						return {
							label: capitalizeFirstLetter(category.toString().split('-')[0]),
							value: category.toString(),
						};
					})}
					onChange={e => handleCategoryChange(e)}
				/>
			</div>
		</div>
	);
}
