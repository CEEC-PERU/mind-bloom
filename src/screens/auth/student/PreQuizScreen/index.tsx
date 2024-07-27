// PreQuizScreen.tsx
//ENCONTRAR ERRORES

import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../navigation/StudentDrawer';
import { quizScreenStyles as styles } from './style';
import { usePreQuiz } from './hooks/usePreQuizLogic';
import FloatingEmotion from './../../../../components/FloatingEmotion';
import { usePreQuizEva } from './hooks/usePreQuizResult'; 
type PreQuizScreenRouteProp = RouteProp<RootStackParamList, 'PreQuiz'>;

const PreQuizScreen: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
  const route = useRoute<PreQuizScreenRouteProp>();
  const { course_id } = route.params;
  const { questions,
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
           showCorrectAnswer} = usePreQuiz(course_id);


  const [elapsedTime, setElapsedTime] = useState<number>(0);
  

  const { handleShowResult } = usePreQuizEva(navigation , score , calculateEffectiveness, elapsedTime , totalQuestions , course_id);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  console.log("total_score:",totalScore)
  const renderOptionText = (opt: string) => {
    const words = decodeURIComponent(opt).split(' ');
    return words.length > 2 ? (
      <Text style={styles.optionTextLeft}>{decodeURIComponent(opt)}</Text>
    ) : (
      <Text style={styles.optionTextCenter}>{decodeURIComponent(opt)}</Text>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>

      <Text style={styles.elapsedTimeText}>{`Tiempo: ${elapsedTime}`}</Text>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator />
          </View>
        ) : questions && ques < questions.length ? (
          <View style={styles.parent}>
            <View style={styles.top}>
              {/* Agregar la imagen encima de la pregunta */}
              <Image
                source={{ uri: questions[ques].image_url }}
                style={styles.questionImage}
              />
              {questions[ques].question ? (
                <Text style={styles.question}>{decodeURIComponent(questions[ques].question)}</Text>
              ) : null}
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
                  
             {selectedOption === opt && isCorrect !== null && ( // Mostrar el emoji si la opción está seleccionada y se ha determinado si es correcta o no
               <Text style={styles.incorrectIcon}>{isCorrect ? '✅' : '❌'}</Text>
             )}

                  {renderOptionText(opt)}
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
                  <Text style={styles.buttonText } >Finalizar</Text>
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
export default PreQuizScreen;
