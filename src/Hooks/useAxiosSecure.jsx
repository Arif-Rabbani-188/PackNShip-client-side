import axios from 'axios';
import React, { use } from 'react';
import { Authconext } from '../Context/AuthContext/AuthContext';

const axioxsInstance = axios.create({
    baseURL: 'https://pick-ns-hiip-serversite.vercel.app',
    withCredentials: true,
});

const useAxiosSecure = () => {

    const {logout, tokenUser} = use(Authconext);

    // const token = localStorage.getItem('access-token');

    const token = tokenUser?.accessToken || null;

    // Interceptor to handle resquests

    axioxsInstance.interceptors.request.use((config) => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    // Interceptor to handle responses

    axioxsInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                await logout();
                console.error('Unauthorized or forbidden request, user logged out.');
            }
            return Promise.reject(error);
        }
    );
    return axioxsInstance;
}

export default useAxiosSecure;