import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { style } from './style';
import { useClients } from './../ClientesScreen/hooks/useClients';
import { Icon } from '@rneui/themed';
import { ScrollView } from 'react-native-gesture-handler'
import { windowHeight } from '../../../../utils/Dimentions'
/*import useCourse from './hooks/useCourse';*/
import { useRoute, RouteProp } from '@react-navigation/native';
import { LoadIndicator } from '../../../../components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RootStackParamListAdmin } from '../../../../interfaces/NavigationInterfaces';
import { CampaignUserRequest } from '../../../../interfaces/CoursesInterfaces'
import { sendCampaignUser } from '../../../../services/courses.service'
import { useUserAdmin } from './../ClientesScreen/hooks/useUserAdmin';
import { useAuth } from '../../../../context/AuthContext';
import {useCampaigns }  from './../CampaignScreen/hooks/useCampaigns';
type CampaignUserScreen = RouteProp<RootStackParamListAdmin, 'CampaignUserScreen'>;

export default function CampaignUserScreen() {
    const { handleSubmit } = useForm<{}>(); // Eliminé los campos password, repeat_password y email
    const [isLoading, setIsLoading] = useState(false);
    const { clients } = useClients();
    const { campaigns, refreshCampaigns } = useCampaigns();
    const [showInfo, setShowInfo] = useState(false);
    const [showInfo2, setShowInfo2] = useState(false);
    const [selectedClient, setSelectedClient] = useState("");
    const [selectedClientN, setSelectedClientN] = useState<number>();
    const [selectedCampaign, setSelectedCampaign] = useState("");
    const [selectedCampaignN, setSelectedCampaignN] = useState<number>();
    const route = useRoute<CampaignUserScreen>();
    const { params } = route;
    const { userInfo, userToken } = useAuth();
    const { loading, useradmin, refetch } = useUserAdmin(); 

   /* const { course } = useCourse();*/

    const onSubmit: SubmitHandler<{}> = async () => { // Eliminé los parámetros data
        try {

            if (userToken) {
                setIsLoading(true);
                const campaigncourse = {
                    campaign_id: selectedCampaignN || 0,
                    user_id: selectedClientN || 0
                };
                
                const result = await sendCampaignUser(campaigncourse, userToken);
                if (result){
                    Alert.alert("ÉXITO", "Se asigno la campaña con éxito");
                    setSelectedClient("" )
                    setSelectedCampaign("" )
                } else {
                    Alert.alert("ERROR", "No se pudo asignar la campaña");
                }
            }
        } catch (error) {
            console.error('Error inseperado:', error);
            Alert.alert("ERROR", "Error inesperado al asignar la campaña"); 
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View>
            <View style={{ height: windowHeight * 0.09, display: "flex", backgroundColor: "#fff", padding: 15 }}>
                <Text style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: '#7849FF',
                }}>Asignar Campañas a UserAdmin</Text>
            </View>
            
            {isLoading ? <View style={{ display: "flex", backgroundColor: "#fff", padding: 20, height: windowHeight * 0.64 }}><LoadIndicator animating size='large' /></View> :
                <ScrollView style={{ display: "flex", backgroundColor: "#fff", padding: 20, height: windowHeight * 0.64 }}>
                  
                  <Text style={{ fontSize: 15, marginLeft: 0, fontWeight: '400' }}>*Selecciona a un UserAdmin y asignale una campaña  </Text>
               
                    <View style={{ marginVertical: 25, marginTop:40 }}>
                        
                        <Text style={{ fontSize: 15, marginLeft: 0, fontWeight: '600' }}>Lista de UserAdmin </Text>

                        <View style={style.userDetails2}>
                            <TouchableOpacity onPress={() => setShowInfo(!showInfo)}>
                                <Icon name="chevron-down" type='font-awesome' size={24} color={"#4951FF"} />
                                <Text style={{ fontSize: 15, marginLeft: 0, fontWeight: '600', color: '#7849FF' }}>{selectedClient}</Text>
                            </TouchableOpacity>
                            <View>
                              {showInfo && useradmin && useradmin.map((client, evalIndex) => (
                                    <TouchableOpacity key={evalIndex} onPress={() => { setShowInfo(false); setSelectedClient(client.Profile.first_name+ client.Profile.last_name ); setSelectedClientN(client.user_id); }}>
                                        <Text style={{ fontSize: 14, marginTop: 10, color: "#4951FF" }}>{client.Profile.first_name} {client.Profile.last_name} - {client.client.name}  </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                    <View style={{ marginVertical: 25 }}>
                        <Text style={{ fontSize: 15, marginLeft: 0, fontWeight: '600' }}>Lista de Campañas</Text>
                        <View style={style.userDetails2}>
                            <TouchableOpacity onPress={() => setShowInfo2(!showInfo2)}>
                                <Icon name="chevron-down" type='font-awesome' size={24} color={"#4951FF"} />
                                <Text style={{ fontSize: 15, marginLeft: 0, fontWeight: '600', color: '#7849FF' }}>{selectedCampaign}</Text>
                            </TouchableOpacity>
                            <View>
                              {showInfo2 && campaigns && campaigns.map((campaign, evalIndex) => (
                                    <TouchableOpacity key={evalIndex} onPress={() => { setShowInfo2(false); setSelectedCampaign(campaign.name); setSelectedCampaignN(campaign.campaign_id); }}>
                                        <Text style={{ fontSize: 14, marginTop: 10, color: "#4951FF" }}>{campaign.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                </ScrollView>}
            <View style={{ padding: 20, display: "flex", backgroundColor: "#fff" }}>
                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    style={style.button}
                >
                    <Text style={style.buttonText}>Registrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
