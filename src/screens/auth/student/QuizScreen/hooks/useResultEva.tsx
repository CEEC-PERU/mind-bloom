// useResultEva.tsx
import { NavigationProp } from '@react-navigation/native';
import { useQuiz } from './useQuizLogic';
import { useAuth } from '../../../../../context/AuthContext';
import { sendQuizResult  , getEvaluationUser , updateQuizResult} from '../../../../../services/evaluation.service';


export const useResultEva = (navigation: NavigationProp<any>, evaluationId: number , totalScore :number ,calculateEffectiveness: () => number , elapsedTime : number , totalQuestions : number , course_id : number) => {
  const { userToken, userInfo } = useAuth();
 
  const handleShowResult = async () => {
    try {
      if (userInfo && typeof userInfo !== 'string') {
        const user = userInfo as { id: number; role: number; email: string };

        const existingResults = await getEvaluationUser(user.id, evaluationId, userToken || '');

        if (existingResults && existingResults.length > 0) {
          // Si existen resultados, actualizar el resultado existente
          const resultId = existingResults[0].result_id;
          await updateQuizResult(resultId, totalScore, userToken || ''); // Use an empty string as a default value
        } else {
          // Si no existen resultados, enviar un nuevo resultado
          const quizResult = {
            evaluation_id: evaluationId,
            user_id: user.id,
            total_score: totalScore,
          };

          if (userToken) {
            await sendQuizResult(quizResult, userToken);
          } else {
            console.error('User token is null or undefined.');
            // Handle this case accordingly
          }
        }
        navigation.navigate('Result', {
          totalScore,
          elapsedTime,
          evaluationId,
          effectiveness: calculateEffectiveness(),
          totalQuestions, course_id
        });
      } else {
        console.error('User info is null or invalid.');
        // Handle this case accordingly
      }
    } catch (error) {
      // Handle errors or log them as needed
      console.error('Error while handling quiz result:', error);
    }
  };

  return { handleShowResult };
};