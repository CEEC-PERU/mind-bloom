import axios, { AxiosError } from 'axios';
import { PrequizzResult , PrequizzResultCourse , PrequizzResultUserCourse} from "../interfaces/PrequizzResultInterface";
import { API_EVALUATIONS_PREQUIZZRESULT_URL , API_PREQUIZZ_RESULT_BY_COURSE , API_PREQUIZZ_RESULT_BY_COURSEANDUSER} from "../utils/Endpoints";

export const getPrequizzCourseId  = async (course_id: number, userToken: string): Promise<PrequizzResultCourse[]> => {
    try {
      const response = await axios.get(`${API_PREQUIZZ_RESULT_BY_COURSE}/${course_id}`, {
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

export const sendPreQuizResult = async (PrequizzResult: PrequizzResult, userToken: string): Promise<void> => {
    try {
      const response = await axios.post(API_EVALUATIONS_PREQUIZZRESULT_URL , PrequizzResult, {
        headers: {
          Authorization: userToken,
          'Content-Type': 'application/json',
        },
      }); 
      // Log or handle the response if needed
      console.log('Quiz result sent successfully:', response.data);
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

  
// Ejemplo de cómo debería ser la función updatePreQuizResult
export const updatePreQuizResult = async (pre_result_id: number, puntaje: number, efectividad: number, userToken: string): Promise<void> => {
  try {
    const response = await axios.put(`${API_EVALUATIONS_PREQUIZZRESULT_URL}/${pre_result_id}`, { puntaje, efectividad }, {
      headers: {
        Authorization: userToken,
        'Content-Type': 'application/json',
      },
    });
    // Log or handle the response if needed
    console.log('Quiz result updated successfully:', response.data);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 403) {
      console.error('Permission Denied: You do not have access to this resource.');
    } else {
      console.error('Error while updating quiz result:', error);
    }
    throw error;
  }
};



  
  export const getPrequizzUserCourse  = async (user_id: number,  course_id: number, userToken: string): Promise<PrequizzResultUserCourse[]> => {
    try {
      const response = await axios.get(`${API_PREQUIZZ_RESULT_BY_COURSEANDUSER}/${user_id}/${course_id}`, {
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