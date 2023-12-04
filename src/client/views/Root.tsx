import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

interface RootProps {}

const Root = (props: RootProps) => {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
};

export default Root;
