import { TouchableOpacity, Text, ScrollView, View, Image, Linking, Button } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import { useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { CourseCardAdmin, LoadIndicator } from '../../../../components';
import { RootStackParamListAdmin } from '../../../../interfaces/NavigationInterfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { Card} from '@rneui/themed';
import { useRequirement} from './hooks/useRequirement';
import Icon from 'react-native-vector-icons/FontAwesome';

type RequerimientoListRouteProp = RouteProp<RootStackParamListAdmin, 'RequerimientoList'>;

const RankingCampaign: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {

    const route = useRoute<RequerimientoListRouteProp>();
    const { params } = route;
    const { requirements } = useRequirement();

    return (
        <View style={styles.container}>
            <ScrollView>
                {requirements.map((requirement, index) => {
                    const date = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(requirement.created_at));
                    return (
                        <View key={index} style={styles.cardContainer}>
                            <Image source={{ uri:  requirement.User.Profile.profile_picture  ||"https://res.cloudinary.com/dhfsbbos3/image/upload/v1711056243/CEEC/mvnegfqtwbqkjxtidtmx.png" }} style={styles.profileImage} />
                            <View style={styles.userDetails}>
                                <Text style={styles.score}>{date}</Text>
                                <Text style={styles.userName}>{requirement.User.Profile.first_name} {requirement.User.Profile.last_name}</Text>
                                <Text>{requirement.User.email} </Text>
                                <Text><Text style={{fontWeight: 'bold'}}>Fecha Propuesta:</Text>  {requirement.fecha}</Text>
                                <Text><Text style={{fontWeight: 'bold'}}>Nuevo Curso:</Text> {requirement.course_name} </Text>
                                <Text><Text style={{fontWeight: 'bold'}}>N° Modulos: </Text> 
                                {requirement.n_modulos} </Text>
                                <Text><Text style={{fontWeight: 'bold'}}>Campaña: </Text>  {requirement.Campaign.name} </Text>

                                {requirement.material.map((material, index) => {
    const fileExtension = material.split('.').pop();
    const filename = `material${index + 1}.${fileExtension}`;
    return (
        <TouchableOpacity 
            key={index} 
            style={{backgroundColor: '#4951FF', margin: 5, padding: 10, marginTop:10, borderRadius: 5, flexDirection: 'row', alignItems: 'center'}}
            onPress={() => Linking.openURL(material)}
        >
            <Icon name="download" size={20} color="#fff" />
            <Text style={{color: '#fff', marginLeft: 10}}>{filename}</Text>
        </TouchableOpacity>
    );
})}
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    );
}
export default RankingCampaign;

