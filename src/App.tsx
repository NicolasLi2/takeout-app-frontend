import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import Home from './ui/Home';
import Error from './ui/Error';
import Menu from './features/menu/Menu';
import MenuForm from './features/menu/MenuForm';
import { getMenu } from './api/menu';
import Cart from './features/cart/Cart';
import CreateOrder from './features/order/CreateOrder';
import { orderAction } from './features/order/orderAction';
import Order from './features/order/Order';
import { getOrder } from './api/order';

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
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: async ({ params }) => {
          const order = await getOrder(params.orderId);
          return order;
        },
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
