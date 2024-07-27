import * as SecureStore from 'expo-secure-store'
import jwtDecode from 'jwt-decode';
import axios from 'axios';
export const validateToken = async (token: string | null) => {
    try {
        if (token) {
            const decodedToken: { exp: number, iat: number, id: number } = jwtDecode(token);
            const expirationDate = new Date(decodedToken.exp * 1000);
            const currentDate = new Date();
            if (currentDate > expirationDate) {
                await SecureStore.deleteItemAsync('userToken');
                return false
            }
            axios.defaults.headers.common['Authorization'] = `${token}`
            return true
        }
        return false
    } catch (error) {
        console.error(error);
        return false
    }
}