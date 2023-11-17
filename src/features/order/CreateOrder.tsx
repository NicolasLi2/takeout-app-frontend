import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import { formatCurrency } from '../../utils/helper';
import { fetchAddress } from '../user/userSlice';

export default function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === 'loading';

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData();

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const extraPrice = withPriority ? totalCartPrice * 0.1 : 0;
  const totalPrice = totalCartPrice + extraPrice;
  console.log(cart);
  if (!cart.length) return <EmptyCart />;

  return (
    <div className='px-4 py-6'>
      <h2 className='mb-8 text-xl font-semibold'>
        {`Ready to order? Let's go!`}
      </h2>

      <Form method='POST'>
        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Name</label>
          <input
            type='text'
            name='userName'
            required
            defaultValue={username}
            className='input grow'
          />
        </div>

        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Phone number</label>
          <div className='grow'>
            <input
              type='tel'
              name='userPhone'
              required
              className='input w-full'
            />
            {formErrors?.phone && (
              <p className='mt-2 rounded-md bg-red-100 text-xs text-red-700'>
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className='relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input
              type='text'
              name='userAddress'
              disabled={isLoadingAddress}
              defaultValue={address}
              required
              className='input w-full'
            />
            {addressStatus === 'error' && (
              <p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className='absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]'>
              <Button
                type='small'
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        {/* <div className='mb-12 flex items-center gap-5'>
                    <input
                        type='checkbox'
                        name='priority'
                        id='priority'
                        className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
                        value={withPriority}
                        onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <label htmlFor='priority' className='font-medium'>
                        Want to yo give your order priority?
                    </label>
                </div> */}

        <div>
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
          <input type='hidden' name='extraPrice' value={extraPrice} />
          <input
            type='hidden'
            name='position'
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
          <Button disabled={isSubmitting || isLoadingAddress} type='primary'>
            {isSubmitting
              ? 'Placing order...'
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
