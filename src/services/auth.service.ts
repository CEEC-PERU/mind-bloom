import { LoginResponse, LoginRequest } from "../interfaces/UserInterfaces";
import axios, { AxiosError } from 'axios';
import { API_AUTH_URL } from "../utils/Endpoints";

export const loginService = async ({ email, password }: LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await axios.post(API_AUTH_URL, { email, password });
        return response.data
    } catch (error) {
        const axiosError = error as AxiosError<LoginResponse>
        if (axiosError.response?.status === 401) {
            return axiosError.response.data;
        }
        console.error("Error in login Service:", error);
        throw error
    }
};
