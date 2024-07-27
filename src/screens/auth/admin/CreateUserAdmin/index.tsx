import { Alert, StyleSheet, Text, View , TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { style } from './style';
import { useClients } from './../ClientesScreen/hooks/useClients';
import {  Icon } from '@rneui/themed';
import { ScrollView } from 'react-native-gesture-handler'
import { windowHeight } from '../../../../utils/Dimentions'
import { CustomButton, CourseInput, LoadIndicator } from '../../../../components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RootStackParamListAdmin } from '../../../../interfaces/NavigationInterfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RadioButton ,  } from 'react-native-paper'
import { UserRequest } from '../../../../interfaces/UserInterfaces'
import { rules } from '../../../../utils/Rules'
import { PostNewUser } from '../../../../services/user.service'
type Props = {
    readonly navigation: NativeStackNavigationProp<RootStackParamListAdmin, 'CreateUserAdmin'>;
  };
  
export default function CreateUserAdmin({ navigation }: Props) {
    const { control, handleSubmit, setValue } = useForm<{ password: string, repeat_password: string, email: string }>();
    const [selectedRole, setSelectedRole] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [match, setMatch] = useState(true);
    const { clients } = useClients();
    const [showInfo, setShowInfo] = useState(false); // State to show or hide additional info
    const [selectedClient, setSelectedClient] = useState(""); // Estado para almacenar el cliente seleccionado
    const [selectedClientN, setSelectedClientN] = useState(Number); 
    // const [selectedAccountType, setselectedAccountType] = useState();
    const onSubmit: SubmitHandler<{ password: string, repeat_password: string, email: string }> = async (data) => {
        try {
            setIsLoading(true);
            
            if (data.password !== data.repeat_password) {
                setMatch(false);
                
            } else {
                setMatch(true);
                const user: UserRequest = {
                    email: data.email,
                    password: data.password,
                    role_id: 3, 
                    client_id : selectedClientN
                }
                console.log("user",user)
                const response = await PostNewUser(user);
                if (response) {
                    Alert.alert("ÉXITO", "Usuario creado con éxito");
                    setValue("email", "");
                    setValue("password", "");
                    setValue("repeat_password", "");
                  
                    return;
                } else {
                    Alert.alert("ERROR", "No se pudo crear el usuario, intentalo más tarde");
                    return;
                }
               
            }
        } catch (error) {
            console.error(error);
            throw error
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <View>
            <View style={{ height: windowHeight * 0.09, display: "flex", backgroundColor: "#fff", padding: 20 }}>
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#333',
                }}>Nuevo usuario AdminUser</Text>
                <Text style={{ fontSize: 15, fontWeight: '300' }}>Crea AdminUser</Text>
            </View>
            {isLoading ? <View style={{ display: "flex", backgroundColor: "#fff", padding: 20, height: windowHeight * 0.70 }}><LoadIndicator animating size='large' /></View> :
                <ScrollView style={{ display: "flex", backgroundColor: "#fff", padding: 20, height: windowHeight * 0.70 }}>
                    <CourseInput control={control} label='Email' name='email' inputType='email' rules={rules} />
                    <CourseInput control={control} label='Contraseña' name='password' inputType='password' rules={rules} />
                    {!match && <Text style={{ color: 'red', fontSize: 12 }}>Las contraseñas no coinciden</Text>}
                    <CourseInput control={control} label='Repetir contraseña' name='repeat_password' inputType='password' rules={rules} />
                    {!match && <Text style={{ color: 'red', fontSize: 12 }}>Las contraseñas no coinciden</Text>}
                    
                <View style={{ marginVertical: 25 }}>
                    <Text style={{ fontSize: 15, marginLeft: 15}}>Cliente</Text>
                    <View style={style.userDetails2}>
               <TouchableOpacity onPress={() => setShowInfo(!showInfo)}>
                    <Icon name="chevron-down" type='font-awesome' size={24} color={"#4951FF"} />
                <Text>{selectedClient}</Text> 
              </TouchableOpacity>
                 <View>
           {showInfo && clients.map((client, evalIndex) => (
           <TouchableOpacity key={evalIndex} onPress={() => { setShowInfo(false); setSelectedClient(client.name); setSelectedClientN(client.client_id); }}>
           <Text style={{ fontSize: 18, marginTop: 10 , color:"#4951FF"}}>{client.name}</Text>
         </TouchableOpacity>
         ))}
         
        </View>
           </View>
        </View>
               </ScrollView>}
               <View style={{ padding: 20, display: "flex", backgroundColor: "#fff" }}>
                <CustomButton disabled={isLoading} onPress={handleSubmit(onSubmit)} text='Registrar' />
            </View>

        </View>
    )
}
const styles = StyleSheet.create({})

