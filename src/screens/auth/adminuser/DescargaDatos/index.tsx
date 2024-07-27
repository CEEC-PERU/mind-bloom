import { API_RANKING_EXCEL_COURSE , API_RANKING_EXCEL_CAMPAIGN , API_RANKING_EXCEL_DATA_GENERAL} from "../../../../utils/Endpoints";
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity , Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Asegúrate de importar la biblioteca de íconos correcta
import * as FileSystem from 'expo-file-system';
import {getRankingExcelCourse} from '../../../../services/ranking.service';
import { useAuth } from '../../../../context/AuthContext';
import { CardStudent, CustomButton, CustomSearcher, LoadIndicator } from '../../../../components'
import { windowHeight } from '../../../../utils/Dimentions'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamListAdmin } from '../../../../interfaces/NavigationInterfaces';
import { ListItem} from '@rneui/themed'; // Import ListItem and Icon from your UI library
import { shareAsync } from 'expo-sharing';
import { StatusBar } from 'expo-status-bar';
import {useCampaigns }  from './hooks/useCampaigns';
import {useCourses }  from './hooks/useCourses';


type Props = {
  readonly navigation: NativeStackNavigationProp<RootStackParamListAdmin, 'DescargaDatos'>;
};
export default function DescargaDatos({ navigation }: Props) {
  const { loading, campaigns } = useCampaigns();
  const {  courses } = useCourses();
  const url = ''; // URL del archivo que quieres descargar
 







 
  const [expanded, setExpanded] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const {  userToken , userInfo } = useAuth();
  const user = userInfo as { id: number; role: number; email: string , client_id : number};


  const downloadFromAPI2 = async (course_id:number , client_id:number) => {
    const filename = "Resultados.xlsx";
    const localhost = Platform.OS === "android" ? "10.0.2.2" : "127.0.0.1";
    const result = await FileSystem.downloadAsync(
      `${API_RANKING_EXCEL_COURSE}/${course_id}/${client_id}`,
      FileSystem.documentDirectory + filename,
      {
        headers: {
          "MyHeader": "MyValue"
        }
      }
    );
    console.log(result);
    save(result.uri, filename, result.headers["Content-Type"]);
  };


  const downloadDataGeneral = async ( client_id:number) => {
    const filename = "DataGeneral.xlsx";
    const localhost = Platform.OS === "android" ? "10.0.2.2" : "127.0.0.1";
    const result = await FileSystem.downloadAsync(
      `${API_RANKING_EXCEL_DATA_GENERAL}/${client_id}`,
      FileSystem.documentDirectory + filename,
      {
        headers: {
          "MyHeader": "MyValue"
        }
      }
    );
    console.log(result);
    save(result.uri, filename, result.headers["Content-Type"]);
  };

  const downloadCampaign = async (campaign_id:number , client_id:number) => {
    const filename = "ResultadoCampaña.xlsx";
    const localhost = Platform.OS === "android" ? "10.0.2.2" : "127.0.0.1";
    const result = await FileSystem.downloadAsync(
      `${API_RANKING_EXCEL_CAMPAIGN}/${campaign_id}/${client_id}`,
      FileSystem.documentDirectory + filename,
      {
        headers: {
          "MyHeader": "MyValue"
        }
      }
    );
    console.log(result);
    save(result.uri, filename, result.headers["Content-Type"]);
  };



  const save = async (uri: string, filename: string, mimetype: string): Promise<void> => {
    if (Platform.OS === "android") {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        const contentType = mimetype || "application/octet-stream"; // Valor predeterminado si mimetype es null
        await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, contentType)
          .then(async (uri: string) => {
            await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
          })
          .catch(e => console.log(e));
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  };
  







  return (
    <View style={styles.container}>
       <ScrollView>
      <View style={styles.row}>
        <Text style={styles.texto}>Descarga Data General</Text>
        <TouchableOpacity style={styles.button} onPress={() => {
   
   downloadDataGeneral(user.client_id);
 }}>
    <Icon name="download" size={30} color="#fff" />
</TouchableOpacity>
      </View>
      <View style={styles.row2}>
       
       {/* Descarga por Campaña */}
        <ListItem.Accordion
          content={
            <>
              {/*<Icon name="book" size={30} color="#4951FF" />*/}
              <View style={{ flex: 1 }}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.texto}>Descarga por Campaña</Text>
              </View>
            </>
          }
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}
        >
          <ScrollView>
            {expanded &&
              campaigns.map((campaign) => (
                //comentar esta
                <TouchableOpacity key={campaign.campaign_id} onPress={() => {
   
                  downloadCampaign(campaign.campaign_id, user.client_id);
                }}>
                  <ListItem key={campaign.campaign_id} bottomDivider>
                    <Icon name="file-text-o" size={24} color="#4951FF" />
                    <ListItem.Content>
                      <ListItem.Title>{campaign.Campaign.name}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                  </ListItem>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </ListItem.Accordion>
      </View>




     
      <View style={styles.row2}>
       
       {/* Descarga por Curso */}
        <ListItem.Accordion
          content={
            <>
              {/*<Icon name="book" size={30} color="#4951FF" />*/}
              <View style={{ flex: 1 }}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.texto}>Descarga por Curso</Text>
              </View>
            </>
          }
          isExpanded={expanded2}
          onPress={() => {
            setExpanded2(!expanded2);
          }}
        >
          <ScrollView>
            {expanded2 &&
              courses.map((course) => (
                <TouchableOpacity
                key={`${course.course_id}-${course.campaign_id}-touchable`}
  onPress={() => {
   
    downloadFromAPI2(course.course_id, user.client_id);
  }}
>
                  <ListItem     key={`${course.course_id}-${course.campaign_id}-listitem`}  bottomDivider>
                    <Icon name= "file-text-o" size={24} color="#4951FF" />
                    <ListItem.Content>
                      <ListItem.Title>{course.Course.name} - {course.Campaign.name}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                  </ListItem>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </ListItem.Accordion>
      </View>
      </ScrollView>
    </View>
  )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop:50,
    padding: 20,
    backgroundColor : '#F5F5F5'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    padding: 20,
    borderWidth: 2,
    borderColor: '#6885F8',
    borderRadius: 10,
    backgroundColor: '#fff',
  },




  row2: {
    marginBottom: 40,
    padding: 15,
    borderWidth: 2,
    borderColor: '#6885F8',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  texto: {
    textAlign: 'center',
    color: '#6885F8',
    fontSize: 20,
    width: 250,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:10
  },
  button: {
    backgroundColor: '#6885F8',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
});



