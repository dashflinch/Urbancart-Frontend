import api from './api';
import { getToken } from '../utils/storage';



export const getMessages = async (userId: number) => {

    const token = await getToken();
    return api.get(
        `/messages/${userId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};


export const sendMessage = async (
    receiverId: number,
    message: string,
) => {

    const token = await getToken();
    return api.post(
        '/messages',
        {
            receiver_id: receiverId,
            message: message,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};



export const getConversations = async () => {

    const token = await getToken();
    return api.get(
        "/messages/conversations",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};