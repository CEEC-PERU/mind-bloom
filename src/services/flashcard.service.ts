import axios, { AxiosError } from 'axios';
import { FlashCard } from "../interfaces/ContentModuleInterface";
import { API_FLASHCARD_URL } from "../utils/Endpoints";
import { FlashCardRequest } from '../interfaces/FlashCardInterfaces';

export const getFlashCardInfoById = async (module_id: number, userToken: string): Promise<FlashCard[]> => {
  try {
    const response = await axios.get(`${API_FLASHCARD_URL}/module/${module_id}`, {
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

export const postFlashCard = async (flashCard: FlashCardRequest, userToken: string) => {
  try {
    const response = await axios.post<{message?: string, error?: string}>(API_FLASHCARD_URL, flashCard, {
      headers: {
        Authorization: userToken,
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 403) {
      console.error('Permission Denied: You do not have access to this resource.');
    } else {
      console.error('Error while sending quiz result:', error);
    }
    throw error;
  }
} 