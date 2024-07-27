import { useEffect, useState } from 'react';
import {GetAllClients} from '../../../../../services/clients.service';
import { Campaign } from '../../../../../interfaces/CampaignInterface';
import { Client } from '../../../../../interfaces/ClientsInterface';
import { useAuth } from '../../../../../context/AuthContext';
export const useClients = () => {
  const [ clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { userInfo, userToken } = useAuth();

  useEffect(() => {
    const fetchCampaignData = async () => {
      if (userToken) {
        try {
          const data = await GetAllClients(userToken);
          if (data === null) {
            setClients([]); //establece el estado a un array vacío
          } else if (Array.isArray(data)) {
            setClients(data); //establece el estado a ese array
          } else {
            setClients([data]); //campaigndata es un solo objeto Campaign, conviértelo en un array
          }
          console.log(data)
        } catch (error) {
          console.error('Error fetching ranking data:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCampaignData();
  }, [userToken]); 

  return { clients, loading };
};