import axios, { AxiosError } from "axios"
import { API_POST_IMAGE } from "../utils/Endpoints"
import { ImageResponse } from "../interfaces/ImageInterfaces";



export const PostImage = async (formData: FormData) => {
    try {
        const configObject = {
            method: 'POST',
            url: `${API_POST_IMAGE}`,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
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