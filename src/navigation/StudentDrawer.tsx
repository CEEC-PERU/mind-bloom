

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
const Drawer = createDrawerNavigator();
import Logo from '../../assets/images/l_variante_n.svg';
import { Icon } from 'react-native-paper';

import HomeScreen from '../screens/auth/student/HomeScreen';
import ModuleScreen from '../screens/auth/student/ModuleScreen';
import MaterialScreen from '../screens/auth/student/MaterialScreen';
import FlashCardScreen from '../screens/auth/student/FlashCardScreen';
import EvaluacionScreen from '../screens/auth/student/EvaluacionScreen';
import DiccionarioScreen from '../screens/auth/student/DiccionarioScreen';
import QuizScreen from '../screens/auth/student/QuizScreen';
import ResultScreen from '../screens/auth/student/ResultScreen';
import ResultDiccionario from '../screens/auth/student/ResultDiccionarioScreen';
import RankingScreen from '../screens/auth/student/RankingScreen';
import DetailNotasScreen from '../screens/auth/student/DetailNotasScreen';
import NotasScreen from '../screens/auth/student/NotasScreen';
import PreQuizScreen from '../screens/auth/student/PreQuizScreen';
import DashboardStudent from '../screens/auth/student/DashboardStudent';
import ResultPreQuizScreen from '../screens/auth/student/ResultPreQuizScreen';
import { useAuth } from '../context/AuthContext';
import { Profile } from '../interfaces/UserInterfaces';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/auth/profile/ProfileScreen';
import ShowProfile from '../screens/auth/profile/ShowProfile';
//A navigator can only contain Screen Group or React.Fragment as its direct children (found)
export type RootStackParamList = {
    //cursos
    DashboardStudent : undefined
    StudentDrawer: undefined
    Home: undefined;
    Module: { course_id: number };
    Material: { moduleId: number  };
    FlashCard: { moduleId: number };
    Evaluacion: { moduleId: number , course_id :number};
    Diccionario: { moduleId: number , course_id :number};
    Quiz: { evaluationId: number , course_id :number};
    Result: { totalScore: number, elapsedTime: number, evaluationId: number,
     effectiveness: number , totalQuestions : number , course_id: number};
    ResultDiccionario: { totalQuestions: number, correctAnswers: number , course_id :number };
    Ranking: { totalScore: number, evaluationId: number };
    //Notas
    Notas: undefined;
    DetailNotas: { course_id: number };
    //PreQuiz
    CourseQuiz: undefined;
    PreQuiz: { course_id: number };
    ResultPreQuiz: {totalScore: number ,  totalQuestions: number, 
     tiempo : number ,effectiveness: number , course_id :number};
};

const Stack = createStackNavigator<RootStackParamList>();

const StudentDrawer = () => {
 

    const { profileInfo, userInfo } = useAuth();
    const email = userInfo as { email: string };
    let defaultScreen: 'Perfil' | 'Cursos' = 'Perfil'
    let fullname = 'Actualiza tu perfil ';
    let uri_picture = ''
    if (profileInfo) {
        const profile = profileInfo as Profile
        defaultScreen = 'Cursos';
        fullname = `${profile.first_name} ${profile.last_name}`
        uri_picture = profile.profile_picture!
    }

    return (
        <Drawer.Navigator
            initialRouteName={defaultScreen}
            drawerContent={(props) => (
                <CustomDrawer {...props} email={email.email} fullname={fullname} uri_picture={uri_picture} />
            )}
            screenOptions={{
                drawerActiveBackgroundColor: '#3C63FF',
                drawerActiveTintColor: '#fff',
                headerTitleStyle: { fontSize: 18 },
                headerTintColor: 'white',
                headerRight: () => <Logo width={110} style={{ marginHorizontal: 35 }} />,
                headerStyle: { backgroundColor: '#3C63FF' },
            }}
        >
            <Drawer.Screen name="Cursos" component={HomeScreen} options={{
                headerTitle: 'Cursos',
                drawerIcon: ({ color }) => (
                    <Icon source="book" color={color} size={22}
                    />
                ),
            }} />

            <Drawer.Screen name=" Notas / Estado de curso " component={NotasScreen}
                options={{
                    headerTitle: 'Notas ',
                    drawerIcon: ({ color }) => (
                        <Icon source="book-edit" color={color} size={22} />
                    ),
                }}
            />
             <Drawer.Screen name="Sesiones" component={DashboardStudent}
                options={{
                    headerTitle: '',
                    drawerIcon: ({ color }) => (
                        <Icon source="folder-account" color={color} size={22} />
                    ),
                }}
            />


<Drawer.Screen
                name="Perfil"
                component={!profileInfo ? ProfileScreen : ShowProfile}
                options={{
                    headerTitle: '',
                    drawerIcon: ({ color }) => (
                        <Icon source="account-circle" color={color} size={22} />
                    ),
                }}
            />

        </Drawer.Navigator>
    );
}


