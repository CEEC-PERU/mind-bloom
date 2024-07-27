// useQuiz.tsx

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../../../../context/AuthContext'; // Importar el hook useAuth del contexto de autenticación
import { Question } from '../../../../../interfaces/EvaluationInterface'; // Importar el tipo de datos Question desde la interfaz de Evaluación

// Definir el hook usePreQuiz
export const usePreQuiz = (courseId: number) => {
  const [questions, setQuestions] = useState<Question[] | null>(null); // Estado para almacenar las preguntas del cuestionario
  const [ques, setQues] = useState<number>(0); // Estado para rastrear la pregunta actual
  const [options, setOptions] = useState<string[]>([]); // Estado para almacenar las opciones de respuesta
  const [score, setScore] = useState<number>(0); // Estado para almacenar la puntuación actual del usuario
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado para controlar si se está cargando el cuestionario
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // Estado para almacenar la opción seleccionada por el usuario
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // Estado para indicar si la respuesta seleccionada es correcta o no
  const { userToken } = useAuth(); // Obtener el token de autenticación del contexto de autenticación
  const [totalScore, setTotalScore] = useState<number>(0); // Estado para almacenar la puntuación total del usuario
  const [totalQuestions, setTotalQuestions] = useState<number>(0); // Estado para almacenar la cantidad total de preguntas en el cuestionario
  const [showHappyEmoji, setShowHappyEmoji] = useState<boolean>(false); // Estado para controlar si se debe mostrar el emoji de aplausos
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false); // Estado para mostrar la respuesta correcta
  // Función para obtener el cuestionario del servidor
  const getQuiz = useCallback(async () => {
    setIsLoading(true); // Establecer isLoading en true mientras se carga el cuestionario
    const url = `https://ceec-web-api.onrender.com/api/prequizz/by-course/${courseId}`; // URL para obtener el cuestionario del curso
    //const url = `http://192.168.0.11:4100/api/prequizz/by-course/${courseId}`;
    console.log(url); // Imprimir la URL en la consola
    try {
      const headers = {
        Authorization: userToken || '', // Establecer el token de autenticación en las cabeceras de la solicitud
      };
      const res = await fetch(url, { headers }); // Realizar la solicitud para obtener el cuestionario
      const data = await res.json(); // Convertir la respuesta en formato JSON
      console.log("QUIZ", data); // Imprimir el cuestionario en la consola
      // Almacenar el cuestionario y generar las opciones de respuesta
      setQuestions(data); // Establecer las preguntas en el estado questions
      setTotalQuestions(data.length); // Establecer la cantidad total de preguntas en el estado totalQuestions
      setOptions(generateOptionsAndShuffle(data[0])); // Generar y mezclar las opciones de respuesta para la primera pregunta
    } catch (error) {
      console.error('Error fetching quiz:', error); // Manejar cualquier error ocurrido durante la obtención del cuestionario
    } finally {
      setIsLoading(false); // Establecer isLoading en false después de completar la carga del cuestionario
    }
  }, [userToken, courseId]); // Dependencias de la función getQuiz

  useEffect(() => {
    getQuiz(); // Llamar a la función getQuiz al montar el componente o cuando cambie el courseId
  }, [getQuiz]);

  // Función para manejar el avance a la siguiente pregunta
  const handleNextPress = () => {
    if (questions && ques < questions.length - 1) {
      setQues(ques + 1); // Incrementar el índice de la palabra actual
      setOptions(generateOptionsAndShuffle(questions[ques + 1])); // Generar y mezclar las opciones de respuesta para la siguiente palabra
      setSelectedOption(null); // Reiniciar la opción seleccionada por el usuario
      setIsCorrect(null); // Reiniciar el estado de corrección de la respuesta
      setShowCorrectAnswer(false); // Reiniciar el estado para mostrar la respuesta correcta
    }
  };

  // Función para generar opciones de respuesta y mezclarlas
  const generateOptionsAndShuffle = (_question: Question) => {
    const options = [..._question.incorrect_answer]; // Copiar las respuestas incorrectas
    options.push(_question.correct_answer); // Agregar la respuesta correcta al arreglo de opciones

    // Mezclar las opciones de respuesta utilizando el algoritmo de Fisher-Yates
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    return options; // Devolver las opciones de respuesta mezcladas
  };

  // Función para manejar la selección de una opción de respuesta
  const handlSelectedOption = (_option: string) => {
    setSelectedOption(_option); // Establecer la opción seleccionada por el usuario
    if (questions && questions[ques] && _option === questions[ques].correct_answer) {
      // Verificar si la opción seleccionada es la respuesta correcta
      setScore(score + 1); // Incrementar la puntuación del usuario
      setIsCorrect(true); // Establecer que la respuesta es correcta
      setTotalScore(totalScore + questions[ques].points); // Actualizar la puntuación total del usuario
      setShowHappyEmoji(true); // Mostrar el emoji de aplausos
    } else {
      setIsCorrect(false);
      setShowCorrectAnswer(true); // Mostrar la respuesta correcta si la opción seleccionada es incorrecta
      setShowHappyEmoji(false);
    }
  };

  // Función para calcular la efectividad en base a las preguntas respondidas
  const calculateEffectiveness = () => {
    if (totalQuestions === 0) {
      return 0; // Evitar dividir por cero
    }
    const effectiveness = (score / totalQuestions) * 100; // Calcular la efectividad como un porcentaje
    return Math.round(effectiveness); // Redondear el resultado
  };

  // Función para formatear el tiempo en formato de minutos:segundos
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60); // Calcular los minutos
    const seconds = timeInSeconds % 60; // Calcular los segundos restantes
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`; // Devolver el tiempo formateado
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
    showHappyEmoji, // Agregar showHappyEmoji al retorno
    showCorrectAnswer
  };
};
