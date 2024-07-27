
import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity , Image , ScrollView} from 'react-native';
import { useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../navigation/StudentDrawer';
import { quizScreenStyles as styles  } from './style'; 
import { useQuiz } from './hooks/useQuizLogic';
import { useResultEva } from './hooks/useResultEva'; 
import FloatingEmotion from './../../../../components/FloatingEmotion';
type QuizScreenRouteProp = RouteProp<RootStackParamList, 'Quiz'>;

const QuizScreen: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
  const route = useRoute< QuizScreenRouteProp>();
  const { evaluationId , course_id } = route.params;
  const {
    questions,
    ques,
    options,
    score,
    isLoading,
    selectedOption,
    isCorrect,
    totalScore,
    formatTime,
    handleNextPress,
    handlSelectedOption,
    totalQuestions,
    calculateEffectiveness,
    showHappyEmoji ,
    showCorrectAnswer
  } = useQuiz(evaluationId);
  
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const { handleShowResult } = useResultEva(navigation, evaluationId , totalScore , calculateEffectiveness, elapsedTime , totalQuestions , course_id);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  
  return (
    
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <View style={styles.container}>
    <Text style={styles.elapsedTimeText}>{`Tiempo: ${formatTime(elapsedTime)}`}</Text>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>CARGANDO...</Text>
        </View>
      ) : questions && ques < questions.length ? (
        <View style={styles.parent}>
         <View style={styles.top}>
  <View style={styles.questionContainer}>
    {/* Agregar la imagen encima de la pregunta */}
    <Image
      source={{ uri: questions[ques].image_url }}
      style={styles.questionImage}
    />
    
 
  </View>
  <Text style={styles.question}>{decodeURIComponent(questions[ques].question)}</Text>
</View>

          <ScrollView style={styles.options}>
            {options.map((opt, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  // Aplicar el estilo para la opción seleccionada
                  selectedOption === opt && (isCorrect ? styles.correctOption : styles.incorrectOption),
                  // Aplicar el estilo para la opción no seleccionada si se está mostrando la respuesta correcta
                  selectedOption !== opt && showCorrectAnswer && questions[ques].correct_answer !== opt && styles.incorrectOption,
                  // Mostrar respuesta correcta en verde si no fue seleccionada por el usuario
                  selectedOption !== opt && showCorrectAnswer && questions[ques].correct_answer === opt && styles.correctOption,
                   // Aplicar el estilo para las opciones incorrectas si se ha seleccionado la respuesta correcta
       isCorrect && questions[ques].correct_answer !== opt && styles.incorrectOption,
                ]}
                onPress={() => handlSelectedOption(opt)}
                disabled={selectedOption !== null}
              >

                <Text style={styles.optionText}>{decodeURIComponent(opt)}</Text>

                {selectedOption === opt && isCorrect !== null && ( // Mostrar el emoji si la opción está seleccionada y se ha determinado si es correcta o no
               <Text style={styles.incorrectIcon}>{isCorrect ? '✅' : '❌'}</Text>
             )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.bottom}>
            {ques === questions.length - 1 && selectedOption !== null && (
              <TouchableOpacity
                style={styles.button}
                onPress={handleShowResult}
                disabled={selectedOption === null}
              >
                <Text style={styles.buttonText}>Finalizar</Text>
              </TouchableOpacity>
            )}
            {ques < questions.length - 1 && selectedOption !== null && (
              <TouchableOpacity style={styles.button} onPress={handleNextPress} disabled={selectedOption === null}>
                <Text style={styles.buttonText}>Siguiente</Text>
              </TouchableOpacity>
            )}
          </View>

        </View>
      ) : (
        <View style={styles.noQuestionsContainer}>
          <Text>No hay preguntas disponibles.</Text>
        </View>
      )}
   {isCorrect === false && selectedOption !== null && <FloatingEmotion gifSource={require('../../../../../assets/images/prequizz/triste_2.gif')} />}
{showHappyEmoji && selectedOption !== null && <FloatingEmotion gifSource={require('../../../../../assets/images/prequizz/feliz.gif')} />}

    </View>
    </ScrollView>
  );
};
export default QuizScreen;
