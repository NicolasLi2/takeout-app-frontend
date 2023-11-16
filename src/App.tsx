import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import Home from './ui/Home';
import Error from './ui/Error';
import { Cloudinary } from '@cloudinary/url-gen';
import Menu from './features/menu/Menu';
import MenuForm from './features/menu/MenuForm';
import { getMenu } from './api/menu';
import Cart from './features/cart/Cart';
import CreateOrder from './features/order/CreateOrder';
import { orderAction } from './features/order/orderAction';

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/menu',
                element: <Menu />,
                loader: async () => {
                    const { data } = await getMenu();
                    return data;
                },
                errorElement: <Error />,
            },
            {
                path: '/create-menu',
                element: <MenuForm />,
                errorElement: <Error />,
            },
            {
                path: '/cart',
                element: <Cart />,
            },
            {
                path: '/order/new',
                element: <CreateOrder />,
                action: orderAction,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router}></RouterProvider>;
}

export default App;
