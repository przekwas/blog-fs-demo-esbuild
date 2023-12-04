import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { fetchData } from '../services/fetchData';

interface HomeProps {}

export const homeLoader = async () => {
	try {
		const blogs = await fetchData('/api/blogs');
		return blogs;
	} catch (error) {
		throw error;
	}
};

const Home = (props: HomeProps) => {
	const blogs = useLoaderData();
	return (
		<div className="mx-auto mt-5 w-25">
			<div className="alert alert-info text-center">Home Page</div>
			<div>{JSON.stringify(blogs)}</div>
		</div>
	);
};

export default Home;
