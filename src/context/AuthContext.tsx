import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { Platform } from "react-native";
import { AuthProps } from "../interfaces/ContextInterfaces";
import * as SecureStore from 'expo-secure-store';
import { loginService } from "../services/auth.service";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { LoginResponse, Profile, UserInfo } from "../interfaces/UserInterfaces";
import { io } from 'socket.io-client';
import { API_SOCKET_URL } from '../utils/Endpoints.ts';
import { validateToken } from "../helpers/helper-token";
import { AppState } from 'react-native';
import { GetProfile } from "../services/profile.service";


//en el authcontext acoplar para obtener el token como el ejemplo de documentacion , obtener token de mobile para relizar notification el hacer login 
const socket = io(API_SOCKET_URL);
const AuthContext = createContext<AuthProps>({});
export const useAuth = () => {
    return useContext(AuthContext);
}
export const AuthProvider = ({ children }: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    const [userInfo, setUserInfo] = useState<{
        id: number,
        role: number,
        email: string,
        client_id : number
    } | string | null>(null);
    const [profileInfo, setProfileInfo] = useState<Profile | UserInfo | null>(null);
    const [expoPushToken, setExpoPushToken] = useState<string>('');
    // Función para obtener el token de notificación



    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response: LoginResponse = await loginService({ email, password });
            if (response.token) {
             
                axios.defaults.headers.common['Authorization'] = response.token;
                const decodedToken: { id: number; role: number; email: string ; client_id : number} = jwtDecode(response.token);
                setUserToken(response.token);


                setUserInfo({ id: decodedToken.id, role: decodedToken.role, email: decodedToken.email , client_id : decodedToken.client_id});


                await SecureStore.setItemAsync('userToken', response.token);
                await SecureStore.setItemAsync('userInfo', JSON.stringify({
                    id: decodedToken.id,
                    role: decodedToken.role,
                    email: decodedToken.email,
                    client_id : decodedToken.client_id,
                }));
                const profile = await GetProfile(decodedToken.id);
                if (profile) {
                    setProfileInfo(profile);
                    await SecureStore.setItemAsync('profileInfo', JSON.stringify(profile));
                }

                
                if (decodedToken.role === 1) {
                    socket.emit('login', { userToken: response.token });
                    
                }
            } else {
                setError(response.msg ?? 'Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error en el proceso de inicio de sesión:', error);
        } finally {
            setIsLoading(false);
        }
    };


    const logout = async () => {
        const storedUserInfo = await SecureStore.getItemAsync('userInfo');
        const { role } = JSON.parse(storedUserInfo!);
        if (role === 1) socket.emit('logout');
        setIsLoading(true);
        setUserToken(null);
        setUserInfo(null);
        setProfileInfo(null);
        await SecureStore.deleteItemAsync('userToken');
        await SecureStore.deleteItemAsync('userInfo');
        await SecureStore.deleteItemAsync('profileInfo');
        setIsLoading(false);
    }


    useEffect(() => {
        const handleAppStateChange = async (nextAppState: string) => {
            if (nextAppState === 'background')
                socket.emit('logout');
        };
        const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);
        return () => {
            appStateSubscription.remove();
        };
    }, []);


    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const storedUserToken = await SecureStore.getItemAsync('userToken');
                const storedUserInfo = await SecureStore.getItemAsync('userInfo');
                const isValid = await validateToken(storedUserToken);
                
                if (storedUserInfo && isValid) {
                    const storedProfileInfo = await SecureStore.getItemAsync('profileInfo');
                    if (storedProfileInfo)
                        setProfileInfo(JSON.parse(storedProfileInfo));
                    const { id, role, email , client_id} = JSON.parse(storedUserInfo);
                    setUserToken(storedUserToken);
                    setUserInfo({ id, role, email , client_id});
                    if (role === 1)
                        socket.emit('login', { userToken: storedUserToken });
                   
                } else {
                    setUserToken(null);
                    setUserInfo(null);
                }

                

                setIsLoading(false);
            } catch (error) {
                console.error(error);
                throw error;
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);


    const value = useMemo(() => {
        return {
            onLogin: login,
            onLogout: logout,
            isLoading,
            userToken,
            error,
            userInfo,
            profileInfo
        };
    }, [login, logout, isLoading, userToken, error, userInfo, profileInfo]);


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}








