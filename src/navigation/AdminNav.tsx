import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../screens/auth/admin/DashboardScreen';
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
import CampaignScreen from '../screens/auth/admin/CampaignScreen';
import CreateCampaign from '../screens/auth/admin/CreateCampaign';
import ClientesScreen from '../screens/auth/admin/ClientesScreen';
import CreateUserAdmin from '../screens/auth/admin/CreateUserAdmin';
import RequirementList from '../screens/auth/admin/RequerimientoList';
import CampaignUserScreen from '../screens/auth/admin/CampaignUserScreen';
import CampaignByUserScreen from '../screens/auth/admin/CampaignByUserScreen';
import CreateCampaignCourse from '../screens/auth/admin/CreateCampaignCourse';

const Drawer = createDrawerNavigator<RootStackParamListAdmin>();
const Stack = createStackNavigator<RootStackParamListAdmin>();

const AdminDrawer = () => {
    const { profileInfo, userInfo } = useAuth();
    const email = userInfo as { email: string };
    let defaultScreen: 'Perfil' | 'Dashboard' = 'Perfil'
    let fullname = 'Actualiza tu perfil ';
    let uri_picture = ''
    if (profileInfo) {
        const profile = profileInfo as Profile
        defaultScreen = 'Dashboard';
        fullname = `${profile.first_name} ${profile.last_name}`
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
             <Drawer.Screen
                name="Clientes"
                component={ClientesScreen} /*{CoursesScreen}*/
                options={{
                    headerTitle: '',
                    drawerIcon: ({ color }) => (
                        <Icon source="book-open" color={color} size={22} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Campaña"
                component={CampaignScreen} /*{CoursesScreen}*/
                options={{
                    headerTitle: '',
                    drawerIcon: ({ color }) => (
                        <Icon source="book-open" color={color} size={22} />
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
                name="RequerimientoList"
                component={RequirementList}
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

        </Drawer.Navigator>
    )
};

const AdminNav = () => (
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
            name="Cursos"
            component={CoursesScreen}
            
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
            name="CreateCourse"
            component={CreateCourse}
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
            name='CreateUser'
            component={CreateUser}
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
            name="CreateModule"
            component={CreateModule}
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
            name='CreateUserAdmin'
            component={CreateUserAdmin}
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
            name='CreateCampaign'
            component={CreateCampaign}
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
            name='CampaignUserScreen'
            component={CampaignUserScreen}
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
            name='CreateCampaignCourse'
            component={CreateCampaignCourse}
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
            name='CampaignByUserScreen'
            component={CampaignByUserScreen}
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

export default AdminNav;
