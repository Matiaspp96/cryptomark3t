import {
	CheckIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import { ReactNode, Ref, forwardRef } from 'react';

interface SelectProps {
	title: string;
	options: {
		label: string;
		value: string;
	}[];
	onChange: (e: string) => void;
}

interface SelectItemProps {
	children: ReactNode;
	value: string;
}

const SelectComponent = ({ title, options, onChange }: SelectProps) => (
	<Select.Root onValueChange={e => onChange(e)}>
		<Select.Trigger
			className='inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-zinc-800 text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 data-[placeholder]:text-violet-300 outline-none'
			aria-label=''
		>
			<Select.Value placeholder={title} />
			<Select.Icon className='text-violet-300'>
				<ChevronDownIcon />
			</Select.Icon>
		</Select.Trigger>
		<Select.Portal>
			<Select.Content
				side='bottom'
				sticky='always'
				position='popper'
				alignOffset={5}
				align={title === 'Sorts' ? 'end' : 'start'}
				className='overflow-hidden z-50 bg-zinc-800 rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]'
			>
				<Select.ScrollUpButton className='flex items-center justify-center h-[25px] bg-zinc-800 text-violet11 cursor-default'>
					<ChevronUpIcon />
				</Select.ScrollUpButton>
				<Select.Viewport className='p-[5px] w-full'>
					<Select.Group className='flex flex-col gap-2.5'>
						{options.map(option => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</Select.Group>
				</Select.Viewport>
				<Select.ScrollDownButton className='flex items-center justify-center h-[25px] bg-zinc-800 text-violet11 cursor-default'>
					<ChevronDownIcon />
				</Select.ScrollDownButton>
			</Select.Content>
		</Select.Portal>
	</Select.Root>
);

const SelectItem = forwardRef(
	(
		{ children, value, ...props }: SelectItemProps,
		forwardedRef: Ref<HTMLDivElement> | undefined
	) => {
		return (
			<Select.Item
				className={
					'text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-gray-500 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet-600 data-[highlighted]:text-violet-300'
				}
				{...props}
				value={value}
				ref={forwardedRef}
			>
				<Select.ItemText>{children}</Select.ItemText>
				<Select.ItemIndicator className='absolute left-0 w-[25px] inline-flex items-center justify-center'>
					<CheckIcon />
				</Select.ItemIndicator>
			</Select.Item>
		);
	}
);

export default SelectComponent;
