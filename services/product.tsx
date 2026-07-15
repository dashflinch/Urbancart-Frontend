import api from './api';


export const getProducts = async () => {

    return api.get(
        '/products'
    );

};