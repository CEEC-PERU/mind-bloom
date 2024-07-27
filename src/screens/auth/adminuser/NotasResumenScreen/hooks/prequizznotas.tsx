
import { useEffect, useState } from 'react';
import { getNotasPreQuizz } from '../../../../../services/notas.service';
import { PrequizzNota} from '../../../../../interfaces/PrequizzResultInterface';
import { useAuth } from '../../../../../context/AuthContext';

export const usePrequizz = (userId: number , campaignId : number) => {
    const { userToken } = useAuth();
    const [notaspre, setNotasPre] = useState<PrequizzNota[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchPrequizzNotaData = async () => {
        if (campaignId && userToken) {
          try {
            const NotasPreData = await getNotasPreQuizz(3,2, userToken);
            console.log('NOTAS PREQUIZZ:', NotasPreData);
      
            setNotasPre(Array.isArray(NotasPreData) ? NotasPreData : [NotasPreData].filter(Boolean));
            console.log(Array.isArray(NotasPreData) ? NotasPreData : [NotasPreData].filter(Boolean))
          } catch (error) {
            console.error('Error fetching evaluation data:', error);
          } finally {
            setLoading(false);
          }
        }
      };
  
      fetchPrequizzNotaData();
    }, [campaignId,userId, userToken]);
  
    return { notaspre, loading };
  };
  