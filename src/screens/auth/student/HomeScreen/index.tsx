import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Button, ImageBackground, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';
import { Card, Icon } from '@rneui/themed';
import * as ScreenCapture from 'expo-screen-capture';
import { useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../navigation/StudentDrawer';
import { useCourse } from './hooks/useCourse';
import { useAuth } from '../../../../context/AuthContext';
import { windowWidth, windowHeight } from '../../../../utils/Dimentions'; // Importa las dimensiones
import { styles, textStyles } from './styles';
import { CustomSearcher } from '../../../../components';
import BackGroundSVG from '../../../../../assets/images/bg.svg'
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
  const { courseData, firstName } = useCourse();
  const { profileInfo } = useAuth();
  const [searchText, setSearchText] = useState<string>('');

  const hasPermissions = async () => {
    const { status } = await ScreenCapture.requestPermissionsAsync();
    return status === 'granted';
  };

  useEffect(() => {
    let subscription: any;

    const addListenerAsync = async () => {
      await ScreenCapture.preventScreenCaptureAsync();
      if (await hasPermissions()) {
        await ScreenCapture.preventScreenCaptureAsync();
      } else {
        console.error('Permissions needed to subscribe to screenshot events are missing!');
      }
    };
    addListenerAsync();

    return () => {
      subscription?.remove();
    };
  }, []);

 

  const filterCourses = (text: string) => {
    return courseData.campaignCourses.filter(course => course.Course.name.toLowerCase().includes(text.toLowerCase()));
  };
      
    
  const filteredData = filterCourses(searchText);
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>

      <View style={[styles.container,]}>
        <View style={{ position: "absolute", top: 400, left: "-35%" }}>
          <BackGroundSVG />
        </View>
        <View style={{ margin: 20 }}>
          <Text style={[textStyles.headerText, { color: '#3C63FF', fontSize: 40 }]}>¡Hola {firstName}!</Text>
          <CustomSearcher onSearch={setSearchText} />
        </View>
        <Text style={[textStyles.headerText, textStyles.courseTitle, { color: '#3C63FF', marginLeft: 20 }]}>Cursos</Text>
   
        <ScrollView contentContainerStyle={[styles.scrollViewContent, { zIndex: 100 }]}>
          {filteredData.length > 0 ? (
            filteredData.map((course, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('Module', { course_id: course.Course.course_id })}
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
            <Text style={textStyles.loadingText}>No se encontraron cursos.</Text>
          )}
        </ScrollView>
      </View>

    </KeyboardAvoidingView>
  );
};

export default HomeScreen;