import { ModuleCard } from '../../../../components';
import React, { useState } from 'react';
import { ScrollView, Text, View, Image, ImageBackground, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../navigation/StudentDrawer';
import { Card, Icon } from '@rneui/themed';
import { useModuleScreen } from './hooks/useModule';
import { moduleScreenStyles as styles } from './style';
import { Module } from "../../../../interfaces/CourseInterfaces";
import { Icon as IconRNP } from 'react-native-paper';
import { CustomSearcher } from '../../../../components';
type ModuleScreenRouteProp = RouteProp<RootStackParamList, 'Module'>;

const ModuleScreen: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
  const route = useRoute<ModuleScreenRouteProp>();
  const { course_id } = route.params;

  const { courseData, modules, isLoading, searchedText, setSearchedText } = useModuleScreen(course_id);

  const [selectedModule, setSelectedModuleId] = useState<number | null>(null);



  const content_list: Module[] = [
    {
      numbertype: 2,
      module_id: selectedModule || 0,
      contentName: "Material de clase",
      icon: <Icon name="movie" size={30} color="#4951FF" />,
    },
    {
      numbertype: 1,
      module_id: selectedModule || 0, // Si selectedModule es null, asigna 0
      contentName: "Diccionario",
      icon: <Icon name="article" size={30} color="#4951FF" />,
    },
    
    {
      numbertype: 3,
      module_id: selectedModule || 0,
      contentName: "FlashCard",
      icon: <Icon name="bookmarks" size={30} color="#4951FF" />,
    },
    {
      numbertype: 4,
      module_id: selectedModule || 0,
      contentName: "Evaluación",
      icon: <Icon name="wysiwyg" size={30} color="#4951FF" />,
    },
  ];
  const handleModuleClick = (moduleId: number, numbertype: number) => {
    setSelectedModuleId(moduleId);

    switch (numbertype) {
      case 1:
        navigation.navigate('Diccionario', { moduleId , course_id});
        break;
      case 2:
        navigation.navigate('Material', { moduleId });
        break;
      case 3:
        navigation.navigate('FlashCard', { moduleId });
        break;
      case 4:
        navigation.navigate('Evaluacion', { moduleId , course_id});
        break;
      default:
        // Manejo para casos adicionales
        break;
    }
  };
  if (isLoading) return (
    <View style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <ActivityIndicator size="large" color="#4951FF" />
    </View>
  )

  return (
    <ScrollView style={styles.container}>

      {courseData ? (
        <View style={styles.containercourse}>
          <View style={styles.courseInfo}>
            <View style={styles.courseImageContainer}>
              <Image source={{ uri: courseData.image }} style={styles.courseImage} />
              <View style={styles.courseImageOverlay} />
              <Text style={styles.courseTitle}>{courseData.name}</Text>
              <Text style={styles.courseDescription}>{courseData.description}</Text>
            </View>
          </View>
        </View>

      ) : null}

      <Text style={styles.subtitulo}>Contenido del Curso</Text>
      <View style={styles.searcher} >
        <CustomSearcher onSearch={setSearchedText}  backgroundColor="#FFFFFF" />
      </View>
      {modules.map((module) => (
        <React.Fragment key={module.module_id}>

          <View style={{ paddingHorizontal: 15 }}>
            <ModuleCard
              modules={content_list}
              namemodulo={` ${module.name}`}
              handleModuleClick={(moduleId, numbertype) => handleModuleClick(module.module_id, numbertype)}
            />
          </View>

          <View style={styles.divider} />
        </React.Fragment>
      ))}
      <Card.Divider />
      <View
        style={{
          paddingHorizontal: 15,
          marginBottom:20
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#FFD352", 
            paddingHorizontal: 15,
            paddingVertical: 20,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            columnGap: 10
          }}
          onPress={() => navigation.navigate('PreQuiz', { course_id })}
        >
          <IconRNP size={30} source={"book-play"} />
          <View style={{}}>
            <Text style={{fontWeight: "bold"}}>PREQUIZZ</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>

  );
};

export default ModuleScreen;