import axios from 'axios';
import { ENDPOINT } from './endpoints';
import { TUrlData } from '../types';

const { VITE_API_URL } = import.meta.env;

export const axiosInstance = axios.create({
    baseURL: VITE_API_URL,
    // headers: {
    //     common: {
    //         Accept: 'application/json',
    //     },
    // },
    responseType: 'json',
});

axiosInstance.interceptors.response.use(
    (response) => {
        console.log(response.data)
        return response
    },
    (error) => Promise.reject(error)
);

export const simplifyAPI = async (data: Partial<TUrlData>): Promise<TUrlData> => {
    try {
        const response = await axiosInstance.post<TUrlData>(ENDPOINT.ADD, data);
        return response.data;
    } catch (error) {
        return Promise.reject(console.error(error));
    }
};

export const getAll = async (): Promise<TUrlData[]> => {
    try {
        const response = await axiosInstance.get(ENDPOINT.ALL);

        return response.data;

    } catch (error) {
        return Promise.reject(console.error(error));
    }
};
