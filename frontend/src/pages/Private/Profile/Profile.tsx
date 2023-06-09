import ProfileVector from '@/assets/img/picture-profile-icon.webp';
import { postUserApi } from '@/services/public.services';
import { UploadIcon } from '@radix-ui/react-icons';
import { Icon } from '@radix-ui/react-select';
import React, { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useAccount } from 'wagmi';
import MapComponent from './components/MapComponent';

const Profile = () => {
	const { address: walletAddress } = useAccount();
	const [profileImage, setProfileImage] = useState<File | null>(null);
	const [fullName, setFullName] = useState('John Doe');
	const [birthdate, setBirthdate] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [address, setAddress] = useState<string>('');
	const [, setLocation] = useState<any>(null);
	const [city, setCity] = useState('');
	const [country, setCountry] = useState('');
	const [zipCode, setZipCode] = useState('');
	const [state, setState] = useState('');

	const inputRef = useRef<HTMLInputElement>(null);

	const handleSaveProfileImage = (editor: AvatarEditor) => {
		if (editor) {
			const canvasScaled = editor.getImageScaledToCanvas();
			canvasScaled.toBlob((blob: any) => {
				setProfileImage(blob);
			});
		}
	};

	const handleUploadProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			setProfileImage(file);
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const user = {
			'name': fullName,
			email,
			'password': walletAddress,
		};
		postUserApi(user);
	};

	return (
		<div className='max-w-2xl mx-auto px-4 py-6'>
			<h1 className='text-xl font-bold mb-4 text-center'>
				Profile <span className='text-blue-500'>Settings</span>
			</h1>
			<form className='' onSubmit={handleSubmit}>
				<div className='flex justify-center mb-6'>
					<div className='relative'>
						<AvatarEditor
							image={profileImage || ProfileVector}
							width={150}
							height={150}
							border={0}
							ref={handleSaveProfileImage}
							className='rounded-full'
						/>
						<button
							onClick={() => inputRef.current?.click()}
							className='absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 cursor-pointer hover:bg-blue-600'
						>
							<Icon className='text-violet-300'>
								<UploadIcon />
							</Icon>
						</button>
					</div>

					<input
						type='file'
						accept='image/*'
						className='hidden'
						ref={inputRef}
						onChange={handleUploadProfileImage}
					/>
				</div>
				<div className='grid grid-cols-2 gap-5 mb-10'>
					<h3 className='col-span-2 text-md font-bold text-center'>
						General <span className='text-blue-500'>Information</span>
					</h3>
					<div className='flex flex-col gap-1'>
						<label className='font-breul  font-bold text-white'>
							Full Name:
						</label>
						<input
							type='text'
							value={fullName}
							onChange={e => setFullName(e.target.value)}
							className='border border-gray-400 p-2 rounded-lg focus:outline-none focus:border-blue-500'
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<label className='font-breul  font-bold text-white'>
							Birthdate:
						</label>
						<input
							type='date'
							value={birthdate}
							onChange={e => setBirthdate(e.target.value)}
							className='border border-gray-400 p-2 rounded-lg focus:outline-none focus:border-blue-500'
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<label className='font-breul  font-bold text-white'>Email:</label>
						<input
							type='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							className='border border-gray-400 p-2 rounded-lg focus:outline-none focus:border-blue-500'
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<label className='font-breul  font-bold text-white'>
							Phone Number:
						</label>
						<input
							type='tel'
							value={phoneNumber}
							onChange={e => setPhoneNumber(e.target.value)}
							className='border border-gray-400 p-2 rounded-lg focus:outline-none focus:border-blue-500'
						/>
					</div>
				</div>
				<h3 className='col-span-2 text-md font-bold text-center mb-5'>
					Address <span className='text-blue-500 '>Information</span>
				</h3>
				<div className='aspect-video mb-5'>
					<MapComponent
						setAddress={setAddress}
						setLocation={setLocation}
						setCity={setCity}
						setCountry={setCountry}
						setZipCode={setZipCode}
						setState={setState}
					/>
				</div>
				<div className='grid grid-cols-2 gap-5'>
					<div className='flex flex-col gap-1'>
						<label className='font-breul  font-bold text-white'>
							Street Address:
						</label>
						<input
							type='text'
							className='border border-gray-400 p-2 rounded-lg focus:outline-none focus:border-blue-500'
							value={address}
							onChange={e => setAddress(e.target.value)}
						/>
					</div>

					<div className='flex flex-col gap-1'>
						<label className='font-breul  font-bold text-white'>City:</label>
						<input
							type='text'
							className='border border-gray-400 p-2 rounded-lg focus:outline-none focus:border-blue-500'
							value={city}
							onChange={e => setCity(e.target.value)}
						/>
					</div>

					<div className='flex flex-col gap-1'>
						<label className='font-breul  font-bold text-white'>
							Province:
						</label>
						<input
							type='text'
							className='border border-gray-400 p-2 rounded-lg focus:outline-none focus:border-blue-500'
							value={state}
							onChange={e => setState(e.target.value)}
						/>
					</div>

					<div className='flex flex-col gap-1'>
						<label className='font-breul  font-bold text-white'>
							Zip Code:
						</label>
						<input
							type='text'
							className='border border-gray-400 p-2 rounded-lg focus:outline-none focus:border-blue-500'
							value={zipCode}
							onChange={e => setZipCode(e.target.value)}
						/>
					</div>

					<div className='flex flex-col gap-1'>
						<label className='font-breul  font-bold text-white'>Country:</label>
						<input
							type='text'
							className='border border-gray-400 p-2 rounded-lg focus:outline-none focus:border-blue-500'
							value={country}
							onChange={e => setCountry(e.target.value)}
						/>
					</div>
				</div>
				<button
					className='mt-8 bg-blue-500 text-white rounded-lg py-2 px-4'
					type='submit'
				>
					Save Changes
				</button>
			</form>
		</div>
	);
};
export default Profile;
