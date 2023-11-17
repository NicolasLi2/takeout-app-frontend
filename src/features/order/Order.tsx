import { useFetcher, useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';
import { formatCurrency } from '../../utils/helper';
import OrderItem from './OrderItem';
// import {
//     calcMinutesLeft,
//     formatCurrency,
//     formatDate,
// } from '../../utils/helper';
// import OrderItem from '../order/OrderItem';
// import UpdateOrder from './UpdateOrder';

export default function Order() {
  const order = useLoaderData();
  console.log('order:', order);

  // const fetcher = useFetcher();

  // useEffect(
  //   function () {
  //     if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
  //   },
  //   [fetcher]
  // );
  // console.log(fetcher.data);

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    totalPrice,
    createdAt,
    orderItem,
    userName,
    userPhone,
    userAddress,
  } = order;

  return (
    <div className='space-y-8 px-4 py-6'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <h2 className='text-xl font-semibold'>Order #{id} status</h2>
      </div>

      <div className='flex flex-col text-sm   gap-2 bg-stone-200 px-6 py-5'>
        <p>Customer name: {userName}</p>
        <p>Phone number: {userPhone}</p>
        <p>Customer address: {userAddress}</p>
        <p>Order created at: {new Date(createdAt).toLocaleString('cn')}</p>
      </div>

      <ul className='divide-y divide-stone-200 border-b border-t'>
        {orderItem.map((item) => (
          <OrderItem item={item} key={item.id} />
        ))}
      </ul>

      <div className='space-y-2 bg-stone-200 px-6 py-5'>
        <p className='text-sm font-medium text-stone-600'>
          Total price: {formatCurrency(totalPrice)}
        </p>

        <p className='font-bold'>
          To pay on delivery: {formatCurrency(totalPrice)}
        </p>
      </div>
    </div>
  );
}
