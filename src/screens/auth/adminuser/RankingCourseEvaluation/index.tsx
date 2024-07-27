import { TouchableOpacity, Text, ScrollView, View, Image } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import { useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { CourseCardAdmin, LoadIndicator } from '../../../../components';
import { RootStackParamListAdmin } from '../../../../interfaces/NavigationInterfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { Card, Icon } from '@rneui/themed';
import { useRankingCourse } from './hooks/useRankingCourse';
type RankingCourseRouteProp = RouteProp<RootStackParamListAdmin, 'RankingCourseEvaluation'>;

const RankingCourseEvaluation: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const route = useRoute<RankingCourseRouteProp>();
    const { params } = route;
    const { usersevaluations } = useRankingCourse(params.course_id);
    const [showInfo, setShowInfo] = useState(false); // State to show or hide additional info

    return (
        <View style={{ flex: 1}}>
            <ScrollView style={styles.container}>
                {usersevaluations.map((userEval, index) => (
                    <View key={index} style={styles.cardContainer}>
                        <Image source={{ uri: userEval.User?.Profile?.profile_picture || "https://res.cloudinary.com/dhfsbbos3/image/upload/v1711056243/CEEC/mvnegfqtwbqkjxtidtmx.png" }} style={styles.profileImage} />
                        <View style={styles.userDetails}>
                            <Text style={styles.userName}>{userEval.User?.Profile?.first_name || "Usuario"}  {userEval.User?.Profile?.last_name}</Text>
                            <Text>{userEval.User?.email} </Text>
                            <Text style={styles.score}>{userEval.average_score} puntos / 20 puntos</Text>
                            <Text style={{ fontSize: 16, color: userEval.status === 'Desaprobado' ? 'red' : userEval.status === 'Aprobado' ? 'green' : 'blue' }}>{userEval.status}</Text>
                            <View style={styles.userDetails2}>
                            <TouchableOpacity onPress={() => setShowInfo(!showInfo)}>
                                <Icon name="chevron-down" type='font-awesome' size={24} color={"#4951FF"} />
                            </TouchableOpacity>
                            {showInfo && (
                                <View>
                                    <Text style={styles.text2}>Evaluaciones:</Text>
                                    <Text style={styles.text2}>------------------------------------------</Text>
                                    {userEval.evaluations.map((evaluation, evalIndex) => (
                                        <View key={evalIndex}>
                                            <Text>Módulo: {evaluation.Evaluation.Module.name}</Text>
                                            <Text>Nombre de la evaluación: {evaluation.Evaluation.name}</Text>
                                            <Text>Puntuación total: {evaluation.total_score} / 20 </Text>
                                            <Text>Finalizado: {evaluation.realize_exam ? 'Sí' : 'No'}</Text>
                                            <Text style={styles.text2}>------------------------------------------</Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                              </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
export default RankingCourseEvaluation;


