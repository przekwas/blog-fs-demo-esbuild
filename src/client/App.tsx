import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './views/Root';
import Home, { homeLoader } from './views/Home';
import Details, { detailsLoader } from './views/Details';
import Admin, { adminLoader } from './views/Admin';
import Edit, { editLoader } from './views/Edit';
import Compose, { composeLoader } from './views/Compose';
import ErrorBoundary from './views/ErrorBoundary';
import Search from './views/Search';

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
				loader: composeLoader,
				element: <Compose />
			},
			{
				path: '/search',
				element: <Search />
			}
		]
	}
]);

const App = (props: AppProps) => {
	return <RouterProvider router={router} />;
};

export default App;
