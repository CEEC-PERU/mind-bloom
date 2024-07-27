import axios, { AxiosError } from 'axios';
import { Campaign,CampaignUser, CampaignPost, TotalUser, UserNoAsignado, CampaignByUser } from "../interfaces/CampaignInterface";
import {
    API_CAMPAIGN_URL  ,API_CAMPAIGNUSER_BYUSERID_URL, API_CAMPAIGNS_ID_CLIENT_USER_URL , API_GET_CAMPAIGNS_USERS , API_GET_USERS_NO_ASIGNADO
} from "../utils/Endpoints";


//obtener todas las campañas 
export const GetAllCampaign = async (userToken: string):  Promise<Campaign | null> => {
    try {
        const response = await axios.get(`${API_CAMPAIGN_URL}`, {
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

  export const GetTotalUsesCampaign= async ( client_id:number ,user_id :number , userToken: string ):  Promise<TotalUser | null> => {
    try {
        const response = await axios.get(`${API_GET_CAMPAIGNS_USERS}/${client_id}/${user_id}`, {
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

  export const GetCampaignNotAsigned= async ( client_id:number , userToken: string ):  Promise<UserNoAsignado | null> => {
    try {
        const response = await axios.get(`${API_GET_USERS_NO_ASIGNADO}/${client_id}`, {
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
  
  //en proceso
  export const GetAllCampaignByClientUser = async ( client_id : number,user_id :number ,userToken: string):  Promise<CampaignUser | null> => {
    try {
        const response = await axios.get(`${API_CAMPAIGNS_ID_CLIENT_USER_URL}/${client_id}/${user_id}`, {
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

  export const PostCampaign = async (newCampaign: CampaignPost ) => {
    try {
        const configObject = {
            method: 'POST',
            url: API_CAMPAIGN_URL,
            data: newCampaign
        }
        const response = await axios<CampaignPost>(configObject);
        console.log(response.data)
        if (response.data)
            return response.data;
        else
            return null;
    } catch (error) {
        console.error(error);
        throw error
    }
}


export const GetCampaignUserByUserId= async ( user_id:number , userToken: string ):  Promise<CampaignByUser | null> => {
  try {
      const response = await axios.get(`${API_CAMPAIGNUSER_BYUSERID_URL}/${user_id}`, {
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