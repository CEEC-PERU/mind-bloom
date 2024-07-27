import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../context/AuthContext';
import {UserEvaluation} from '../../../../../interfaces/RankingInterface';
import {getRankingEvaluationbyCourse} from '../../../../../services/ranking.service';

export const useRankingCourse = (course_id: number ) => {
  const { userInfo, userToken } = useAuth();
  const [usersevaluations, setUsersEvaluations] = useState<UserEvaluation[]>([]);

  useEffect(() => {
    const fetchUsersEvaluationsData = async () => {
      if (typeof userInfo !== 'string' && userToken) {
        try {
          const user = userInfo as { id: number; role: number; email: string  , client_id :number};
          const data = await getRankingEvaluationbyCourse(course_id,user.client_id ,userToken);
          console.log(data);
          setUsersEvaluations(data);
        } catch (error) {
          console.error('Error fetching module notas:', error);
          // Manejo de errores
        }
      }
    };
    fetchUsersEvaluationsData();
  }, [userInfo, userToken, course_id]);

  return { usersevaluations };
};