
import { API_GET_SESSION_STATISTICS, API_GET_BASIC_STATISTICS, API_GET_SESSION_STATISTICS_USER , API_GET_SESSION_STATISTICS_CLIENT } from "../utils/Endpoints";
import { BasicStatistics, WeeklySessionInfo , UserSessionStatistics } from "../interfaces/StatisticsInterface";
import axios, { AxiosError } from 'axios';
export const GetBasicStatistics = async (client_id :number): Promise<BasicStatistics> => {
    try {
        const configObject = {
            method: 'GET',
            url: `${API_GET_BASIC_STATISTICS}/${client_id}`
        }
        const statistics = await axios<BasicStatistics>(configObject);
        return statistics.data;
    } catch (error) {
        console.error(error, 'customer service');
        throw error
    }
}

export const GetSessionStatistics = async (page: number = 0): Promise<WeeklySessionInfo> => {
    try {
        const configObject = {
            method: 'GET',
            url: `${API_GET_SESSION_STATISTICS}?page=${page}`
        }
        const sessionsPerWeek = await axios<WeeklySessionInfo>(configObject);
        return sessionsPerWeek.data;
    } catch (error) {
        console.error(error, 'customer service');
        throw error
    }
}

export const GetSessionStatisticsByUser = async (page: number = 0 , user_id :number): Promise<WeeklySessionInfo> => {
    try {
        const configObject = {
            method: 'GET',
            url: `${API_GET_SESSION_STATISTICS_USER}/${user_id}?page=${page}`
        }
        const sessionsPerWeek = await axios<WeeklySessionInfo>(configObject);
        return sessionsPerWeek.data;
    } catch (error) {
        console.error(error, 'customer service');
        throw error
    }
}



  export const GetSessionStatisticsByClient  = async (page: number = 0, client_id :number,userToken: string):  Promise<UserSessionStatistics | null> => {
    try {
        const response = await axios.get(`${API_GET_SESSION_STATISTICS_CLIENT}/${client_id}?page=${page}`, {
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