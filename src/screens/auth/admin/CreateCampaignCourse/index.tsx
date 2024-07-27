import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { style } from './style';
import { useClients } from './../ClientesScreen/hooks/useClients';
import { Icon } from '@rneui/themed';
import { ScrollView } from 'react-native-gesture-handler'
import { windowHeight } from '../../../../utils/Dimentions'
import useCoursesWithModules from './../CoursesScreen/hooks/useCourses';
import useCourse from './hooks/useCourse';
import { useRoute, RouteProp } from '@react-navigation/native';
import { LoadIndicator } from '../../../../components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RootStackParamListAdmin } from '../../../../interfaces/NavigationInterfaces';
import { CampaignCourseRequest } from '../../../../interfaces/UserInterfaces'
import { PostNewCamapignCourse } from '../../../../services/courses.service'

type CreateCampaignCourse = RouteProp<RootStackParamListAdmin, 'CreateCampaignCourse'>;

export default function CreateCampaignCourse() {
    const { handleSubmit } = useForm<{}>(); // Eliminé los campos password, repeat_password y email
    const [isLoading, setIsLoading] = useState(false);
    const { clients } = useClients();
    const [showInfo, setShowInfo] = useState(false);
    const [selectedClient, setSelectedClient] = useState("");
    const [selectedClientN, setSelectedClientN] = useState<number>();
    const route = useRoute<CreateCampaignCourse>();
    const { params } = route;
    const { coursesWithModules } = useCoursesWithModules(params.campaign_id);
    const { course } = useCourse();

    const onSubmit: SubmitHandler<{}> = async () => { // Eliminé los parámetros data
        try {
            setIsLoading(true);
            const campaigncourse: CampaignCourseRequest = {
                campaign_id: params.campaign_id,
                course_id: selectedClientN || 0
            };
            
            const response = await PostNewCamapignCourse(campaigncourse);
            if (response) {
                Alert.alert("ÉXITO", "Curso asignado con éxito");
                setSelectedClient( "");
            } else {
                Alert.alert("ERROR", "No se pudo crear el usuario, inténtalo más tarde");
            }
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View>
            <View style={{ height: windowHeight * 0.09, display: "flex", backgroundColor: "#fff", padding: 20 }}>
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#7849FF',
                }}>Agregar Curso</Text>
            </View>
            {isLoading ? <View style={{ display: "flex", backgroundColor: "#fff", padding: 20, height: windowHeight * 0.70 }}><LoadIndicator animating size='large' /></View> :
                <ScrollView style={{ display: "flex", backgroundColor: "#fff", padding: 20, height: windowHeight * 0.70 }}>
                    <Text style={{ fontSize: 15, fontWeight: '600', paddingBottom: 20 }}>Cursos Registrados en la Actual Campaña :</Text>
                    {coursesWithModules.map((course, eval2Index) => (
                        <Text key={eval2Index} >* {course.Course.name}</Text>
                    ))}
                    <View style={{ marginVertical: 25 }}>
                        <Text style={{ fontSize: 15, marginLeft: 0, fontWeight: '600' }}>Asignar Nuevo Curso</Text>
                        <View style={style.userDetails2}>
                            <TouchableOpacity onPress={() => setShowInfo(!showInfo)}>
                                <Icon name="chevron-down" type='font-awesome' size={24} color={"#4951FF"} />
                                <Text style={{ fontSize: 15, marginLeft: 0, fontWeight: '600', color: '#7849FF' }}>{selectedClient}</Text>
                            </TouchableOpacity>
                            <View>
                                {showInfo && course && course.map((client, evalIndex) => (
                                    <TouchableOpacity key={evalIndex} onPress={() => { setShowInfo(false); setSelectedClient(client.name); setSelectedClientN(client.course_id); }}>
                                        <Text style={{ fontSize: 14, marginTop: 10, color: "#4951FF" }}>{client.name}</Text>
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
