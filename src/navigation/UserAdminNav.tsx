import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../screens/auth/admin/DashboardScreen';
import NotasResumenScreen from '../screens/auth/adminuser/NotasResumenScreen';
import CustomDrawer from '../components/CustomDrawer';
import Logo from '../../assets/images/l_variante_n.svg';
import { Icon } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsTest from '../screens/auth/admin/DetailsTest';
import { RootStackParamListAdmin } from '../interfaces/NavigationInterfaces';
import ProfileScreen from '../screens/auth/profile/ProfileScreen';
import { useAuth } from '../context/AuthContext';
import CoursesScreen from '../screens/auth/admin/CoursesScreen';
import UsersScreen from '../screens/auth/admin/UsersScreen';
import CreateCourse from '../screens/auth/admin/CreateCourse';
import CreateUser from '../screens/auth/admin/CreateUser';
import { Profile } from '../interfaces/UserInterfaces';
import ShowProfile from '../screens/auth/profile/ShowProfile';
import CreateModule from '../screens/auth/admin/CreateModule';
import StudentsPerCourse from '../screens/auth/admin/StudentsPerCourse';
import ListUser from '../screens/auth/adminuser/ListUser';
import DescargaDatos from '../screens/auth/adminuser/DescargaDatos';
import RankingScreen from '../screens/auth/adminuser/RankingScreen';
import RankingCourseEvaluation from '../screens/auth/adminuser/RankingCourseEvaluation';
import UsabilidadScreen from '../screens/auth/adminuser/UsabilidadScreen';
import RankingCampaign from '../screens/auth/adminuser/RankingCampaign';
import Requerimiento from '../screens/auth/adminuser/Requerimientos';
import CampaignList from '../screens/auth/adminuser/CampaignList';
import AddStudentsToCampaign from '../screens/auth/adminuser/AddStudentsToCampaign';
const Drawer = createDrawerNavigator<RootStackParamListAdmin>();
const Stack = createStackNavigator<RootStackParamListAdmin>();
const AdminDrawer = () => {
    const { profileInfo, userInfo } = useAuth();
    const email = userInfo as { email: string};
    let defaultScreen: 'Perfil' | 'Dashboard' = 'Perfil'
    let fullname = 'Actualiza tu perfil ';
    let uri_picture = ''
    if (profileInfo) {
        const profile = profileInfo as Profile
        defaultScreen = 'Dashboard';
        fullname = `${profile.first_name} ${profile.last_name} `
        uri_picture = profile.profile_picture!
    }
    

    return (
        <Drawer.Navigator
            initialRouteName={defaultScreen}
            drawerContent={(props) => (
                <CustomDrawer
                    {...props}
                    email={email.email}
                    fullname={fullname}
                    uri_picture={uri_picture}
                />
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
            <Drawer.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    headerTitle: '',
                    drawerIcon: ({ color }) => (
                        <Icon source="collage" color={color} size={22} />
                    ),
                }}
            />
             { /*  <Drawer.Screen
                name="NotasResumen"
                component={NotasResumenScreen}
                options={{
                    headerTitle: '',
                    drawerIcon: ({ color }) => (
                        <Icon source="collage" color={color} size={22} />
                    ),
                }}
            />
                */}
             <Drawer.Screen
                name="CampaignList"
                component={CampaignList}
                options={{
                    headerTitle: '',
                    drawerIcon: ({ color }) => (
                        <Icon source="apps" color={color} size={22} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Ranking"
                component={RankingScreen}
                options={{
                    headerTitle: '',
                    drawerIcon: ({ color }) => (
                        <Icon source="star-outline" color={color} size={22} />
                    ),
                }}
            />

        <Drawer.Screen
                name="Usabilidad"
                component={UsabilidadScreen}
                options={{
                    headerTitle: '',
                    drawerIcon: ({ color }) => (
                        <Icon source="nintendo-switch" color={color} size={22} />
                    ),
                }}
            />

<Drawer.Screen
                name="DescargaDatos"
                component={DescargaDatos}
                options={{
                    headerTitle: '',
                    drawerIcon: ({ color }) => (
                        <Icon source="arrow-down-bold-box" color={color} size={22} />
                    ),
                }}
            />
            
<Drawer.Screen
                name="Requerimiento"
                component={Requerimiento}
                options={{
                    headerTitle: '',
                    drawerIcon: ({ color }) => (
                        <Icon source="message-draw" color={color} size={22} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Usuarios"
                component={UsersScreen}
                options={{
                    headerTitle: '',
                    drawerIcon: ({ color }) => (
                        <Icon source="account-group" color={color} size={22} />
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
       
        </Drawer.Navigator>)
};

const UserAdminNav = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
            name="AdminDrawer"
            component={AdminDrawer}
        />
        <Stack.Screen
            name="Details"
            component={DetailsTest}
            initialParams={{ itemId: 1 }}
            options={{
                headerTintColor: 'white',
                headerRight: () => <Logo width={110} style={{ marginHorizontal: 35 }} />,
               headerStyle: { backgroundColor: '#3C63FF' },
                title: "",
                headerShown: true,
                headerLeftLabelVisible: false,
            }}
        />
       
        <Stack.Screen
            name='CreateUser'
            component={CreateUser}
            options={{
                headerTintColor: 'white',
                headerRight: () => <Logo width={110} style={{ marginHorizontal: 35 }} />,
               headerStyle: { backgroundColor: '#3C63FF' },
                title: "",
                headerLeftLabelVisible: false,
                headerShown: true
            }} />


       
        <Stack.Screen
            name='StudentsPerCourse'
            component={StudentsPerCourse}
            options={{
                headerTintColor: 'white',
                headerRight: () => <Logo width={110} style={{ marginHorizontal: 35 }} />,
               headerStyle: { backgroundColor: '#3C63FF' },
                title: "",
                headerLeftLabelVisible: false,
                headerShown: true
            }}
        />

      

        <Stack.Screen
            name='AddStudentsToCampaign'
            component={AddStudentsToCampaign}
            options={{
                headerTintColor: 'white',
                headerRight: () => <Logo width={110} style={{ marginHorizontal: 35 }} />,
               headerStyle: { backgroundColor: '#3C63FF' },
                title: "",
                headerLeftLabelVisible: false,
                headerShown: true
            }}
        />
         <Stack.Screen
            name='RankingCourseEvaluation'
            component={RankingCourseEvaluation}
            options={{
                headerTintColor: 'white',
                headerRight: () => <Logo width={110} style={{ marginHorizontal: 35 }} />,
               headerStyle: { backgroundColor: '#3C63FF' },
                title: "",
                headerLeftLabelVisible: false,
                headerShown: true
            }} 
        />
         <Stack.Screen
            name='RankingCampaign'
            component={RankingCampaign}
            options={{
                headerTintColor: 'white',
                headerRight: () => <Logo width={110} style={{ marginHorizontal: 35 }} />,
               headerStyle: { backgroundColor: '#3C63FF' },
                title: "",
                headerLeftLabelVisible: false,
                headerShown: true
            }} 
        />

    </Stack.Navigator>
);

export default UserAdminNav;
