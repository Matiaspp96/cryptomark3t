import Storage from '@/assets/abi/Storage.json';
import { Product, PublicRoutes } from '@/models';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { usePrepareContractWrite } from 'wagmi';
import OnlineShopingImg from '@/assets/img/Online-Shopping.png';
import StablesCoins from '@/assets/img/stables.webp';
import ShopImg from '@/assets/img/Shop.png';
import Flow from '@/assets/img/Flow.png';
import { LockClosedIcon } from '@radix-ui/react-icons';
import { HiOutlineMicrophone } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/UI/Accordion/Accordion';

export type HomeProps = {};
const AddressContract = '0x29333F9A6B1Ca909b840067e9F3950782f52aec1';

const Home: React.FC<HomeProps> = () => {
	const [number, setNumber] = useState<number>(0);
	const [products, setProducts] = useState<Product[]>([]);
	const { config } = usePrepareContractWrite({
		address: AddressContract,
		abi: Storage,
		functionName: 'store',
		args: [number],
	});
	// const { data, isLoading, isSuccess, write } = useContractWrite(config);

	const handleClick = async () => {
		// try {
		// const user = await getUserInfo(client);
		// 	console.log(user);
		// 	await write?.();
		// } catch (error) {
		// 	console.log(error);
		// }
	};

	return (
		<div className='w-screen md:container mx-auto px-4'>
			<main className='py-8'>
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
					className='flex flex-col md:flex-row h-[600px] items-center justify-between'
					id='home'
				>
					<div className='md:w-1/2 text-center md:text-start'>
						<h2 className='font-breul text-4xl md:text-[64px] leading-none font-bold mb-4'>
							La plataforma segura para
							<span className='bg-clip-text text-transparent bg-gradient-to-br from-purple-600 to-blue-500'>
								{' '}
								comprar y vender{' '}
							</span>
							con criptomonedas
						</h2>
						<p className='font-montserrat font-light text-lg md:text-2xl mb-8'>
							Descubre una forma confiable y descentralizada de realizar
							transacciones en línea!
						</p>
						<div className='relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'>
							<Link
								to={PublicRoutes.EXPLORE}
								className='relative text-lg md:text-2xl hover:text-white px-5 py-2 transition-all ease-in duration-100 bg-white dark:bg-zinc-800 rounded-md group-hover:bg-opacity-0 font-breul'
							>
								Explora el mercado
							</Link>
						</div>
					</div>
					<img
						src={ShopImg}
						alt='Online Shoping'
						className='md:w-[600px] md:h-[600px] object-contain mt-[-100px]'
					/>
				</motion.div>

				{/* Sección Acerca de */}
				<section className='py-8 flex flex-col-reverse md:flex-row justify-between'>
					<img
						src={OnlineShopingImg}
						alt='Online Shoping'
						className='md:w-[600px] md:h-[600px] object-contain md:mt-[-100px]'
					/>
					<div className='flex flex-col text-center md:w-1/2 justify-center'>
						<h3 className='text-3xl font-breul font-bold mb-4'>
							Acerca de{' '}
							<span className='bg-clip-text text-transparent bg-gradient-to-br from-purple-600 to-blue-500'>
								CryptoMark3t
							</span>
						</h3>
						<p className='text-lg md:text-xl font-montserrat md:text-end'>
							CryptoMark3t es un mercado web3 que permite a los usuarios comprar
							y vender productos utilizando criptomonedas. Estamos abordando una
							alternativa a las opciones de pago existentes y mejorando la falta
							de confianza en los mercados en línea, proporcionando una opción
							más segura y descentralizada.
						</p>
					</div>
				</section>

				{/* Sección Cómo funciona */}
				<section className='py-8 flex flex-col md:flex-row justify-between'>
					<div className='flex flex-col text-center md:w-1/2 justify-center'>
						<h3 className='text-2xl font-breul font-bold mb-4'>
							¿Cómo funciona CryptoMark3t?
						</h3>
						<p className='text-lg md:text-xl font-montserrat md:text-start'>
							CryptoMark3t utiliza un protocolo de smart contracts (Escrow) con
							múltiples validaciones para garantizar la confianza en el proceso
							de transacción. El comprador solo completará la transacción una
							vez que se cumplan ciertos criterios de validación, como la
							recepción y confirmación del producto en buenas condiciones.
							Además, la plataforma ofrece comandos de voz para hacerla más
							accesible y fácil de usar.
						</p>
					</div>
					<img
						src={Flow}
						alt='Online Shoping'
						className='my-10 md:my-0 md:w-[600px] md:h-[600px] object-contain'
					/>
				</section>

				{/* Sección Características principales */}
				<section className='py-8'>
					<div className='text-center select-none'>
						<h3 className='text-2xl font-breul font-bold mb-8'>
							Características principales
						</h3>
						<div className='flex flex-col md:flex-row justify-center gap-5 md:gap-16'>
							<div className='hover:bg-gradient-to-r rounded-xl from-pink-700 via-pink-800 to-pink-700 py-1 transition-all ease-in duration-100'>
								<div className='w-full h-full md:max-w-md p-4 bg-[#090918] shadow-lg drop-shadow-2xl hover:brightness-110  shadow-[#141829] rounded-xl md:w-96 md:h-64 flex flex-col gap-5'>
									<div className='flex items-center justify-center'>
										<LockClosedIcon className='w-16 h-20 text-white mx-auto' />
									</div>
									<div className='flex flex-col items-center'>
										<h4 className='text-xl font-breul font-semibold mb-2'>
											Seguridad y confianza
										</h4>
										<p className='font-montserrat'>
											Utilizamos un sistema de pago a través de smart contracts
											(Escrow) basados en blockchain para reducir los riesgos y
											aumentar la confianza en las transacciones.
										</p>
									</div>
								</div>
							</div>
							<div className='hover:bg-gradient-to-r rounded-xl from-pink-700 via-pink-800 to-pink-700 py-1 transition-all ease-in duration-100'>
								<div className='w-full h-full md:max-w-md p-4 bg-[#090918] shadow-lg drop-shadow-2xl hover:brightness-110  shadow-[#141829] rounded-xl md:w-96 md:h-64 flex flex-col gap-5'>
									<div className='flex items-center justify-center'>
										<img
											src={StablesCoins}
											alt='Stables Coins'
											className='object-contain aspect-square w-20 h-20 mx-auto '
										/>
									</div>
									<div className='flex flex-col items-center'>
										<h4 className='text-xl font-breul font-semibold mb-2'>
											Criptomonedas estables
										</h4>
										<p className='font-montserrat'>
											Aceptamos stables coins como USDT, USDC y BUSD para
											proporcionar una opción más estable y confiable a los
											usuarios.
										</p>
									</div>
								</div>
							</div>

							<div className='hover:bg-gradient-to-r rounded-xl from-pink-700 via-pink-800 to-pink-700 py-1 transition-all ease-in duration-100'>
								<div className='w-full h-full md:max-w-md p-4 bg-[#090918] shadow-lg drop-shadow-2xl hover:brightness-110  shadow-[#141829] rounded-xl md:w-96 md:h-64 flex flex-col gap-5'>
									<div className='flex items-center justify-center'>
										<HiOutlineMicrophone className='w-16 h-20 text-white mx-auto' />
									</div>
									<div className='flex flex-col items-center'>
										<h4 className='text-xl font-breul font-semibold mb-2'>
											Comandos de voz
										</h4>
										<p className='font-montserrat'>
											Hemos implementado comandos de voz para hacer que la
											plataforma sea más accesible y fácil de usar para todos
											los usuarios.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Sección Testimonios
				<section className='py-8'>
					<div className='text-center'>
						<h3 className='text-2xl font-bold mb-4'>
							Testimonios de usuarios satisfechos
						</h3>
						<div className='flex justify-center'>
							<div className='max-w-md p-4'>
								<blockquote className='italic text-lg'>
									CryptoMark3t me brinda la seguridad y confianza que necesito
									al comprar productos en línea con criptomonedas. ¡Altamente
									recomendado!
								</blockquote>
								<p className='font-semibold'>- Juan Pérez</p>
							</div>
							<div className='max-w-md p-4'>
								<blockquote className='italic text-lg'>
									Gracias a CryptoMark3t, ahora puedo realizar transacciones de
									forma rápida y segura utilizando mis criptomonedas favoritas.
									¡Excelente plataforma!
								</blockquote>
								<p className='font-semibold'>- María Gómez</p>
							</div>
						</div>
					</div>
				</section> */}

				{/* Sección Preguntas frecuentes */}

				<section className='py-8'>
					<div className='flex justify-center flex-col items-center text-start'>
						<h3 className='text-2xl font-bold mb-4'>Preguntas frecuentes</h3>
						<Accordion type='multiple' className='w-1/2 text-lg'>
							<AccordionItem value='item-1'>
								<AccordionTrigger className='text-start'>
									¿Cuáles son las criptomonedas aceptadas en CryptoMark3t?
								</AccordionTrigger>
								<AccordionContent>
									En CryptoMark3t aceptamos criptomonedas estables como USDT,
									USDC y BUSD.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value='item-2'>
								<AccordionTrigger className='text-start'>
									¿Cómo puedo saber si un producto está en buenas condiciones
									antes de completar la transacción?
								</AccordionTrigger>
								<AccordionContent>
									El sistema de smart contracts de CryptoMark3t incluye
									validaciones adicionales, como la confirmación del comprador
									sobre el estado del producto recibido.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value='item-3'>
								<AccordionTrigger className='text-start'>
									¿Ofrecen soporte para usuarios con discapacidades?
								</AccordionTrigger>
								<AccordionContent>
									Sí, en CryptoMark3t nos preocupamos por la accesibilidad.
									Hemos implementado comandos de voz para hacer la plataforma
									más accesible para todos los usuarios.
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</section>

				{/* Sección Contacto */}
				<section id='contact' className='py-8'>
					<div className='text-center'>
						<h3 className='text-2xl font-bold mb-4'>Contáctanos</h3>
						<p className='text-lg'>
							¿Tienes alguna pregunta o comentario? ¡Nos encantaría saber de ti!
						</p>
						<p className='text-lg'>
							Puedes contactarnos a través del siguiente formulario o en
							nuestras redes sociales.
						</p>
						{/* Agrega aquí el formulario de contacto o los enlaces a tus perfiles de redes sociales */}
					</div>
				</section>
			</main>
			<footer className='text-center py-4'>
				<p>
					Derechos de autor © {new Date().getFullYear()} CryptoMark3t. Todos los
					derechos reservados.
				</p>
			</footer>
		</div>
	);
};

export default Home;
