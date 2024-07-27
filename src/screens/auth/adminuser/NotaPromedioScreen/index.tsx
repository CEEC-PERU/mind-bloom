import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Icon as UIIcon } from '@rneui/themed'; // Importa el ListItem y el Icon de la biblioteca @rneui/themed
import { windowHeight } from '../../../../utils/Dimentions';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamListAdmin } from '../../../../interfaces/NavigationInterfaces';

type Props = {
  readonly navigation: NativeStackNavigationProp<RootStackParamListAdmin, 'DescargaDatos'>;
};

export default function DescargaDatos({ navigation }: Props) {
  const [expandedCampaigns, setExpandedCampaigns] = useState<boolean>(false); // Estado para controlar si las campañas están expandidas o no

  const toggleCampaigns = useCallback(() => {
    setExpandedCampaigns(!expandedCampaigns);
  }, [expandedCampaigns]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.texto}>Descarga Data General</Text>

        {/* Botón para desplegar las opciones de descarga por campaña */}
        <TouchableOpacity style={styles.button} onPress={toggleCampaigns}>
          <Text style={{ color: 'white' }}>Descarga por Campaña</Text>
        </TouchableOpacity>

        {/* Lista de campañas */}
        {expandedCampaigns && (
          <View>
          

<ListItem  bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Contactados</ListItem.Title>
          <Icon name="book" size={30} color="#4951FF" />
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
           
          </View>
        )}

        <Text style={styles.texto}>Descarga por Curso</Text>
        {/* Implementa la funcionalidad de descarga por curso aquí */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  texto: {
    textAlign: 'center',
    color: '#6885F8',
    fontSize: 20,
    width: 250,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#6885F8',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
