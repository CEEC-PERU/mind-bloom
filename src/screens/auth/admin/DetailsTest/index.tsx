import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootStackParamList, RootStackParamListAdmin } from '../../../../interfaces/NavigationInterfaces';
import { RouteProp, useRoute } from '@react-navigation/native';

type DetailsTestScreenRouteProp = RouteProp<RootStackParamListAdmin, 'Details'>;

export default function DetailsTest() {
  const route = useRoute<DetailsTestScreenRouteProp>();
  const { params } = route;
  const userId = params ? params.itemId : null;
  return (
    <View>
      <Text>test {userId}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})