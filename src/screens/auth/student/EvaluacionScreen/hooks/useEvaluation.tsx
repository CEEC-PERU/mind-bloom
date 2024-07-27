
import { useEffect, useState } from 'react';
import { getEvaluationModuleId } from '../../../../../services/quizz.service';
import { Evaluation} from '../../../../../interfaces/EvaluationInterface';
import { useAuth } from '../../../../../context/AuthContext';

export const useEvaluation = (moduleId: number) => {
    const { userToken } = useAuth();
    const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchEvaluationData = async () => {
        if (moduleId && userToken) {
          try {
            const evaluationData = await getEvaluationModuleId(moduleId, userToken);
            console.log('Evaluation Data:', evaluationData);
      
            setEvaluations(Array.isArray(evaluationData) ? evaluationData : [evaluationData].filter(Boolean));
            console.log(Array.isArray(evaluationData) ? evaluationData : [evaluationData].filter(Boolean))
          } catch (error) {
            console.error('Error fetching evaluation data:', error);
          } finally {
            setLoading(false);
          }
        }
      };
  
      fetchEvaluationData();
    }, [moduleId, userToken]);
  
    return { evaluations, loading };
  };
  