import { useEffect, useState } from 'react';
import { GetAllCampaign } from '../../../../../services/campaign.service';
import { Campaign } from '../../../../../interfaces/CampaignInterface';
import { useAuth } from '../../../../../context/AuthContext';

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { userToken } = useAuth();

  const fetchCampaignData = async () => {
    if (userToken) {
      try {
        const campaigndata = await GetAllCampaign(userToken);
        if (campaigndata === null) {
          setCampaigns([]); //establece el estado a un array vacío
        } else if (Array.isArray(campaigndata)) {
          setCampaigns(campaigndata); //establece el estado a ese array
        } else {
          setCampaigns([campaigndata]); //campaigndata es un solo objeto Campaign, conviértelo en un array
        }
        console.log(campaigndata);
      } catch (error) {
        console.error('Error fetching campaign data:', error);
        setError('Error fetching campaign data');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCampaignData();
  }, [userToken]); 

  
  const refreshCampaigns = () => {
    fetchCampaignData();
  };

  return { campaigns, loading , refreshCampaigns };
};
