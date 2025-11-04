import {sendClients } from '../../../../services/clients.service';
import { TouchableOpacity, Text, ScrollView, View, Button, Modal, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Alert } from 'react-native'; 
import { CustomButton } from '../../../../components'
import { styles } from './style';
import { CampaignCardAdmin, LoadIndicator } from '../../../../components';
import { useUserAdmin } from './hooks/useUserAdmin';
import { RootStackParamListAdmin } from '../../../../interfaces/NavigationInterfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { Icon } from 'react-native-paper';
import { getCurrentDateAsString } from '../../../../utils/Dates';
import { useAuth } from '../../../../context/AuthContext';
type Props = {
  readonly navigation: NativeStackNavigationProp<RootStackParamListAdmin, 'Clientes'>;
};

export default function ClientsScreen({ navigation }: Props) {
  const { loading, useradmin, refetch } = useUserAdmin(); 
  const { userToken } = useAuth();

  const [modalVisible, setModalVisible] = useState(false);
  const [clientName, setClientName] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );
 

  const handleCreateClient = async () => {

    if (!clientName.trim()) {
      Alert.alert('Error', 'El campo no puede estar vacío');
      return;
    }
  
    const client = {
      name: clientName,
    };
  
    if (userToken) {
      try {
        await sendClients(client, userToken);
        Alert.alert('Cliente Registrado Exitosamente');
        setClientName('');
      } catch (error) {
        console.error('Error al crear el cliente:', error);
      }
  
      setModalVisible(false);
    }
  };
 
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={styles.container} >
        {useradmin.map((useradmin , index) => (
        
<TouchableOpacity key={useradmin.user_id}  onPress={() => navigation.navigate('CampaignByUserScreen', { user_id: useradmin.user_id})}>
           <View key={index} style={styles.cardContainer}>
                
           <View style={styles.userDetails}>
               <Text style={styles.userName}>{useradmin.Profile?.first_name || "Usuario (no actualiza perfil)"}  {useradmin.Profile?.last_name}</Text>
               <Text>{useradmin.email} </Text>
               <Text style={styles.score}>{useradmin.client.name} </Text>
              
           </View>
       </View>
       </TouchableOpacity>
       ))}
       </ScrollView>
       <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 }}>
  
         <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.button}
         >
            <Text style={styles.buttonText}>Crear Cliente</Text>
         </TouchableOpacity>

         <TouchableOpacity
            onPress={() => navigation.navigate('CreateUserAdmin')}
            style={styles.button}
         >
            <Text style={styles.buttonText}>Crear User Admin</Text>
         </TouchableOpacity>
       </View>

       <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Registrar Cliente</Text>
              <TextInput
                style={styles.input}
                onChangeText={setClientName}
                value={clientName}
                placeholder="Nombre del cliente (empresa)"
              />
             
           <View style={styles.buttonContainer}>
  <TouchableOpacity
    onPress={handleCreateClient}
    style={styles.button}
  >
    <Text style={styles.buttonText}>Registrar</Text>
  </TouchableOpacity>
  <TouchableOpacity
    onPress={() => setModalVisible(false)}
    style={styles.button}
  >
    <Text style={styles.buttonText}>Cancelar</Text>
  </TouchableOpacity>
</View>
            </View>
          </View>
        </Modal>
   </View>
  );
}