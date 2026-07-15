import api from './api';

export const registerUser = async (userData: {
    full_name: string;
    email: string;
    password: string;
    role: 'customer' | 'seller';
}) => {
    return await api.post('/auth/register', userData);
};

export const loginUser = async (userData: {
    email: string;
    password: string;
}) => {
    return await api.post('/auth/login', userData);
};