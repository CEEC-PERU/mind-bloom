import { Text, View, ScrollView } from 'react-native'
import React, {useEffect} from 'react'
import { RootStackParamListAdmin } from '../../../../interfaces/NavigationInterfaces';
import { RouteProp, useRoute } from '@react-navigation/native';
import useCourse from './hooks/useCourse';
import { LoadIndicator, ModuleCardAdmin } from '../../../../components';
import { styles } from './styles';

type DetailsTestScreenRouteProp = RouteProp<RootStackParamListAdmin, 'Course'>;

export default function CourseScreen() {
  const route = useRoute<DetailsTestScreenRouteProp>();
  const { params } = route;
  const { course, loading, error } = useCourse(params.courseId);
  if (loading || null) {
    return <LoadIndicator animating={true} size='large' />
  }
  return (
    <ScrollView style={styles.container}>
      <Text>Módulos</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        
      </ScrollView>
    </ScrollView>
  )
}

