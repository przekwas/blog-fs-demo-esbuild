import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './views/Root';
import Home, { homeLoader } from './views/Home';
import Details, { detailsLoader } from './views/Details';
import Admin, { adminLoader } from './views/Admin';
import Edit, { editLoader } from './views/Edit';
import Compose from './views/Compose';
import ErrorBoundary from './views/ErrorBoundary';

interface AppProps {}

const router = createBrowserRouter([
	{
		element: <Root />,
		errorElement: <ErrorBoundary />,
		children: [
			{
				path: '/',
				element: <Home />,
				loader: homeLoader
			},
			{
				path: '/blog/:blogid',
				loader: detailsLoader,
				element: <Details />
			},
			{
				path: '/admin',
				loader: adminLoader,
				element: <Admin />
			},
			{
				path: '/admin/:blogid/edit',
				loader: editLoader,
				element: <Edit />
			},
			{
				path: '/compose',
				element: <Compose />
			}
		]
	}
]);

const App = (props: AppProps) => {
	return <RouterProvider router={router} />;
};

export default App;
