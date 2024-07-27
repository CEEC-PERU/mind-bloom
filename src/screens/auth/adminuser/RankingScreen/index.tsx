import { TouchableOpacity, Text, ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import { useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { CourseCardAdmin, LoadIndicator } from '../../../../components';
import { RootStackParamListAdmin } from '../../../../interfaces/NavigationInterfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { Card, Icon } from '@rneui/themed';
import {useCourses} from './../DescargaDatos/hooks/useCourses';
import {useCampaigns} from './../DescargaDatos/hooks/useCampaigns';
type CursosScreenRouteProp = RouteProp<RootStackParamListAdmin, 'Ranking'>;

const RankingScreen : React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
  const route = useRoute<CursosScreenRouteProp>();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [dropdownVisibleCourse, setDropdownVisibleCourse] = useState(false);
  const [dropdownVisibleCampaign, setDropdownVisibleCampaign] = useState(false);
  const { courses } = useCourses();
  const { campaigns } = useCampaigns();
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView>
          <View style={styles.container}>
            <View style={{ padding: 10, width:200, margin: 10, borderRadius: 5 }}>
              <Text style={{ color: "#4951FF",fontSize: 20, fontWeight: 'bold' }}>Campaña</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor:  "#FAFAFF" }}>
                {!dropdownVisibleCampaign && <Text style={{ color: "#4951FF"}}>{selectedCampaign}</Text>}
                <TouchableOpacity onPress={() => setDropdownVisibleCampaign(!dropdownVisibleCampaign)}>
                  <Icon name="chevron-down" type='font-awesome' size={24} color={"#4951FF"}  />
                </TouchableOpacity>
              </View>
              {dropdownVisibleCampaign && campaigns.map((campaign, index) => (
                <TouchableOpacity key={index} onPress={() => { setSelectedCampaign(campaign.Campaign.name); setDropdownVisibleCampaign(false); ; navigation.navigate('RankingCampaign', { campaign_id: campaign.campaign_id });}}>
                  <Text style={{ fontSize: 18, marginTop: 10 , color:"#4951FF"}}>{campaign.Campaign.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          

            <View style={styles.container} >
          <View style={{ padding: 10, width:200, margin: 10, borderRadius: 5 }}>
            <Text style={{ color: "#4951FF",fontSize: 20, fontWeight: 'bold' }}>Cursos</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor:  "#FAFAFF" }}>
              {!dropdownVisibleCourse && <Text style={{ color: "#4951FF"}}>{selectedCourse}</Text>}
              <TouchableOpacity onPress={() => setDropdownVisibleCourse(!dropdownVisibleCourse)}>
                <Icon name="chevron-down" type='font-awesome' size={24} color={"#4951FF"}  />
              </TouchableOpacity>
            </View>
            {dropdownVisibleCourse && courses.map((curso, index) => (
              <TouchableOpacity key={index} onPress={() => { setSelectedCourse(curso.Course.name); setDropdownVisibleCourse(false); navigation.navigate('RankingCourseEvaluation', { course_id: curso.course_id }); }}>
                <Text style={{ fontSize: 15, marginTop: 15 , color:"#4951FF"}}>{curso.Course.name} - {curso.Campaign.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          </View>

        
        </ScrollView>
      </View>
    )
}

export default RankingScreen;