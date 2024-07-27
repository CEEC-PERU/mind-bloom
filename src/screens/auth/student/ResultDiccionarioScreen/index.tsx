import React from 'react';
import { Icon } from '@rneui/themed';
import { View, Text, StyleSheet, Image, TouchableOpacity ,ScrollView  } from 'react-native';
import { useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../navigation/StudentDrawer';

type ResultDiccionarioScreenRouteProp = RouteProp<RootStackParamList, 'ResultDiccionario'>;

const   ResultDiccionarioScreen : React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
  const route = useRoute< ResultDiccionarioScreenRouteProp>();
  const { totalQuestions, correctAnswers , course_id } = route.params;
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };
  const handleGetPosition = () => {
    navigation.navigate('Module' , {
      course_id: course_id
    });
  };

  const getMessageAndImage = () => {
    let message = '';
    let imageSource, estrella1 , estrella2 , estrella3 = null;
    const necesitasRepasar = 'https://res.cloudinary.com/dk2red18f/image/upload/v1709006848/CEEC/PREQUIZZ/ow40gsipk4rpxspixvzm.png';
    const puedesMejorarImage = 'https://res.cloudinary.com/dk2red18f/image/upload/v1709006864/CEEC/PREQUIZZ/drqdrqzjws2ltwqjccek.png';
    const reySaberURL = 'https://res.cloudinary.com/dk2red18f/image/upload/v1709006952/CEEC/PREQUIZZ/yyhjjq12kstinufbzvmi.png';
    const estrella_vacia = 'https://res.cloudinary.com/dk2red18f/image/upload/v1709006874/CEEC/PREQUIZZ/qvch55jhsig6tyyozvsg.png';
    const estrella_llena = 'https://res.cloudinary.com/dk2red18f/image/upload/v1709006907/CEEC/PREQUIZZ/ccgewx1znph4pxibnmaz.png';
  

    if (correctAnswers < totalQuestions / 2) {
      message = '¡Necesitas repasar la clase!';
      imageSource = necesitasRepasar;
      estrella1 = estrella_llena;
      estrella2 = estrella_vacia;
      estrella3 = estrella_vacia;
    } else if (correctAnswers < totalQuestions) {
      message = '¡Nada mal pero puedes mejorar!';
      imageSource = puedesMejorarImage;
      estrella1 = estrella_llena;
      estrella2 = estrella_llena;
      estrella3 = estrella_vacia;
    } else {
      message = '¡Eres realmente el rey del saber!';
      imageSource = reySaberURL;
      estrella1 = estrella_llena;
      estrella2 = estrella_llena;
      estrella3 = estrella_llena;
    }

    return { message, imageSource , estrella1, estrella2, estrella3 };
  };
  const { message, imageSource , estrella1, estrella2, estrella3} = getMessageAndImage();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Score - CEEC </Text>
      <View style={styles.starContainer}>
        <View style={styles.starImageRow}>
        <Image source={{ uri: estrella1 }} style={styles.star1} />
        <Image source={{ uri: estrella2 }} style={styles.star2} />
        <Image source={{ uri: estrella3 }} style={styles.star3} />
        </View>
        <Image source={{ uri: imageSource }} style={styles.starImage2} />
      </View>

      <Text style={styles.mensaje}> {message} </Text>
      <Text style={styles.circleText}>
        {correctAnswers} / {totalQuestions}
      </Text>
      <Text style={styles.circleText}>Correctas</Text>

      <TouchableOpacity onPress={handleGetPosition} style={styles.positionButton}>
      <Icon name="arrow-left" size={28} color="white" /> 
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    color: '#fff',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 70,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4951FF',
    marginBottom: 50,
  },
  mensaje: {
    fontSize: 24,
    color: '#4951FF',
    marginBottom: 0,
    marginTop: 30,
  },
  starContainer: {
    alignItems: 'center',
    top: -20, 
 
  },
  star1: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
   marginTop:20
  },
  star2: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  
  },
  star3: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
      marginTop:20
  },
  starImageRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  starImage2: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
 marginTop:-30
  },
  circleText: {
    fontSize: 30,
    marginBottom: 0,
    color: '#4951FF',
    fontWeight: 'bold',
    marginTop:25
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
    borderRadius: 5,
  },
  positionButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ResultDiccionarioScreen;