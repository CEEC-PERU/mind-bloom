import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity ,ScrollView  } from 'react-native';
import { useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../navigation/StudentDrawer';
import { Icon } from '@rneui/themed';
type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;

import { CommonActions } from '@react-navigation/native';
const   ResultScreen : React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
  const route = useRoute< ResultScreenRouteProp>();
  const { totalScore , elapsedTime , evaluationId , effectiveness , totalQuestions , course_id } = route.params;
  
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };
  const handleRedirect  = () => {
    navigation.navigate('Evaluacion', {
      evaluationId : evaluationId
    });
  };

  const handleGetPositio = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'StudentDrawer' }, // Asegúrate de reemplazar 'StudentDrawer' con el nombre correcto de tu pantalla de módulos
          { name: 'Module', params: { course_id: course_id } }
        ],
      })
    );
  };

  const handleGetPosition = () => {
    navigation.navigate('Ranking', {
      totalScore : totalScore ,  evaluationId : evaluationId
      
    });
  };
  const getMessageAndImage = () => {
    let message = '';
    let  estrella1 , estrella2 , estrella3 = null;
    const estrella_vacia = 'https://res.cloudinary.com/dk2red18f/image/upload/v1709006874/CEEC/PREQUIZZ/qvch55jhsig6tyyozvsg.png';
    const estrella_llena = 'https://res.cloudinary.com/dk2red18f/image/upload/v1709006907/CEEC/PREQUIZZ/ccgewx1znph4pxibnmaz.png';
  

    if (totalScore < 20 / 2) {
      message = '¡Necesitas repasar la clase!';
      estrella1 = estrella_llena;
      estrella2 = estrella_vacia;
      estrella3 = estrella_vacia;
    } else if (totalScore < 20) {
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
      <Text style={styles.title}>Score - Evaluación Final</Text>
      <View style={styles.starContainer}>
      <View style={styles.starImageRow}>
        <Image source={{ uri: estrella1 }} style={styles.star1} />
        <Image source={{ uri: estrella2 }} style={styles.star2} />
        <Image source={{ uri: estrella3 }} style={styles.star3} />
        </View>
        <View style={styles.starImageContainer}>
          <Image
            source={require('./../../../../../assets/images/prequizz_score/score_prequiz.png')}
            style={styles.starImage}
          />
          <Text style={styles.points}>{totalScore} PUNTOS</Text>
        </View>
        <Text style={styles.message} >{message}</Text>
        <View style={styles.circlesContainer}>
          <View style={styles.circle}>
          <Text style={styles.circleText}>{formatTime(elapsedTime)}</Text>
            <Text style={styles.circleText}>Duración</Text>
          </View>
          <View style={styles.circle}>
            <Text style={styles.circleText}> {effectiveness}% </Text>
            <Text style={styles.circleText}>Efectividad</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleRedirect}>
          <Text style={styles.redirectText}>¿QUIERES MEJORAR TU RESULTADO?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGetPosition} style={styles.positionButton}>
          <Text style={styles.positionButtonText}>TU POSICIÓN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleGetPositio} style={styles.positionButton2}>
      <Icon name="arrow-left" size={28} color="white" /> 
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 40,
    color: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4951FF',
    marginBottom: 10,
  },
  starContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  starImageContainer: {
    position: 'relative',
    width: 200, // Adjust the width as needed
    height: 200, // Adjust the height as needed
  },
  starImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
    marginTop:-40
  },
  points: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -70 }, { translateY: -40 }],
    fontSize: 27,
    color: 'white',
    fontWeight: 'bold'
  },
  circlesContainer: {
    flexDirection: 'row',
    maxWidth: '100%', // Set maximum width to prevent overflow
  },
  circle: {
    flex: 1, // Take up equal space
    height: 150, // Adjust the height as needed
    marginHorizontal: 10, // Adjust the spacing between circles
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    fontSize: 23,
    color: '#4951FF',
    fontWeight: 'bold',
    
  },
  message:{
    fontSize: 22,
    marginTop: 15,
    color: '#4951FF',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  redirectText: {
    fontSize: 16,
    color: '#4951FF',
    textDecorationLine: 'underline',
  },
  positionButton2: {
    marginTop: 20,
    backgroundColor: '#4951FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  positionButton: {
    marginTop: 20,
    backgroundColor: '#4951FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  positionButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ResultScreen;