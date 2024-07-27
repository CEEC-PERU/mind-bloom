import { useEffect, useState } from 'react';
import { getRankingEvaluation } from '../../../../../services/ranking.service';
import { RankingEva } from '../../../../../interfaces/EvaluationInterface';
import { useAuth } from '../../../../../context/AuthContext';

export const useRankingEvaluation = (evaluationId: number) => {
  const { userToken } = useAuth();
  const [ranking, setRanking] = useState<RankingEva[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRankingData = async () => {
      if (userToken) {
        try {
          const rankingData = await getRankingEvaluation(evaluationId, userToken);
          setRanking(rankingData);
          console.log(rankingData)
        } catch (error) {
          console.error('Error fetching ranking data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRankingData();
  }, [evaluationId, userToken]);

  return { ranking, loading };
};