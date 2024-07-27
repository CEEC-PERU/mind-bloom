// useResultEva.tsx
import { NavigationProp } from '@react-navigation/native';
import { usePreQuiz } from './usePreQuizLogic';
import { useAuth } from '../../../../../context/AuthContext';
import {sendPreQuizResult , updatePreQuizResult , getPrequizzUserCourse} from '../../../../../services/prequizzresult.service';

export const usePreQuizEva = (navigation: NavigationProp<any>, score :number ,calculateEffectiveness: () => number , elapsedTime : number , totalQuestions : number , course_id : number) => {
  const { userToken, userInfo } = useAuth();
 console.log("TOTAL_SCORE",score)
  const handleShowResult = async () => {
    try {
      if (userInfo && typeof userInfo !== 'string') {
        const user = userInfo as { id: number; role: number; email: string };

        const existingResults = await getPrequizzUserCourse(user.id, course_id, userToken || '');

        if (existingResults && existingResults.length > 0) {
          // Si existen resultados, actualizar el resultado existente
          const resultId = existingResults[0].pre_result_id;
          console.log(resultId);
          await updatePreQuizResult(resultId, score, calculateEffectiveness() ,  userToken || ''); // Use an empty string as a default value
        } else {
            console.log(score)
            console.log(calculateEffectiveness())
          // Si no existen resultados, enviar un nuevo resultado
          const quizResult = {
            course_id: course_id,
            user_id: user.id,
            puntaje: score,
            efectividad : calculateEffectiveness()
          };

          if (userToken) {
            await sendPreQuizResult(quizResult, userToken);
          } else {
            console.error('User token is null or undefined.');
            // Handle this case accordingly
          }
        }

        navigation.navigate('ResultPreQuiz', {
          totalScore : score,
          totalQuestions : totalQuestions , 
          tiempo  : elapsedTime ,
          course_id :course_id ,
          effectiveness: calculateEffectiveness(),
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