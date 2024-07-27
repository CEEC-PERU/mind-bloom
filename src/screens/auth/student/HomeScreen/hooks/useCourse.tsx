



import React,{ useEffect, useState } from 'react';
import { Platform , Alert} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '../../../../../context/AuthContext';
import { getCourseByIdUser } from '../../../../../services/courses.service';
import { sendRegisterNotification } from '../../../../../services/notification.service';
import { CampaignCoursesData } from '../../../../../interfaces/CourseInterfaces';
import * as Device from 'expo-device';
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications';
import { getDevicePushTokenAsync } from 'expo-notifications';
import * as firebase from 'firebase/app';
import 'firebase/messaging';




Notifications.setNotificationHandler({
  handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
  }),
});


export const useCourse = () => {
  const { userInfo, userToken, profileInfo } = useAuth();
  const [courseData, setCourseData] = useState<CampaignCoursesData>({ campaignCourses: [] });
  const [firstName, setFirstName] = useState<string>('');
  const [fcmToken, setFcmToken] = useState<string>('');
   const getExpoPushToken = async () => {
    try {
    
        if (Constants.platform?.ios || Constants.platform?.android) {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
        if (Device.isDevice) {
          const { status } = await Notifications.requestPermissionsAsync();
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                alert("Failed to get push token for push notification");
                return;
            }
            const deviceToken = await Notifications.getExpoPushTokenAsync({
              projectId:  Constants.expoConfig?.extra?.eas?.projectId,
            });
            console.log(deviceToken);
           const deviceTokenString = JSON.stringify(deviceToken);
          console.log(deviceTokenString);
      
            const savedToken = await SecureStore.getItemAsync('deviceToken');
            if (savedToken !== deviceToken.data) {
              // El token recibido es diferente al token guardado, enviar al servidor
              await SecureStore.setItemAsync('deviceToken', deviceToken.data);
              if (userInfo && typeof userInfo !== 'string' && userInfo.id && userToken) {
                const notification = {
                  user_id: userInfo.id,
                  token: deviceToken.data,
               };
               console.log('Ntofication Data:', notification);
                await sendRegisterNotification(notification, userToken);
   
              } else {
                console.error('User token is null or undefined.');
                // Handle this case accordingly
              }
              console.log('Nuevo token de notificación de dispositivo:', deviceToken.data);
              // Aquí puedes enviar el nuevo token al servidor
             
          } else {
              console.log('El token de notificación de dispositivo no ha cambiado.');
          }

            console.log('Ntofication Data:', savedToken);
           } else {}
    } catch (error) {
        console.error('Error al obtener el token de notificación:', error);
    }
};

useEffect(() => {
  const initializeFirebase = async () => {
    try {
      firebase.initializeApp({
        apiKey: "AIzaSyC_L4FJm-JWVnCjWPLhzTSTBHUhvpdi-q0",
        authDomain: "mindbloom-c615e.firebaseapp.com",
        projectId: "mindbloom-c615e",
        storageBucket: "mindbloom-c615e.appspot.com",
        messagingSenderId: "37240905717",
        appId: "1:37240905717:android:e80517e3fc9a2bafc48abc",
      });
    } catch (error) {
      console.error('Error initializing Firebase:', error);
    }
  };

  initializeFirebase();
}, []);
useEffect(() => {
 
    getExpoPushToken();
    return () => {
    };
}, []);


  useEffect(() => {
    const fetchCourseData = async () => {
      if (userInfo && typeof userInfo !== 'string' && userInfo.id && userToken) {
        try {
          const courses = await getCourseByIdUser(userInfo.id, userToken);
          console.log(courses);
          setCourseData(courses);
        } catch (error) {
          console.error('Error while fetching course data:', error);
        }
      }
    };


    if (profileInfo && 'first_name' in profileInfo) {
      setFirstName(profileInfo.first_name);
    }


    fetchCourseData();
  }, [userInfo, userToken, profileInfo]);


  return { courseData, firstName };
};



