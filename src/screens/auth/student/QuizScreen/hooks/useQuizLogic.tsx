// useQuiz.tsx
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../../../../context/AuthContext';
import { Question } from '../../../../../interfaces/EvaluationInterface';
export const useQuiz = (evaluationId: number) => {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [ques, setQues] = useState<number>(0);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { userToken } = useAuth();
  const [totalScore, setTotalScore] = useState<number>(0); // estado para la puntuación total
  const [totalQuestions, setTotalQuestions] = useState<number>(0); //cantidad total de preguntas
  const [showHappyEmoji, setShowHappyEmoji] = useState<boolean>(false); // 
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false); // Estado para mostrar la respuesta correcta
// Función para obtener el cuestionario
  const getQuiz = useCallback(async () => {
    setIsLoading(true);
    const url = `https://ceec-web-api.onrender.com/api/quizzes/evaluacion/${evaluationId}`;
    try {
      const headers = {
        Authorization: userToken || '',
      };
      const res = await fetch(url, { headers });
      const data = await res.json();
      console.log("QUIZ", data)
       // Almacenar el cuestionario y generar opciones de respuesta
      setQuestions(data);
      setTotalQuestions(data.length); // Establecer la cantidad total de preguntas
      setOptions(generateOptionsAndShuffle(data[0]));
    } catch (error) {
      console.error('Error fetching quiz:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userToken, evaluationId]);

  useEffect(() => {
    getQuiz();
  }, [getQuiz]);
 // Función para manejar el avance a la siguiente pregunta
  const handleNextPress = () => {
    if (questions && ques < questions.length - 1) {
      setQues(ques + 1);
      setOptions(generateOptionsAndShuffle(questions[ques + 1]));
      setSelectedOption(null);
      setIsCorrect(null);
      setShowCorrectAnswer(false); 
    }
  };
 // Función para generar opciones de respuesta y mezclarlas
  const generateOptionsAndShuffle = (_question: Question) => {
    const options = [..._question.incorrect_answer];
    options.push(_question.correct_answer);

    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    return options;
  };
  // Función para manejar la selección de una opción de respuesta
  const handlSelectedOption = (_option: string) => {
    setSelectedOption(_option);
    if (questions && questions[ques] && _option === questions[ques].correct_answer) {
        setScore(score + questions[ques].points); // Sumar los puntos de la pregunta correcta
        setIsCorrect(true);
        setTotalScore(totalScore + questions[ques].points); // Actualizar la puntuación total
        setShowHappyEmoji(true);
    } else {
      setIsCorrect(false);
      setShowCorrectAnswer(true); 
      setShowHappyEmoji(false);
    }
  };
  
  // Función para calcular la efectividad en base a las preguntas respondidas
  const calculateEffectiveness = () => {
    if (totalQuestions === 0) {
      return 0; // Evitar dividir por cero
    }
    const effectiveness = (score / 20) * 100;
    return Math.round(effectiveness); // Redondear el resultado
  };
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };
 // Retornar los estados y funciones necesarios para la pantalla del cuestionario
  return {
    questions,
    ques,
    options,
    totalScore, 
    score,
    isLoading,
    selectedOption,
    isCorrect,
    totalQuestions,
    calculateEffectiveness,
    formatTime,
    handleNextPress,
    handlSelectedOption,
    showHappyEmoji ,
    showCorrectAnswer,
  };
};
