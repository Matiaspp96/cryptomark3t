import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const InputForm = (props: InputProps) => {
	return (
		<input
			onChange={props.onChange}
			value={props.value}
			type={props.type}
			placeholder={props.placeholder}
			className='border border-gray-400 p-2 rounded-lg focus:outline-none focus:border-blue-500'
			id={props.id}
			name={props.name}
		/>
	);
};

export default InputForm;
