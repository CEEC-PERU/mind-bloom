import axios, { AxiosError } from 'axios';
import { API_REQUIREMENT_URL ,API_POST_FILE , API_POST_IMAGE} from "../utils/Endpoints";
import {Requirement , RequirementPost } from "../interfaces/RequirementInterface";
import { ImageResponse } from "../interfaces/ImageInterfaces";


export const getRequirementAll  = async ( userToken: string): Promise<Requirement[]> => {
    try {
      const response = await axios.get(`${API_REQUIREMENT_URL}`, {
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


  export const sendRequirement = async (Result: RequirementPost, userToken: string): Promise<void> => {
    try {
      const response = await axios.post(API_REQUIREMENT_URL, Result, {
        headers: {
          Authorization: userToken,
          'Content-Type': 'application/json',
        },
      });
      console.log('Requirement result sent successfully:', response.data);
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



  export const PostImage = async (fileUri: string, fileName: string) => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: fileUri,
        type: 'application/pdf', // Cambia el tipo a 'application/pdf'
        name: 'image.pdf'
      } as any);  
      const configObject = {
        method: 'POST',
        url: `${API_POST_IMAGE}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        }
      };
      const response = await axios<ImageResponse>(configObject);
      if (response.data)
        return response.data;
      else
        return null;
      
    } catch (error) {
      console.error(error, 'customer service');
      throw error;
    }
  }