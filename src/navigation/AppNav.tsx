import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { LoadIndicator } from '../components';
import AdminNav from './AdminNav';
import StudentDrawer from './StudentDrawer';
import UserAdminNav from './UserAdminNav';
import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import NoSignalScreen from '../screens/public/NoSignalScreen';

export default function AppNav() {
    const { userToken, isLoading, userInfo } = useAuth();
    const [isConnected, setIsConnected] = useState<boolean | null>(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    if (!isConnected) {
        return (
            <NoSignalScreen />
        );
    }

    let role = 'visitor';

    if (userInfo) {
        const user = userInfo as {
            id: number,
            role: number,
            email: string
        }
        switch (user.role) {
            case 1:
                role = 'student'
                break;
            case 2:
                role = 'admin'
                break;
            case 3:
                role = 'useradmin'
                break;
            default:
                break;
        }
    }
    if (isLoading) {
        return <LoadIndicator animating size='large' />;
    }

    let drawerComponent;

    if (userToken !== null) {
            drawerComponent = role === 'admin' ? <AdminNav /> : (role === 'useradmin' ? <UserAdminNav /> : <StudentDrawer />);
    } else {
        drawerComponent = <AuthStack />;
    }

    return (
        <NavigationContainer>
            {drawerComponent}
        </NavigationContainer>
    );
}
