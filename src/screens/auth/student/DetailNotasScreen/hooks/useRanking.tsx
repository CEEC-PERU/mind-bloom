import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../context/AuthContext';
import { getRankingStudent } from '../../../../../services/notas.service';
import { RankingStudent } from '../../../../../interfaces/PrequizzResultInterface';

export const useRanking = (courseId: number) => {
  const { userInfo, userToken } = useAuth();
  const [ranking, setRanking] = useState<number | null>(null);
  const user = userInfo as { id: number };

  useEffect(() => {
    const fetchRankingData = async () => {
      if (courseId && typeof userInfo !== 'string' && userToken) {
        try {
          const user = userInfo as { id: number; role: number; email: string; client_id: number };
          const rankingResponse = await getRankingStudent(user.id, courseId, user.client_id, userToken);
          console.log("RANKING", rankingResponse);
          setRanking(rankingResponse.ranking);
        } catch (error) {
          console.error('Error fetching ranking data:', error);
        }
      }
    };
    fetchRankingData();
  }, [courseId, userToken]);

  return { ranking };
};
