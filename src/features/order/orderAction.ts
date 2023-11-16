import { redirect } from 'react-router-dom';
import { clearCart } from '../cart/cartSlice';
import store from '../../store';
import { createOrder } from '../../api/order';

// https://uibakery.io/regex-library/phone-number
// const isValidPhone = (str) =>
//     /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
//         str
//     );

export const orderAction = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        priority: data.priority === 'true',
    };
    console.log('order:', order);

    const errors = {};
    // if (!isValidPhone(order.phone))
    //     errors.phone = 'Please give us your correct phone number.';

    if (Object.keys(errors).length > 0) return errors;

    // If everything is okay, create new order and redirect
    const newOrder = await createOrder(order);

    // Do NOT overuse
    store.dispatch(clearCart());

    return redirect(`/order/${newOrder.id}`);
};
