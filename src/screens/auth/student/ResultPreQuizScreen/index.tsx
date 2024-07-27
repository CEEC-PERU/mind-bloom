
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../navigation/StudentDrawer';
import { Icon } from '@rneui/themed';
type ResultPreQuizScreenRouteProp = RouteProp<RootStackParamList, 'ResultPreQuiz'>;

const ResultPreQuizScreen: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
  const route = useRoute<ResultPreQuizScreenRouteProp>();
  const { totalQuestions, totalScore, tiempo , effectiveness , course_id} = route.params;
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };
  const handleGetPosition = () => {
    navigation.navigate('Module', {
      course_id : course_id
    });
  };
console.log("CURSO:", course_id)
console.log("TIEMPO:",tiempo)
console.log("CORRECT_ASNWERS:",totalScore)
console.log("CORRECT_ASNWERS:", totalQuestions)
  const getMessageAndImage = () => {
    let message = '';
    let  estrella1 , estrella2 , estrella3 = null;
    const estrella_vacia = 'https://res.cloudinary.com/dk2red18f/image/upload/v1709006874/CEEC/PREQUIZZ/qvch55jhsig6tyyozvsg.png';
    const estrella_llena = 'https://res.cloudinary.com/dk2red18f/image/upload/v1709006907/CEEC/PREQUIZZ/ccgewx1znph4pxibnmaz.png';

    if (totalScore < totalQuestions / 2) {
      message = '¡Necesitas repasar la clase!';
      estrella1 = estrella_llena;
      estrella2 = estrella_vacia;
      estrella3 = estrella_vacia;
    } else if (totalScore < totalQuestions) {
      message = '¡Nada mal pero puedes mejorar!';
      estrella1 = estrella_llena;
      estrella2 = estrella_llena;
      estrella3 = estrella_vacia;
    } else {
      message = '¡Eres realmente el rey del saber!';
      estrella1 = estrella_llena;
      estrella2 = estrella_llena;
      estrella3 = estrella_llena;
    }

    return { message, estrella1, estrella2, estrella3 };
  };
  const { message , estrella1, estrella2, estrella3} = getMessageAndImage();
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Score - Mind Bloom </Text>
      <View style={styles.starContainer}>
      <View style={styles.starImageRow}>
        <Image source={{ uri: estrella1 }} style={styles.star1} />
        <Image source={{ uri: estrella2 }} style={styles.star2} />
        <Image source={{ uri: estrella3 }} style={styles.star3} />
        </View>
        <View style={styles.starImageContainer}>
     
        <Image
          source={require('./../../../../../assets/images/prequizz_score/score_prequiz.png')} // Ajusta la ruta de la imagen
          style={styles.emojiImage}
        />
           <Text style={styles.points}>{totalScore} PUNTOS</Text>
        </View>
        <Text style={styles.title}> {message}</Text>
        <View style={styles.circlesContainer}>
          <View style={styles.circle}>
          <Text style={styles.circleText}>{formatTime(tiempo)}</Text>
            <Text style={styles.circleText}>Duración</Text>
          </View>
          <View style={styles.circle}>
          <Text style={styles.circleText}> {effectiveness}% </Text>
            <Text style={styles.circleText}>Efectividad</Text>
          </View>

        </View>
        <TouchableOpacity onPress={handleGetPosition} style={styles.positionButton}>
      <Icon name="arrow-left" size={28} color="white" /> 
      </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
   points: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -70 }, { translateY: -20 }],
    fontSize: 27,
    color: 'white',
    fontWeight: 'bold'
  },
  title: {
   marginTop:40,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4951FF',
    textAlign: 'center'
  },
  starContainer: {
    position: 'relative',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#FFFFFF'
  },
  starImageContainer: {
    position: 'relative',
    width: 180, // Ajusta el ancho según sea necesario
    height: 180, // Ajusta el alto según sea necesario
  },
  emojiImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  
  },
  circlesContainer: {
    flexDirection: 'row',
    marginTop: 40,
    maxWidth: '100%', // Establecer el ancho máximo para evitar desbordamiento
  },
  circle: {
    flex: 1, // Ocupa espacio igual
    height: 90, // Ajusta el alto según sea necesario

    marginHorizontal: 10, // Ajusta el espaciado entre los círculos
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    fontSize: 22,
    marginTop: 6,
    color: '#4951FF',
    fontWeight: 'bold',
  },
  redirectText: {
    marginTop: 30,
    fontSize: 16,
    color: '#4951FF',
    textDecorationLine: 'underline',
  },
  positionButton: {
    marginTop: 40,
    backgroundColor: '#4951FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  positionButtonText: {
    color: 'white',
    fontSize: 16,
  },
  star1: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
   marginTop:40,
  },
  star2: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  marginTop:20
  },
  star3: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
      marginTop:40
  },
  starImageRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});

export default ResultPreQuizScreen;
