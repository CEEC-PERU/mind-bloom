import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../context/AuthContext';
import {ApiCampaign} from '../../../../../interfaces/RankingInterface';
import { getRankingEvaluationbyCampaign} from '../../../../../services/ranking.service';

export const useRankingCampaign = (campaign_id: number) => {
  const { userInfo, userToken } = useAuth();
  const [usersevaluations, setUsersEvaluations] = useState<ApiCampaign[]>([]);

  useEffect(() => {
    const fetchUsersEvaluationsData = async () => {
      if (typeof userInfo !== 'string' && userToken) {
        try {
          const user = userInfo as { id: number; role: number; email: string , client_id : number};
          const data = await  getRankingEvaluationbyCampaign(campaign_id,user.client_id,  userToken);
          console.log("INFO-CAMPAIGN",data);
          setUsersEvaluations(data);
        } catch (error) {
          console.error('Error fetching module notas:', error);
        }
      }
    };
    fetchUsersEvaluationsData();
  }, [userInfo, userToken, campaign_id]);

  return { usersevaluations };
};