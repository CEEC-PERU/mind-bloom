import { TouchableOpacity, Text, ScrollView, View, Image, TextInput } from 'react-native';
import React, { useState , useEffect } from 'react';
import { styles } from './styles';
import { useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { CourseCardAdmin, LoadIndicator, CustomButton, CourseInput } from '../../../../components';
import { RootStackParamListAdmin } from '../../../../interfaces/NavigationInterfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { Icon } from 'react-native-paper';
import { style } from '../../admin/CreateUserAdmin/style';
import { Alert } from 'react-native'; 
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker, { Event as DateTimePickerEvent } from '@react-native-community/datetimepicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { PostImage , sendRequirement } from '../../../../services/requierement.service';
import { useAuth } from '../../../../context/AuthContext';
import {useCampaigns }  from './../DescargaDatos/hooks/useCampaigns';
type RequerimientoRouteProp = RouteProp<RootStackParamListAdmin, 'Requerimiento'>;

const Requerimiento: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
  const [fecha, setFecha] = useState(new Date());
  const [campaign, setCampaign] = useState<number>(0);
  const [nombreCurso, setNombreCurso] = useState('');
  const [modulos, setModulos] = useState('');
  const [archivosSeleccionados, setArchivosSeleccionados] = useState<string[]>([]);
  const [material, setMaterial] = useState<string[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { loading, campaigns } = useCampaigns();
  const [dropdownVisibleCampaign, setDropdownVisibleCampaign] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [result, setResult] = useState(null);
  const { userToken, userInfo } = useAuth();
  const user = userInfo as { id: number};
  const campaignId: number = campaign !== undefined ? campaign : 0;

  const handleEnviar = async () => {
    console.log('Fecha:', fecha);
    console.log('Campaña:', campaign);
    console.log('Nombre del curso:', nombreCurso);
    console.log('Módulos:', modulos);
    console.log("material",material)
    console.log('Archivos seleccionados:', archivosSeleccionados);
    const requirementPost = {
    fecha: fecha,
    campaign_id : campaign,
    user_id: user.id ,
    course_name:nombreCurso,
    n_modulos : modulos,
    material:material,
    };

    if (userToken) {
      await sendRequirement(requirementPost, userToken);
    } else {
      console.error('User token is null or undefined.');
      // Handle this case accordingly
    }
    Alert.alert('Requerimiento Enviado');
  };
  const handleSubirArchivo = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({ 
        type: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'], 
        copyToCacheDirectory: true 
      }) as DocumentPicker.DocumentPickerResult;
      console.log("Valor de result:", result);
  
      if (result && 'assets' in result && result.assets && result.assets.length > 0) {
    
        let fileName = result.assets[0].name;
        let fileURI = result.assets[0].uri;
        setArchivosSeleccionados(prevState => [...prevState, fileName]); // Añade el nuevo archivo al array existente
        console.log(fileName,"archivos",fileURI)
        const response = await PostImage(fileURI, fileName);
          setMaterial(prevMaterials => [...prevMaterials, response!.imageUrl]);
        console.log("RESPUESTA DE LA IMAGEN:", response);
        console.log(archivosSeleccionados)
      } else {
        console.log("No se seleccionó ningún archivo o el objeto result es nulo o no tiene la propiedad 'assets'.");
      }
    } catch (error) {
      console.log('Error al seleccionar el archivo:', error);
    }
  };
  


    const handleDateChange = (event: any, selectedDate?: Date) => {
      const currentDate = selectedDate || fecha;
      setShowDatePicker(false);
      setFecha(currentDate);
    };

  return (
    <View style={styles.container}>
      <Image 
      source={{uri: 'https://res.cloudinary.com/dk2red18f/image/upload/v1712355775/Requerimiento/be7illhgizsjgxadyjzj.png'}} 
      style={styles.title} 
    />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.inputContainer}>
          <View   style={styles.inputContainer3}>
          <Image 
      source={{uri: 'https://res.cloudinary.com/dk2red18f/image/upload/v1712355774/Requerimiento/by5nmgad5seam67xpzrq.png'}} 
    style={styles.icon}
    />
          <Text style={styles.label}>Fecha Propuesta</Text>
          <TouchableOpacity style={[styles.fecha]} onPress={() => setShowDatePicker(true)}>
          <Image 
      source={{uri: 'https://res.cloudinary.com/dk2red18f/image/upload/v1712355774/Requerimiento/inqkxl7jzg9tntcx7ru8.png'}} 
    style={{...styles.icon, marginLeft:120}}
    />
     </TouchableOpacity>
     {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={fecha}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          </View>
          <View style={styles.whiteRectangle}> 
            <Text style={styles.fecha}>{fecha.toLocaleDateString()}</Text>
            </View>
        </View>
        <View style={styles.inputContainer}>
        <View style={styles.inputContainer3}>
        <Image 
      source={{uri: 'https://res.cloudinary.com/dk2red18f/image/upload/v1712355792/Requerimiento/nph8t7h9xlkxfwonjr8d.png'}} 
    style={styles.icon}
    />
        <Text style={styles.label}>Campaña:</Text>
        {!dropdownVisibleCampaign && <TextInput style={{ color: "#fff" }}>   {selectedCampaign}</TextInput> }
              <TouchableOpacity onPress={() => setDropdownVisibleCampaign(!dropdownVisibleCampaign)}>
              <Image 
      source={{uri: 'https://res.cloudinary.com/dk2red18f/image/upload/v1712355774/Requerimiento/avj77ioghmeolq7dhfdu.png'}} 
    style={styles.icon}
    />
              </TouchableOpacity>
              
          </View>
          <View style={styles.whiteRectangle}> 
              {dropdownVisibleCampaign && campaigns.map((campaign, index) => (
                
              <TouchableOpacity key={index} onPress={() => { setSelectedCampaign(campaign.Campaign.name); setCampaign(campaign.campaign_id); setDropdownVisibleCampaign(false); }}>
              <Text style={{ fontSize: 18, marginTop: 10, color: "#4951FF" }}>{campaign.Campaign.name} </Text>
              
            </TouchableOpacity>
            ))}
           
               </View>
         
        </View>
        <View style={styles.inputContainer}>
        <View style={styles.inputContainer3}>
        <Image 
      source={{uri: 'https://res.cloudinary.com/dk2red18f/image/upload/v1712355774/Requerimiento/x3fqcuduesxixt88zxas.png'}} 
    style={styles.icon}
    />
        <Text style={styles.label}>Nombre de Curso</Text>
          </View>
          <View style={{...styles.whiteRectangle,padding:12} } >
          <TextInput
            style={styles.input}
            value={nombreCurso}
            onChangeText={text => setNombreCurso(text)}
          />
          </View>
        </View>
        <View style={styles.inputContainer}>
        <View style={styles.inputContainer3}>
        <Image 
      source={{uri: 'https://res.cloudinary.com/dk2red18f/image/upload/v1712355775/Requerimiento/xtcjg0crtl7yxkj11zwm.png'}} 
    style={styles.icon}
    />
          <Text style={styles.label}> N° Módulos </Text>
          </View>
          <View style={{...styles.whiteRectangle,padding:12} } >
          <TextInput
            style={styles.input}
            value={modulos}
            onChangeText={text => setModulos(text)}
          />
          </View>
        </View>
       
      
        <View style={styles.inputContainer}>
        <View style={styles.inputContainer3}>
        <Image 
      source={{uri: 'https://res.cloudinary.com/dk2red18f/image/upload/v1712355774/Requerimiento/dcviq6wc7s2gatxxr9k7.png'}} 
    style={styles.icon}
    />
          <Text style={styles.label}>Material de Curso (pdf)</Text>
          <TouchableOpacity onPress={handleSubirArchivo}>
          <Image 
      source={{uri: 'https://res.cloudinary.com/dk2red18f/image/upload/v1712355775/Requerimiento/p0mytmgd30fyuztchlf1.png'}} 
    style={styles.icon}
    />
  </TouchableOpacity>
          </View>

  <View style={{...styles.whiteRectangle,padding:10} } >
  {archivosSeleccionados.map((archivo, index) => (
    <View key={index} style={{...styles.container2, flexDirection: 'column'}}>
      <Text style={styles.archivo}>{archivo}</Text>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#4951FF',marginTop:5}} />
      <TouchableOpacity onPress={handleSubirArchivo}>

      </TouchableOpacity>
    </View>
  ))}
 
  </View>
</View>
   
        <TouchableOpacity style={styles.button} onPress={handleEnviar}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </View>
  );
};

export default Requerimiento;
