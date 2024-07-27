import { TouchableOpacity, Text, ScrollView, View } from 'react-native';
import { styles } from './styles';
import React, { useEffect } from 'react';
import { useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { CourseCardAdmin, LoadIndicator } from '../../../../components';
import useCoursesWithModules from './hooks/useCourses';
import { RootStackParamListAdmin } from '../../../../interfaces/NavigationInterfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { Icon } from 'react-native-paper';

type CursosScreenRouteProp = RouteProp<RootStackParamListAdmin, 'Cursos'>;

const CoursesScreen : React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
  const route = useRoute<CursosScreenRouteProp>();
  const { params } = route;
  const { coursesWithModules, loading, error, refreshCourses } = useCoursesWithModules(params.campaign_id);


  useFocusEffect(
    React.useCallback(() => {
      // Aquí puedes agregar cualquier lógica que necesites al regresar a esta pantalla
      refreshCourses();
    }, [])
  );
  if (loading) {
    return <LoadIndicator animating={true} size='large' />
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const navigateToCreateCourse = (campaign_id : number) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: "CreateCampaignCourse",
        params: {
          campaign_id
        },
      })
    )
  }

  const navigateToCreateModuleScreen = (courseId: number) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'CreateModule',
        params: {
          courseId
        },
      })
    );
  };

  const navigateToAddStudentsScreen = (courseId: number) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'AddStudentsToCourse',
        params: {
          courseId
        },
      })
    );
  };

  const navigateToStudentsPerCourseScreen = (courseId: number) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'StudentsPerCourse',
        params: {
          courseId
        },
      })
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={styles.container} >
        {coursesWithModules.map(course => (
          <CourseCardAdmin
            userCount={9}
            key={course.Course.course_id}
            courseId={course.Course.course_id}
            moduleCount={course.Course.modules.length}
            courseName={course.Course.name}
            createdAt={course.Course.created_at}
            background_color={course.Course.background_color}
            navigateToCreateModule={navigateToCreateModuleScreen}
          />
        ))}

      </ScrollView>
      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => navigateToCreateCourse( params.campaign_id )}>
        <Icon size={45} source={"plus-circle"} color='#4951FF' />
      </TouchableOpacity>
    </View>
  )
}

export default CoursesScreen;