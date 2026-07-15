import AsyncStorage from '@react-native-async-storage/async-storage';



export const saveToken = async (token: string) => {
    await AsyncStorage.setItem('access_token',token);
};


export const getToken = async () => {
    return await AsyncStorage.getItem('access_token');
};


export const removeToken = async () => {
    await AsyncStorage.removeItem('access_token');
};


export const saveRole = async (role: string
) => {
    await AsyncStorage.setItem('user_role',role );
};


export const getRole = async () => {
    return await AsyncStorage.getItem('user_role');
};


export const removeRole = async () => {
    await AsyncStorage.removeItem('user_role' );
};