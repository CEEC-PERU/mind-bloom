import { TouchableOpacity, Text, ScrollView, View } from 'react-native';
import React, { useCallback } from 'react';
import { useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { styles } from './styles';
import { CampaignCardAdmin, LoadIndicator } from '../../../../components';
import {useCampaignByUserId}  from './hooks/useCampaignByUserId';
import { RootStackParamListAdmin } from '../../../../interfaces/NavigationInterfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { Icon } from 'react-native-paper';
import { getCurrentDateAsString } from '../../../../utils/Dates';


type CampaignByUserScreenRouteProp = RouteProp<RootStackParamListAdmin, 'CampaignByUserScreen'>;


const CampaignByUserScreen: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
    const route = useRoute<CampaignByUserScreenRouteProp>();
    const { params } = route;


  const { loading, campaigns, refreshCampaigns } = useCampaignByUserId(params.user_id);

  const navigateToCreateCourse = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: "CreateCourse"
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
  /*
  useFocusEffect(
    React.useCallback(() => {
      // Aquí puedes agregar cualquier lógica que necesites al regresar a esta pantalla
      refreshCampaigns();
    }, [])
  );
 */
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={styles.container} >
       
        {campaigns.map(campaign => (
          <TouchableOpacity key={campaign.campaign_id}  onPress={() => navigation.navigate('Cursos', { campaign_id: campaign.campaign_id })}>
            <CampaignCardAdmin
              userCount={9}
              key={campaign.campaign_id}
              courseId={campaign.campaign_id}
              moduleCount={campaign.campaign_id}
              courseName={campaign.Campaign.name}
              createdAt={campaign.Campaign.limit_date}
              background_color={"#4951FF"}
              navigateToCreateModule={navigateToCreateModuleScreen}
              navigateToAddStudents={navigateToAddStudentsScreen}
              navigateToStudentsPerCourse={navigateToStudentsPerCourseScreen}
            />
          </TouchableOpacity>
        ))}
  
      </ScrollView>
   
    </View>
  )

};

export default CampaignByUserScreen;

