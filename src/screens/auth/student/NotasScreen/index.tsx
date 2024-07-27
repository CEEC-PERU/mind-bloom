import { StyleSheet, Text, View ,  ScrollView,  TouchableOpacity, Image} from 'react-native'
import React  from 'react';
import { Card, Icon } from '@rneui/themed';
import { useRoute, RouteProp,  NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../navigation/StudentDrawer';
import {useCourse } from './../HomeScreen/hooks/useCourse';
import {useNotasCurso } from './hooks/useCurso';
import { windowWidth, windowHeight } from '../../../../utils/Dimentions';




const NotasScreen: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
  const { courseData } = useCourse();
  //const {  notas} = courseData.campaignCourses.map(course => useNotasCurso(course.Course.course_id));
  return (
    <ScrollView style={styles.container}>
      {courseData.campaignCourses.length > 0 ? (
        courseData.campaignCourses.map((course, index) => (
        
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('DetailNotas', { course_id: course.Course.course_id })}
          >

            <Card
              key={index}
              containerStyle={[styles.cardContainer, { backgroundColor: course.Course.background_color }]}
            >
                   <View style={styles.cardContent}>
                    <View style={styles.imageContainer}>
                      <Image source={{ uri: course.Course.image }} style={styles.cardImage} />
                    </View>
                    <View style={styles.contentContainer}>
                      <Text style={textStyles.courseTitle}>{course.Course.name}</Text>
                      
           
                      {course.Course.logo  ? (
                      <View style={styles.logoContainer}>
                        
                      <Image source={{ uri: course.Course.logo }} style={styles.logo} />
                    </View>
                        ) : null}
                      </View>
                  </View>

     
          </Card>
        </TouchableOpacity>
        ))
      ) : (
        <Text>Cargando...</Text>
      )}
    </ScrollView>
  );
};
  const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
      marginLeft: 20,
      justifyContent: 'center',
    },
    cardContainer: {
      borderRadius: 20,
      width: windowWidth * 0.92,
      marginBottom: 15,
      marginTop:30,
    },
    logoContainer: {
      marginTop:10,
      marginLeft:80,
      width: 68, 
      height: 25, 
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    logo: {
      width: '100%', // Asegura que la imagen del logo se ajuste completamente al contenedor
      height: '100%',
    },
    container: {
      backgroundColor: '#F8F7FB',
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
    },
    imageContainer: {
      width: 130,
      height: 130,
      borderRadius: 65,
      overflow: 'hidden',
    },
    cardImage: {
      width: '100%',
      height: 180,
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
     
      
    },
    estadoCurso: {
        fontSize: 12,
        color: '#fff',
        marginTop: 20,
        marginLeft:10,
      },
    title: {
      fontSize: 20,
      color : '#4951FF',
    }, 
    icon: {
      marginLeft: 'auto', // Move icon to the right
      marginTop: 'auto', // Align icon to the bottom
    }
  });

  export const textStyles = StyleSheet.create({
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    courseTitle: {
      fontSize: 24,
      color: '#fff',
      fontWeight: 'bold',
      marginBottom: 0,
    },
    loadingText: {
      fontSize: 18,
      color: '#4951FF',
      textAlign: 'center',
    },
  });

  export default NotasScreen; 