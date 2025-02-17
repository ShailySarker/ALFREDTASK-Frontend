import axios from 'axios';
import { BASE_URL } from '../config/envConfig';

export const getToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.accessToken;
};

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
});
