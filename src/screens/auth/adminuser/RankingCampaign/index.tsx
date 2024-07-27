import { TouchableOpacity, Text, ScrollView, View, Image } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import { useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { CourseCardAdmin, LoadIndicator } from '../../../../components';
import { RootStackParamListAdmin } from '../../../../interfaces/NavigationInterfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { Card, Icon } from '@rneui/themed';
import { useRankingCampaign} from './hooks/useRankingCampaign';
type RankingCampaignRouteProp = RouteProp<RootStackParamListAdmin, 'RankingCampaign'>;


const RankingCampaign: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const route = useRoute<RankingCampaignRouteProp>();
    const { params } = route;
    const { usersevaluations } = useRankingCampaign(params.campaign_id);

    const [showInfo, setShowInfo] = useState(false); // State to show or hide additional info


    return (
        <View style={styles.container}>
        <ScrollView>
            {usersevaluations.map((userEval, index) => (
                <View key={index} style={styles.cardContainer}>
                    {/* Renderizar la imagen del perfil */}
                    <Image source={{ 
        uri: userEval.User.Profile?.profile_picture ? userEval.User.Profile?.profile_picture : 'https://res.cloudinary.com/dk2red18f/image/upload/v1713896612/CEEC/PERFIL/egwjjcrs2aon5hhtxabj.png'
    }} style={styles.profileImage} />
                    <View style={styles.userDetails}>
                        {/* Renderizar el nombre del usuario */}
                        <Text style={styles.userName}>{userEval.User.Profile?.first_name ? userEval.User.Profile?.first_name : 'Estudiante'} {userEval.User.Profile?.last_name}</Text>
                        {/* Renderizar el correo electrónico */}
                        <Text>{userEval.User.email}</Text>
                        {/* Renderizar la puntuación total */}
                        <Text style={styles.score}>{userEval.average_courses} puntos</Text>
                        {/* Renderizar el estado */}
                        {/*<Text style={{ fontSize: 16, color: userEval.status === 'Aprobado' ? 'green' : 'red' }}>{userEval.status}</Text>*/}
                        <View style={styles.userDetails2}>
                            <TouchableOpacity onPress={() => setShowInfo(!showInfo)}>
                                <Icon name="chevron-down" type='font-awesome' size={24} color={"#4951FF"} />
                            </TouchableOpacity>
                            {showInfo && (
                                <View>
                                <Text style={styles.text2}>Cursos:</Text>
                                <Text style={styles.text2}>------------------------------------------</Text>
                                {Object.values(userEval.Courses).map((course, index2) => (
                      <View key={index2}>
                      <Text style={styles.text2}>{course.name ? course?.name : 'No resolvio los examenes' }  </Text>
                      <Text >Puntaje : {course.average_score } / 20</Text>
                      <Text>Finalizado: {course.is_finished ? 'Sí' : 'No'}</Text>
                      <Text style={{ fontSize: 14, color: course.status === 'Aprobado' ? 'green' : 'red' }}>{course.status}</Text>
                      <Text style={styles.text2}>------------------------------------------</Text>
                    </View>
                                    
                                ))}
                            </View>
        /*<View>
            <Text style={styles.text2}>Cursos:</Text>
            <Text style={styles.text2}>------------------------------------------</Text>
            {Object.values(userEval.Courses).map((course) => (

                course.evaluations.map((evaluation, evalIndex) => (
                    <View key={evalIndex}>
                        <Text style={styles.text2}>{course.name }</Text>
                        <Text >Puntaje : {course.average_score } / 20</Text>
                        <Text>Finalizado: {course.is_finished ? 'Sí' : 'No'}</Text>
                        <Text style={{ fontSize: 14, color: course.status === 'Aprobado' ? 'green' : 'red' }}>{course.status}</Text>
                        <Text style={styles.text2}>------------------------------------------</Text>
                    </View>
                ))
            ))}
        </View>*/
    )}
                        </View>
                    </View>
                </View>
            ))}
        </ScrollView>
    </View>
    
    );
}
export default RankingCampaign;

