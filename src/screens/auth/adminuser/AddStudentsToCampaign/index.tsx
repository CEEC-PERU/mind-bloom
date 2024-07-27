import { Alert, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import { styles } from './styles'
import { ScrollView } from 'react-native-gesture-handler'
import { useCampaignAddStudents } from './hooks/useCampaignAddStudents'
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native'
import { RootStackParamListAdmin } from '../../../../interfaces/NavigationInterfaces'
import { CardStudent, CustomSearcher, LoadIndicator, MiniCardStudent } from '../../../../components'
import { CourseStudentRequest, Student } from '../../../../interfaces/StudentInterfaces'
import { Icon } from 'react-native-paper'
import { windowWidth } from '../../../../utils/Dimentions'
import { PostStudentsToCourses } from '../../../../services/course-student.service'
import { UserNoAsignado } from '../../../../interfaces/CampaignInterface'

type AddStudentScreenProps = RouteProp<RootStackParamListAdmin, 'AddStudentsToCampaign'>;



export default function AddStudentsToCourse() {
  const route = useRoute<AddStudentScreenProps>();
  const { params } = route;
  const {
    fetchData,
    isLoading,
    filteredData,
    setSearchedText,
    selectedStudents,
    setSelectedStudents
  } = useCampaignAddStudents();

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleSearch = (text: string) => {
    setSearchedText(text)
  }

  const handleAddStudent = (student: UserNoAsignado) => {
    const isStudentAlreadySelected = selectedStudents.some(selectedStudent => selectedStudent.user_id === student.user_id);
    if (isStudentAlreadySelected) {
      const updatedStudents = selectedStudents.filter(selectedStudent => selectedStudent.user_id !== student.user_id);
      setSelectedStudents(updatedStudents);
      return false;
    } else {
      setSelectedStudents([...selectedStudents, student]);
      return true;
    }
  }

  const addStudents = async () => {
    try {
      Alert.alert(
        'Confirmación',
        '¿Estás seguro de agregar a los estudiantes?',
        [
          {
            text: 'Cancelar',
            onPress: () => console.log('Cancelado'),
            style: 'cancel',
          },
          {
            text: 'Aceptar',
            onPress: () => {
              (async () => {
                const course_student_list: CourseStudentRequest[] = selectedStudents.map(student => {
                  return ({ campaign_id: params.campaign_id, user_id: student.user_id });
                });
                const response = await PostStudentsToCourses(course_student_list);
                if (response) {
                  Alert.alert("Éxito", response.message);
                  fetchData();
                  setSelectedStudents([]);
                }
              })()
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeaderBold}>Estudiantes disponibles</Text>
        <View style={styles.searcher}>
          <CustomSearcher onSearch={handleSearch} />
        </View>
        <ScrollView horizontal>
          <View style={styles.listStudentsToAdd}>
            {selectedStudents.map(student => (
              <MiniCardStudent key={student.user_id} student={student} />
            ))}
          </View>
        </ScrollView>
        <View style={styles.containerAdd}>
          <TouchableOpacity
            style={[
              styles.buttonAddAll,
              { backgroundColor: selectedStudents.length > 0 ? "#2B32CE" : "#C0B9FF" }
            ]}
            onPress={selectedStudents.length > 0 ? addStudents : () => { }}>
            <Icon size={45} source={"plus"} color='#fff' />
          </TouchableOpacity>
          <View style={{ width: windowWidth * 0.6, rowGap: 5 }}>
            <Text style={{ fontSize: 17, fontWeight: "600" }}>Agregar estudiantes al curso</Text>
            <Text style={{ fontSize: 14, }} numberOfLines={2} ellipsizeMode="tail">Si no encuentras algún estudiante, es posible que ya esté inscrito</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.scrollViewContent}>
        {isLoading ?
          <View style={styles.loadingContainer}>
            <LoadIndicator animating={true} size='large' />
          </View>
          : filteredData?.map(student => (
            <CardStudent cardType='add-to-course' student={student} key={student.user_id} addStudent={handleAddStudent} />
          ))
        }
      </ScrollView>
    </View>
  )
}
