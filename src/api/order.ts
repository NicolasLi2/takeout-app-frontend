import { client } from '../features/services/client';

// totalPrice, userName, userPhone, userAddress, orderItem
// orderItem: "productName"  "unitPrice" "quantity" "imageUrl"
export const createOrder = async (newOrder) => {
    try {
        const { data } = await client.post('/order/create-order', newOrder, {
            headers: { 'Content-Type': 'application/json' },
        });
        return data;
    } catch {
        throw new Error('Failed creating your order');
    }
};
