import axios, { AxiosError } from 'axios';
import { Evaluation, EvaluationRequest, EvaluationResponse, EvaluationWithQuestions, Result } from "../interfaces/EvaluationInterface";
import { API_EVALUATION, API_EVALUATIONS_RESULT_URL, API_PREQUIZZ } from "../utils/Endpoints";
import { PrequizzRequest, PrequizzResponse } from '../interfaces/PrequizzInterface';


export const getEvaluationModuleId = async (module_id: number, userToken: string): Promise<Evaluation[]> => {
  try {
    const response = await axios.get(`${API_EVALUATION}/${module_id}`, {
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

export const sendQuizResult = async (Result: Result, userToken: string): Promise<void> => {
  try {
    const response = await axios.post(API_EVALUATIONS_RESULT_URL, Result, {
      headers: {
        Authorization: userToken,
        'Content-Type': 'application/json',
      },
    });
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

export const postEvaluation = async (evaluation: EvaluationWithQuestions, userToken: string) => {
  try {
    const response = await axios.post<EvaluationResponse>(API_EVALUATION, evaluation, {
      headers: {
        Authorization: userToken,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
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

export const postPrequizz = async (prequizz: PrequizzRequest[], userToken: string) => {
  try {
    const response = await axios.post<PrequizzResponse>(API_PREQUIZZ, prequizz, {
      headers: {
        Authorization: userToken,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
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