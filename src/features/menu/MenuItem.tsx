import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { addItem, getCurrentQuantityById } from '../cart/cartSlice';
import { formatCurrency } from '../../utils/helper';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';
import DeleteItem from '../cart/DeleteItem';

export default function MenuItem({ product }) {
    const dispatch = useDispatch();
    const [soldOut, setSoldOut] = useState(false);

    const { id, productName, unitPrice, quantity, imageUrl } = product;
    if (quantity === 0) setSoldOut(true);

    const currentQuantity = useSelector(getCurrentQuantityById(id));
    const isInCart = currentQuantity > 0;

    function handleAddToCart() {
        const newItem = {
            id,
            productName,
            quantity: 1,
            unitPrice,
            totalPrice: unitPrice * 1,
        };
        dispatch(addItem(newItem));
    }

    return (
        <li className='flex gap-4 py-2'>
            <img
                src={imageUrl}
                alt={productName}
                className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
            />
            <div className='flex grow flex-col pt-0.5'>
                <p className='font-medium'>{productName}</p>

                <div className='mt-auto flex items-center justify-between'>
                    {!soldOut ? (
                        <p className='text-sm'>{formatCurrency(unitPrice)}</p>
                    ) : (
                        <p className='text-sm font-medium uppercase text-stone-500'>
                            Sold out
                        </p>
                    )}

                    {isInCart && (
                        <div className='flex items-center gap-3 sm:gap-8'>
                            <UpdateItemQuantity
                                id={id}
                                currentQuantity={currentQuantity}
                            />
                            <DeleteItem id={id} />
                        </div>
                    )}

                    {!soldOut && !isInCart && (
                        <Button type='small' onClick={handleAddToCart}>
                            Add to cart
                        </Button>
                    )}
                </div>
            </div>
        </li>
    );
}
