import axios, { AxiosError } from 'axios';
import { RankingEva } from "../interfaces/EvaluationInterface";
import { API_EVALUATIONS_RANKING_URL , API_RANKING_STUDENTS_EVALUATION , API_RANKING_EXCEL_COURSE , API_RANKING_CAMPAIGN_EVA} from "../utils/Endpoints";
import {UserEvaluation ,  ApiCampaign } from "../interfaces/RankingInterface";
import * as FileSystem from 'expo-file-system';

export const getRankingEvaluation  = async (evaluationId: number, userToken: string): Promise<RankingEva[]> => {
    try {
      const response = await axios.get(`${API_EVALUATIONS_RANKING_URL}/${evaluationId}`, {
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


  export const getRankingEvaluationbyCourse  = async (course_id: number,client_id: number, userToken: string): Promise<UserEvaluation[]> => {
    try {
      const response = await axios.get(`${API_RANKING_STUDENTS_EVALUATION}/${course_id}/${client_id}`, {
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
export const getRankingExcelCourse = async (course_id: number,client_id :number, userToken: string) => {
  try {
    const response = await axios.get(`${API_RANKING_EXCEL_COURSE}/${course_id}/${client_id}`, {
        headers: {
            Authorization: userToken,
        },
        responseType: 'arraybuffer' // to handle the response as a stream
    });

    const base64Str = Buffer.from(response.data, 'binary').toString('base64');
    const path = FileSystem.documentDirectory + 'mydatacourse.xlsx';
    await FileSystem.writeAsStringAsync(path, base64Str, { encoding: FileSystem.EncodingType.Base64 });
    console.log('File saved to ', path);
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


export const getRankingEvaluationbyCampaign  = async (campaign_id: number,client_id: number, userToken: string): Promise<ApiCampaign[]> => {
  try {
    const response = await axios.get(`${API_RANKING_CAMPAIGN_EVA}/${campaign_id}/${client_id}`, {
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

