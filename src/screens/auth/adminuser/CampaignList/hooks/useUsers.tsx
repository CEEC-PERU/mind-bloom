//EN PROCESO 
import { useEffect, useState } from 'react';
import {GetTotalUsesCampaign } from '../../../../../services/campaign.service';
import { TotalUser} from '../../../../../interfaces/CampaignInterface';
import { useAuth } from '../../../../../context/AuthContext';
export const useUsers = () => {
  const [ campaignstot, setCampaign] = useState<TotalUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { userInfo, userToken } = useAuth();

  useEffect(() => {
    const fetchCampaignData = async () => {
      if (userToken) {
        try {
          const user = userInfo as { id: number; role: number; client_id: number};
          const campaigndata = await GetTotalUsesCampaign( user.client_id , user.id, userToken);
          console.log(user.client_id, user.id)
          console.log("API",campaigndata)
          if (campaigndata === null) {
            setCampaign([]); //establece el estado a un array vacío
          } else if (Array.isArray(campaigndata)) {
            setCampaign(campaigndata); //establece el estado a ese array
          } else {
            setCampaign([campaigndata]); //campaigndata es un solo objeto Campaign, conviértelo en un array
          }
          console.log("campaigndata",campaigndata)
        } catch (error) {
          console.error('Error fetching ranking data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCampaignData();
  }, [userToken]); 

  return { campaignstot, loading };
};