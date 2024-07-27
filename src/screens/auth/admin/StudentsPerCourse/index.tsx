import { Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { CardStudent, LoadIndicator } from '../../../../components'
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import { RootStackParamListAdmin } from '../../../../interfaces/NavigationInterfaces';
import { useStudentDataPerCourse } from './hooks/useStudentDataPerCourse';
import { styles } from './styles';
import { ScrollView } from 'react-native-gesture-handler';

type StudentsPerScreenProps = RouteProp<RootStackParamListAdmin, 'StudentsPerCourse'>;


export default function StudentsPerCourse() {
  const route = useRoute<StudentsPerScreenProps>();
  const { params } = route;
  const { fetchData, isLoading, studentDataPerCourse } = useStudentDataPerCourse(params.courseId);
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  )
  if (isLoading) {
    return <LoadIndicator animating={true} size='large' />
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeaderBold}>Estudiantes</Text>
        <Text style={styles.textHeader}>Ahora cuenta con {studentDataPerCourse?.length} estudiantes</Text>
      </View>
      <ScrollView style={styles.scrollViewContent}>
        {studentDataPerCourse?.map(student => (
          <CardStudent cardType='course' student={student.User} key={student.User.user_id} />
        ))}
      </ScrollView>
    </View>
  )
}
