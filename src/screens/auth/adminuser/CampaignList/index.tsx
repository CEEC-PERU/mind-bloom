import { TouchableOpacity, Text, ScrollView, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { CourseCardAdmin, CampaignCardAdminUser, LoadIndicator } from '../../../../components';
import  { useCampaigns } from './../DescargaDatos/hooks/useCampaigns';
import  { useUsers } from './hooks/useUsers';
import { RootStackParamListAdmin } from '../../../../interfaces/NavigationInterfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { Icon } from 'react-native-paper';


type CampaignListScreenRouteProp = RouteProp<RootStackParamListAdmin, 'CampaignList'>;

const CampaignList : React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
  const route = useRoute<CampaignListScreenRouteProp>();

  const { params } = route;
  const { campaignstot , loading} = useUsers();
  
  
  if (loading) {
    return <LoadIndicator animating={true} size='large' />
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

 
  const navigateToAddStudentsScreen = (campaign_id : number) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'AddStudentsToCampaign',
        params: {
         campaign_id
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
      {campaignstot.map(campaign => {
       
          return (
            <CampaignCardAdminUser
              key={campaign.campaign_id}
              campaign_id={campaign.campaign_id}
              moduleCount={campaign.totalUsers}
              courseName={campaign.Campaign.name}
              background_color={'#4951FF'}
              navigateToCreateModule={navigateToAddStudentsScreen}
            />
          );
        })}

      </ScrollView>
    </View>
  )
}

export default CampaignList;