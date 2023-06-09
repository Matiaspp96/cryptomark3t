import { PrivateRoutes, PublicRoutes } from '@/models';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDisconnect } from 'wagmi';
import SheetCart from '../UI/Sheet/SheetCart';

interface DropdownProps {
	address?: string;
}

const DropdownWallet = ({ address }: DropdownProps) => {
	const [open, setOpen] = useState(false);
	const { disconnect } = useDisconnect();
	const navigate = useNavigate();
	const controls = useAnimationControls();
	const router = useLocation();

	async function closeMenu() {
		await controls.start('closed');
		setOpen(false);
	}

	const handleDisconnect = async () => {
		await disconnect();
		closeMenu();
		navigate(PublicRoutes.ROOT);
	};

	useEffect(() => {
		if (open) {
			controls.start('open');
		}
	}, [controls, open, router.pathname]);

	const items = [
		{
			label: 'Perfil',
			path: PrivateRoutes.PROFILE,
		},
		{
			label: 'Productos',
			path: PrivateRoutes.PRODUCTS,
		},
		{
			label: 'Publicar',
			path: PrivateRoutes.PUBLISH,
		},
	];

	return (
		<DropdownMenu.Root open={open} onOpenChange={setOpen}>
			<DropdownMenu.Trigger className='font-breul inline-flex items-center justify-center p-0.5 overflow-hidden text-lg rounded-lg group bg-gradient-to-br from-blue-600 to-blue-500 group-hover:from-blue-600 group-hover:to-blue-500 hover:text-white dark:text-white  px-4 py-2 bg-blue-500 text-white hover:bg-gradient-to-bl text-center mr-2'>
				{address?.slice(0, 6)}...
				{address?.slice(address.length - 4, address.length)}
			</DropdownMenu.Trigger>

			<AnimatePresence>
				{open && (
					<DropdownMenu.Portal forceMount>
						<DropdownMenu.Content
							align='start'
							className='mt-1 overflow-hidden rounded p-2 text-left shadow backdrop-blur bg-gradient-to-tr from-[#151c25]/75 to-[#382130]/75 group-hover:from-blue-600 group-hover:to-blue-500 hover:text-white dark:text-white'
							asChild
						>
							<motion.div
								initial='closed'
								animate={controls}
								exit='closed'
								variants={{
									open: {
										opacity: 1,
										transition: { ease: 'easeOut', duration: 0.1 },
									},
									closed: {
										opacity: 0,
										transition: { ease: 'easeIn', duration: 0.2 },
									},
								}}
								className='flex flex-col'
							>
								{items.map(({ label, path }, index) => {
									return (
										<Item
											closeMenu={closeMenu}
											path={path}
											label={label}
											key={index}
										/>
									);
								})}
								<SheetCart onCloseMenu={closeMenu}>
									<button className='text-gray-900 px-2 py-1.5 w-40 rounded text-left text-xl font-breul relative items-center justify-center dark:text-white  hover:bg-zinc-600 data-[highlighted]:text-white data-[highlighted]:focus:outline-none'>
										Carrito
									</button>
								</SheetCart>
								<button
									className='text-gray-900 px-2 py-1.5 w-40 rounded text-left text-xl font-breul relative items-center justify-center dark:text-white  hover:bg-zinc-600 data-[highlighted]:text-white data-[highlighted]:focus:outline-none'
									onClick={handleDisconnect}
								>
									Desconectar
								</button>
							</motion.div>
						</DropdownMenu.Content>
					</DropdownMenu.Portal>
				)}
			</AnimatePresence>
		</DropdownMenu.Root>
	);
};

const Item = ({
	label,
	path,
	closeMenu,
}: {
	label: string;
	path: string;
	closeMenu: () => void;
}) => {
	const controls = useAnimationControls();

	return (
		<DropdownMenu.Item
			onSelect={async (e: any) => {
				e.preventDefault();

				await controls.start({
					backgroundColor: '#fff',
					color: '#000',
					transition: { duration: 0.04 },
				});
				await controls.start({
					backgroundColor: '#38bdf8',
					color: '#fff',
					transition: { duration: 0.04 },
				});
				await sleep(0.075);

				await closeMenu();
			}}
			className='flex w-40 select-none rounded px-2 py-1.5 text-gray-700 dark:text-white data-[highlighted]:bg-zinc-500 data-[highlighted]:text-white data-[highlighted]:focus:outline-none'
		>
			<Link
				className='font-breul text-xl hover:text-white'
				to={`${PrivateRoutes.ROOT}${path}`}
			>
				{label}
			</Link>
		</DropdownMenu.Item>
	);
};

const sleep = (s: number) =>
	new Promise(resolve => setTimeout(resolve, s * 1000));

export default DropdownWallet;
