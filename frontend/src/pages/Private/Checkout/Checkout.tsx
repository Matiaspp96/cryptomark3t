import { AppStore } from '@/redux/store';
import { useSelector } from 'react-redux';
import CardCheckoutProduct from './components/CardProductCheckout';
import InputForm from '@/components/InputForm/InputForm';
import { InformationBuyer } from '@/models';
import React, { useState, useEffect } from 'react';
import MapComponent from '../Profile/components/MapComponent';

const Checkout = () => {
	const { cart } = useSelector((store: AppStore) => store.cart);
	const [informationBuyer, setInformationBuyer] = useState<InformationBuyer>({
		fullName: '',
		email: '',
		phone: '',
		address: '',
		postalCode: '',
		city: '',
		state: '',
		country: '',
		location: {
			lat: 0,
			lng: 0,
		},
	});
	const [state, setState] = useState<string>('');
	const [country, setCountry] = useState<string>('');
	const [city, setCity] = useState<string>('');
	const [postalCode, setPostalCode] = useState<string>('');
	const [location, setLocation] = useState<any>(null);
	const [address, setAddress] = useState<string>('');

	useEffect(() => {
		if (state && country && city && postalCode && location && address) {
			setInformationBuyer({
				...informationBuyer,
				state,
				country,
				city,
				postalCode,
				location,
				address,
			});
		}
	}, [state, country, city, postalCode, location, address]);

	const [, setLoading] = useState<boolean>(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInformationBuyer({
			...informationBuyer,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
	};

	return (
		<div className='container mx-auto px-4 py-6'>
			<h1 className='text-xl font-bold mb-4 text-center'>
				Finalizar <span className='text-blue-500'>Compra</span>
			</h1>
			<div className='flex flex-col w-full md:flex-row gap-10'>
				<div className='flex flex-col gap-5 w-full'>
					<h1 className='text-xl font-bold mb-4 text-center'>
						Informacion de <span className='text-blue-500'>Entrega</span>
					</h1>
					<form onSubmit={handleSubmit}>
						<div className='grid grid-cols-2 gap-5 mb-10'>
							<div className='flex flex-col gap-1'>
								<label className='font-breul  font-bold text-white'>
									Nombre Completo:
								</label>
								<InputForm
									type='text'
									value={informationBuyer.fullName}
									onChange={handleChange}
									name='fullName'
								/>
							</div>
							<div className='flex flex-col gap-1'>
								<label className='font-breul  font-bold text-white'>
									Email:
								</label>
								<InputForm
									type='email'
									value={informationBuyer.email}
									onChange={handleChange}
									name='email'
								/>
							</div>
							<div className='flex flex-col gap-1'>
								<label className='font-breul  font-bold text-white'>
									Numero de Telefono:
								</label>
								<InputForm
									type='tel'
									value={informationBuyer.phone}
									onChange={handleChange}
									name='phone'
								/>
							</div>
							<div className='flex flex-col gap-1'>
								<label className='font-breul  font-bold text-white'>
									Direccion de Envio:
								</label>
								<InputForm
									type='text'
									value={informationBuyer.address}
									onChange={handleChange}
									name='address'
								/>
							</div>
							<div className='flex flex-col gap-1'>
								<label className='font-breul  font-bold text-white'>
									Codigo Postal:
								</label>
								<InputForm
									type='text'
									value={informationBuyer.postalCode}
									onChange={handleChange}
									name='postalCode'
								/>
							</div>

							<div className='flex flex-col gap-1'>
								<label className='font-breul  font-bold text-white'>
									Ciudad:
								</label>
								<InputForm
									type='text'
									value={informationBuyer.city}
									onChange={handleChange}
									name='city'
								/>
							</div>
							<div className='flex flex-col gap-1'>
								<label className='font-breul  font-bold text-white'>
									Estado:
								</label>
								<InputForm
									type='text'
									value={informationBuyer.state}
									onChange={handleChange}
									name='state'
								/>
							</div>
							<div className='flex flex-col gap-1'>
								<label className='font-breul  font-bold text-white'>
									Pais:
								</label>
								<InputForm
									type='text'
									value={informationBuyer.country}
									onChange={handleChange}
									name='country'
								/>
							</div>
						</div>
					</form>
					<div className='aspect-video'>
						<MapComponent
							setAddress={setAddress}
							setCity={setCity}
							setCountry={setCountry}
							setLocation={setLocation}
							setZipCode={setPostalCode}
							setState={setState}
						/>
					</div>
				</div>
				<div className='flex flex-col w-full'>
					<h1 className='text-xl font-bold mb-4 text-center'>
						Productos <span className='text-blue-500'>Agregados</span>
					</h1>
					{cart.length > 0 &&
						cart.map(product => (
							<CardCheckoutProduct product={product} key={product.id} />
						))}
				</div>
			</div>
		</div>
	);
};

export default Checkout;