const StudentNav = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
            name="StudentDrawer"
            component={StudentDrawer}

        />
        <Stack.Screen name="Home" component={HomeScreen} options={{
            headerTintColor: 'white',
            headerRight: () => <Logo width={110} style={{ marginHorizontal: 35 }} />,
            headerStyle: { backgroundColor: '#3C63FF' },
            headerLeftLabelVisible: false,
            headerShown: true
        }} />
        <Stack.Screen name="Module" component={ModuleScreen} options={{
            headerTintColor: 'white',
            headerRight: () => <Logo width={110} style={{ marginHorizontal: 35 }} />,
            headerStyle: { backgroundColor: '#3C63FF' },
            headerLeftLabelVisible: false,
            headerShown: true
        }} />
        <Stack.Screen name="Material" component={MaterialScreen} options={{
            headerTintColor: 'white',
            headerRight: () => <Logo width={110} style={{ marginHorizontal: 35 }} />,
            headerStyle: { backgroundColor: '#3C63FF' },
            headerLeftLabelVisible: false,
            headerShown: true
        }} />
        <Stack.Screen name="FlashCard" component={FlashCardScreen} options={{
            headerTintColor: 'white',
            headerRight: () => <Logo width={110} style={{ marginHorizontal: 35 }} />,
            headerStyle: { backgroundColor: '#3C63FF' },
            headerLeftLabelVisible: false,
            headerShown: true
        }} />
        <Stack.Screen name="Evaluacion" component={EvaluacionScreen} options={{
            headerTintColor: 'white',
            headerRight: () => <Logo width={110} style={{ marginHorizontal: 35 }} />,
            headerStyle: { backgroundColor: '#3C63FF' },
            headerLeftLabelVisible: false,
            headerShown: true
        }} />
        <Stack.Screen name="Diccionario" component={DiccionarioScreen} options={{
            headerTintColor: 'white',
            headerRight: () => <Logo width={110} style={{ marginHorizontal: 35 }} />,
            headerStyle: { backgroundColor: '#3C63FF' },
            headerLeftLabelVisible: false,
            headerShown: true
        }} />

  
        <Stack.Screen 
        name='Quiz'
        component={QuizScreen} 
        options={{
            headerTintColor: 'white',
            headerRight: () => <Logo width={110} style={{ marginHorizontal: 35 }} />,
            headerStyle: { backgroundColor: '#3C63FF' },
            headerLeftLabelVisible: false,
            headerShown: true,
         
        }} 
        />

        <Stack.Screen name="Result" component={ResultScreen} options={{
            headerTintColor: 'white',
            headerRight: () => <Logo width={110} style={{ marginHorizontal: 35 }} />,
            headerStyle: { backgroundColor: '#3C63FF' },
            headerLeftLabelVisible: false,
            headerShown: true,
            headerBackTitle: 'Módulos', 
        }} />
        <Stack.Screen name="Ranking" component={RankingScreen} options={{
            headerTintColor: 'white',
            headerRight: () => <Logo width={110} style={{ marginHorizontal: 35 }} />,
            headerStyle: { backgroundColor: '#3C63FF' },
            headerLeftLabelVisible: false,
            headerShown: true
        }} />
        <Stack.Screen name="ResultDiccionario" component={ResultDiccionario} options={{
            headerTintColor: 'white',
            headerRight: () => <Logo width={110} style={{ marginHorizontal: 35 }} />,
            headerStyle: { backgroundColor: '#3C63FF' },
            headerLeftLabelVisible: false,
            headerShown: true
        }} />

        <Stack.Screen name="Notas" component={NotasScreen} options={{
            headerTintColor: 'white',
            headerRight: () => <Logo width={110} style={{ marginHorizontal: 35 }} />,
            headerStyle: { backgroundColor: '#3C63FF' },
            headerLeftLabelVisible: false,
            headerShown: true
        }} />
        <Stack.Screen name="DetailNotas" component={DetailNotasScreen}
            options={{
                headerTintColor: 'white',
                headerRight: () => <Logo width={110} style={{ marginHorizontal: 35 }} />,
                headerStyle: { backgroundColor: '#3C63FF' },
                headerLeftLabelVisible: false,
                headerShown: true
            }} />


        <Stack.Screen name="PreQuiz" component={PreQuizScreen}
            options={{
                headerTintColor: 'white',
                headerRight: () => <Logo width={110} style={{ marginHorizontal: 35 }} />,
                headerStyle: { backgroundColor: '#3C63FF' },
                headerLeftLabelVisible: false,
                headerShown: true
            }} />

        <Stack.Screen name="ResultPreQuiz" component={ResultPreQuizScreen}
            options={{
                headerTintColor: 'white',
                headerRight: () => <Logo width={110} style={{ marginHorizontal: 35 }} />,
                headerStyle: { backgroundColor: '#3C63FF' },
                headerLeftLabelVisible: false,
                headerShown: true
            }} />
    </Stack.Navigator>
);

export default StudentNav;
