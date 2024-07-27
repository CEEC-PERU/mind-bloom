// Importar useEffect y useState desde React
import { useEffect, useState, useCallback } from 'react';

// Importar el hook useAuth del contexto de autenticación
import { useAuth } from '../../../../../context/AuthContext';

// Importar el tipo de datos Diccionario desde la interfaz de DiccionarioInterface
import { Diccionario } from '../../../../../interfaces/DiccionarioInterface';

// Definir el hook useDiccionario
export const useDiccionario = (moduleId: number) => {
  // Definir estados para almacenar datos del cuestionario
  const [questions, setQuestions] = useState<Diccionario[] | null>(null);
  const [ques, setQues] = useState<number>(0);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false); // Estado para mostrar la respuesta correcta
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { userToken } = useAuth(); // Obtener el token de autenticación del contexto de autenticación
  const [totalScore, setTotalScore] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [isIncorrectSelected, setIsIncorrectSelected] = useState<boolean>(false);
  const [showIncorrectIcon, setShowIncorrectIcon] = useState<boolean>(false);
  const [showHappyEmoji, setShowHappyEmoji] = useState<boolean>(false); // 
  // Función para obtener el diccionario del servidor
  const getDiccionario = useCallback(async () => {
    setIsLoading(true); // Establecer isLoading en true mientras se carga el diccionario
    const url = `https://ceec-web-api.onrender.com/api/dictionary/by-module/${moduleId}`; // URL para obtener el diccionario del módulo
    try {
      const headers = {
        Authorization: userToken || '', // Establecer el token de autenticación en las cabeceras de la solicitud
      };
      const res = await fetch(url, { headers }); // Realizar la solicitud para obtener el diccionario
      const data = await res.json(); // Convertir la respuesta en formato JSON
      setQuestions(data); // Establecer el diccionario en el estado questions
      setTotalQuestions(data.length); // Establecer la cantidad total de palabras en el diccionario
      setOptions(generateOptionsAndShuffle(data[0])); // Generar y mezclar las opciones de respuesta para la primera palabra
    } catch (error) {
      console.error('Error fetching dictionary:', error); // Manejar cualquier error ocurrido durante la obtención del diccionario
    } finally {
      setIsLoading(false); // Establecer isLoading en false después de completar la carga del diccionario
    }
  }, [userToken, moduleId]); // Dependencias de la función getDiccionario

  // Efecto para cargar el diccionario al montar el componente o cuando cambie el moduleId
  useEffect(() => {
    getDiccionario();
  }, [getDiccionario]);

  // Función para manejar el avance a la siguiente palabra
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
  const generateOptionsAndShuffle = (_question: Diccionario) => {
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

  // Función para calcular la efectividad en base a las palabras respondidas
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

  // Retornar los estados y funciones necesarios para la pantalla del diccionario
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
    setIsCorrect,
    setSelectedOption,
    isIncorrectSelected,
    showCorrectAnswer,
    showIncorrectIcon,
    showHappyEmoji
  };
};