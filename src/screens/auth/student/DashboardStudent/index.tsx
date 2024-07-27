import { View, ScrollView , Text} from 'react-native';
import { styles } from './styles';
import { useAuth } from '../../../../context/AuthContext';
import { LoadIndicator, CardCircularProgress, CustomLinearChart, HeaderDashboard, CustomProgressChart } from '../../../../components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamListAdmin } from '../../../../interfaces/NavigationInterfaces';
import { useSessionStatistics } from './hooks/useTime';
import CustomCircularProgress from '../../../../components/CustomCircularProgress';
import { useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../navigation/StudentDrawer';

type DashboardStudentRouteProp = RouteProp<RootStackParamList, 'DashboardStudent'>;

const DashboardStudent: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
    const { userInfo, userToken , profileInfo} = useAuth();
    const user = userInfo as { id: number };
    const { isLoading: isLoadingSessions, sessionsPerWeek, averages, weekDaysSimplify, goToNextPage, goToPrevPage, weekRange } = useSessionStatistics(user.id);
    const porcentaje = 0  
    const total= 6;
    const actives=0;

    
    return (
        <ScrollView style={styles.container}>
           
            <View style={styles.container}>
                <CustomLinearChart
                    weekRange={weekRange}
                    data={averages}
                    labels={weekDaysSimplify}
                    goToNextPage={goToNextPage}
                    goToPrevPage={goToPrevPage}
                    isLoading={isLoadingSessions}
                />
            </View>
            {sessionsPerWeek?.sessionsWithDay.map((session, index) => (
                <View key={index} style={styles.cardContainer}>              
                    <View style={styles.userDetails}>
                        <Text style={styles.userName}>{session.day}</Text>
                        <Text>{new Date(session.session_day).toISOString().split('T')[0]}</Text>
                        <Text>{String(session.sessions)} {String(session.sessions) === '1' ? 'vez' : 'veces'} ingreso al app</Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

export default DashboardStudent;

