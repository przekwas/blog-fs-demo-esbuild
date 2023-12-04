import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home, { homeLoader } from './views/Home';
import Details from './views/Details';
import Compose from './views/Compose';
import Admin from './views/Admin';
import ErrorBoundary from './views/ErrorBoundary';

interface AppProps {}

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
		loader: homeLoader,
		errorElement: <ErrorBoundary />
	},
	{
		path: '/compose',
		element: <Compose />
	},
	{
		path: '/admin/:blogid',
		element: <Admin />
	},
	{
		path: '/blog/:blogid',
		element: <Details />
	}
]);

const App = (props: AppProps) => {
	return <RouterProvider router={router} />;
};

export default App;
