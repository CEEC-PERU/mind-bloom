import axios, { AxiosError } from 'axios';
import { NotificationPost } from "../interfaces/Notification";
import { API_NOTIFICATIONS } from "../utils/Endpoints";

export const sendRegisterNotification = async (Result: NotificationPost, userToken: string): Promise<void> => {
    try {
      const response = await axios.post(API_NOTIFICATIONS, Result, {
        headers: {
          Authorization: userToken,
          'Content-Type': 'application/json',
        },
      });
      console.log('Ntofication Data:', response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      
      if (axiosError.response?.status === 403) {
        console.log('Permission Denied: You do not have access to this resource.');
      } else {
        console.log('Error token notification result:', error);
      }
      throw error;
    }
  };