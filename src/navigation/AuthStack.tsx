import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/public/LoginScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
        </Stack.Navigator>
    )
}
