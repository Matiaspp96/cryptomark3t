import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../NavBar';
import './Layout.css';

export type LayoutProps = {};

const Layout: React.FC<LayoutProps> = () => {
	return (
		<main className='flex flex-col h-full w-screen gradient-bg'>
			<NavBar />
			<Outlet />
		</main>
	);
};

export default Layout;
