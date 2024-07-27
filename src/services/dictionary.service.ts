import axios, { AxiosError } from "axios";
import { DictionaryRequest, DictionaryResponse } from "../interfaces/DictionaryInterfaces";
import { API_DICTIONARY } from "../utils/Endpoints";

export const postDictionary = async (dictionary: DictionaryRequest[], userToken: string) => {
  try {
    const response = await axios.post<DictionaryResponse>(API_DICTIONARY, { dictionary }, {
      headers: {
        Authorization: userToken,
      },
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      console.error('Permission Denied: You do not have access to this resource.');
    } else if (axiosError.response?.status === 400) {
      console.log(axiosError.response.data);
    } else {
      console.log(axiosError.response)
      console.error('Error while fetching module data:', error);
    }
    throw error;
  }
}