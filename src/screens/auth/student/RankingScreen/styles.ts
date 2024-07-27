import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#4951FF',
      marginTop: 20,
    },
    subtitle: {
      marginTop: 5,
      fontSize: 24,
      fontWeight: 'bold',
      color: '#4951FF',
    },
    rectangle: {
      width: '90%',
      height: 450,
      backgroundColor: '#D5D7FF',
      marginTop: 25,
      borderRadius: 20,
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    extraRectangle: {
      width: '90%',
      height: 150,
      backgroundColor: '#88D4FF',
      margin: 15,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    extraText1: {
      fontSize: 40,
      color: 'white',
      fontWeight: 'bold',
      marginBottom: 10,
    },
    extraText2: {
     fontWeight: 'bold',
      fontSize: 16,
      color: 'white',
      textAlign: 'center',
    },
    topCircleContainer: {
      alignItems: 'center',
    },
    bottomCircleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    circleContainer: {
      alignItems: 'center',
    },
    leftCircle: {
      marginRight: 22,
    },
    rightCircle: {
      marginLeft: 22,
    },
    circleImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    circleText: {
      fontSize: 14,
      color: '#000000',
      fontWeight: 'bold',
    },
    pointsContainer: {
      backgroundColor: '#4951FF',
      borderRadius: 5,
      marginTop: 9,
      width: 120,
      padding: 5,
    },
    pointsText: {
      fontSize: 14,
      color: 'white',
      textAlign: 'center',
    },
  });
  