import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface RootProps {}

const Root = (props: RootProps) => {
	return (
		<div id="app">
			<Navbar />
			<main className="content">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Root;