import api from './api';
import { getToken } from '../utils/storage';

export const addSellerProduct = async (
    product: {
        name: string;
        description: string;
        price: number;
        stock: number;
        image: string;
    }
) => {
    const token = await getToken();

    console.log('TOKEN:', token);
    console.log('PRODUCT DATA:', product);

    try {
        const response = await api.post(
            '/seller/products',
            product,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log(
            'ADD PRODUCT SUCCESS:',
            response.data
        );

        return response;

    } catch (error: any) {

        console.log(
            'STATUS:',
            error.response?.status
        );

        console.log(
            'ERROR DATA:',
            error.response?.data
        );

        console.log(
            'ERROR MESSAGE:',
            error.message
        );

        throw error;
    }
};


export const getSellerProducts = async () => {

    const token = await getToken();

    return api.get(
        '/seller/products',
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};


export const getSellerDashboard = async () => {

    const token = await getToken();

    return api.get(
        '/seller/dashboard',
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};










// import api from './api';
// import { getToken } from '../utils/storage';


// export const addSellerProduct = async (
//     product: {
//         name: string;
//         description: string;
//         price: number;
//         stock: number;
//         image: string;
//     }
// ) => {

//     const token = await getToken();
//     return api.post(
//         '/seller/products',
//         product,
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );
// };


// export const getSellerProducts = async () => {
//     const token = await getToken();
//     return api.get(
//         '/seller/products',
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );

// };


// export const getSellerDashboard = async () => {

//     const token = await getToken();


//     return api.get(
//         '/seller/dashboard',
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );

// };