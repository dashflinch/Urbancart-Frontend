import api from './api';
import { getToken } from '../utils/storage';

export const getSellerOrders = async () => {

    const token = await getToken();

    return await api.get(
        '/orders/seller',
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

};


export const placeOrder = async (
    productId: number,
    quantity: number
) => {

    const token = await getToken();

    return await api.post(
        '/orders',
        {
            items: [
                {
                    product_id: productId,
                    quantity: quantity,
                },
            ],
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};



export const getCustomerOrders = async () => {

    const token = await getToken();

    return api.get(
        "/orders/customer",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};