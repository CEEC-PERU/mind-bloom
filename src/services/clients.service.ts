import axios, { AxiosError } from 'axios';
import { Client , ClientPost, UserAdmin} from "../interfaces/ClientsInterface";
import {
    API_CLIENTS_URL , API_USERADMIN
} from "../utils/Endpoints";

//obtener todas las campañas 
export const GetAllClients = async (userToken: string):  Promise<Client | null> => {
    try {
        const response = await axios.get(`${API_CLIENTS_URL}`, {
          headers: {
            Authorization: userToken,
          },
        });
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 403) {
          console.error('Permission Denied: You do not have access to this resource.');
        } else {
          console.error('Error while fetching course data:', error);
        }
        throw error;
      }
  };


  export const GetUserAdmin = async (userToken: string):  Promise<UserAdmin | null> => {
    try {
        const response = await axios.get(`${API_USERADMIN}`, {
          headers: {
            Authorization: userToken,
          },
        });
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 403) {
          console.error('Permission Denied: You do not have access to this resource.');
        } else {
          console.error('Error while fetching course data:', error);
        }
        throw error;
      }
  };


  export const sendClients = async (Client: ClientPost, userToken: string): Promise<void> => {
    try {
      const response = await axios.post(API_CLIENTS_URL, Client, {
        headers: {
          Authorization: userToken,
          'Content-Type': 'application/json',
        },
      });
      console.log('Clients sent successfully:', response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 403) {
        console.error('Permission Denied: You do not have access to this resource.');
      } else {
        console.error('Error while sending quiz result:', error);
      }
      throw error;
    }
  };


  