import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useCallback } from 'react'
import { CardStudent, CustomButton, CustomSearcher, LoadIndicator } from '../../../../components'
import { windowHeight } from '../../../../utils/Dimentions'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamListAdmin } from '../../../../interfaces/NavigationInterfaces';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { useUsersData } from './hooks/useUsersData';
type Props = {
  readonly navigation: NativeStackNavigationProp<RootStackParamListAdmin, 'Users'>;
};
export default function UsersScreen({ navigation }: Props) {
  const { fetchData, filteredData, isLoading, setSearchedText, users } = useUsersData();
  const navigateToCreateCourse = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: "CreateUser"
      })
    )
  }
  const handleSearch = (text: string) => {
    setSearchedText(text)
  }
  
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <View>
      <View style={{ height: windowHeight * 0.19, display: "flex", backgroundColor: "#fff", padding: 20 }}>
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#333',
        }}>Usuarios</Text>
        <Text style={{ fontSize: 15, fontWeight: '300' }}>Ahora cuenta con {users.length} usuarios</Text>
        <View style={{
          marginVertical: 10
        }}>
          <CustomSearcher onSearch={handleSearch} />
        </View>
      </View>
      {isLoading ?
        <View style={{ display: "flex", height: windowHeight * 0.64 }}>
          <LoadIndicator animating size='large' />
        </View> :
        <ScrollView style={{ display: "flex", backgroundColor: "#fff", padding: 20, height: windowHeight * 0.64 }}>
          {
            filteredData.map(user => (
              <CardStudent cardType='users' student={user} key={user.user_id} />
            ))
          }

        </ScrollView>
      }
      <View style={{ padding: 20, display: "flex", backgroundColor: "#fff" }}>
        <CustomButton disabled={false} onPress={() => navigateToCreateCourse()} text='Agregar usuario' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})