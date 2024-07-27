import React from 'react';
import { StyleSheet, View, ScrollView, Text , Image} from 'react-native';
import { useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../navigation/StudentDrawer';
import { useModuleScreen } from './../ModuleScreen/hooks/useModule';
import { useNotas} from './../NotasScreen/hooks/useNotas';
import { useRanking} from './hooks/useRanking';
import { useNotasCurso} from './../NotasScreen/hooks/useCurso';

type DetailNotasScreenRouteProp = RouteProp<RootStackParamList, 'DetailNotas'>;

const DetailNotasScreen: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
  const route = useRoute<DetailNotasScreenRouteProp>();
  const { course_id  } = route.params;
  const { courseData, modules } = useModuleScreen(course_id);
  const { notas , fullname , uri_picture} = useNotas(course_id);
  const { notascurso} = useNotasCurso(course_id);
  const { ranking} = useRanking(course_id);
  // Function to calculate the average of the notes
  const calculateAverage = () => {
    if (notas.length === 0) return 0;
    const totalScore = notas.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.total_score), 0);
    return totalScore / notas.length;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.rectangle2 }>
    <Image source={{ uri: uri_picture }} style={{
        width: 140,
        height: 140,
        borderRadius: 1000
    }} />
</View>
     
      {courseData ? (
        <View >
          {notascurso.map((notacurs, index) => (
          <View key={index} style={{...styles.rectangle3, justifyContent: 'center', alignItems: 'center'}}>
  <Text style={styles.rectangleTitle}>{fullname}</Text>
  <Text style={styles.rectangleTitle}>{courseData.name} </Text>
  <Text style={styles.rectangleTitle}>{notacurs.is_finished  ? 'Completado' : 'Pendiente'}</Text>
</View>
    ))}
     {notascurso.map((notacurs, index) => (
<View  key={index}>
<View style={styles.row}>
  <View style={{...styles.whiteRectangle, marginRight: 2}}>
    <Text style={styles.blueText}>Promedio Final</Text>
   
    <Text  key={index} style={[styles.noteText, styles.letraFinal]}>{notacurs.average_score}</Text>
 
  </View>

  <View style={{ ...styles.whiteRectangle, marginLeft: 8 }}>
                  <Text style={styles.blueText}>Orden de Merito</Text>
                  <Text style={[styles.noteText, styles.letraFinal]}>
                    {ranking !== null ? ranking : 'Sin ranking'}
                  </Text>
                </View>
  
</View>
<View style={{ marginHorizontal: 20 }}>
  <View style={styles.rectangle4}>
    <Text style={styles.rectangleTitle}>Evaluaciones</Text>
  </View>
  <View style={{...styles.whiteRectangle, width: '100%', marginTop: 0, borderRadius: 0, height: notas.length * 60}}>
  {notas.map((nota, index) => (
    <View style={styles.moduleContainer} key={index}>
      <Text style={{...styles.moduleText, flex: 1}}>{nota.Evaluation ? nota.Evaluation.name : 'N/A'}</Text>
      <Text style={{...styles.noteText,  marginLeft: 20,}}>{nota.total_score}</Text>
    </View>
  ))}
</View>





</View>

        </View>
      ))}
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  letraFinal: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#E4E7F5',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#EAEAED',
    marginBottom: 16,
    marginTop: 8, // Adjust top margin for better spacing
  },
  courseTitle: {
    color: '#4951FF', // Adjust text color
    fontSize: 24, // Decrease font size
    fontWeight: 'normal', // Set to normal font weight
    textAlign: 'center',
  },
  
  blueText: {
    color: '#4951FF',
    fontWeight: 'bold',
    fontSize: 20, // ajusta el tamaño de la fuente según sea necesario
  },

  rectangleTitle: {
    textAlign : 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    margin:5
  },
  rectangleDivider: {
    borderBottomWidth: 1,
    borderColor: '#EAEAED',
    marginBottom: 8,
  },
  rectangle: {
    width: '100%',
    height: 400,
    borderWidth: 2,
    backgroundColor: '#4951FF',
    borderColor: '#D9D9D9',
    marginBottom: 16,
    marginTop: 8,
    padding: 16,
  },
  rectangle2: {
    width: '100%',
    height: 200,
    borderWidth: 2,
    backgroundColor: '#C1CDF9',
    borderColor: '#D9D9D9',
    justifyContent: 'center', alignItems: 'center'
  },
  rectangle3: {
    width: '100%',
    height: 150,
    
    backgroundColor: '#4951FF',
    borderColor: '#D9D9D9',
  },
  whiteRectangle: {
    width: '50%', // adjust the width to 50% to ensure two elements fit in a row
    height: 100,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:25,
    borderRadius: 15,
  },
  rectangle4: {
    backgroundColor: '#4951FF',
    borderColor: '#D9D9D9',
    borderRadius: 7,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25, // remove horizontal margin
  },
  moduleContainer: {
    paddingTop: 15,
    paddingHorizontal: 20, 
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // This will center align vertically
  },
  moduleText: {
    fontSize: 16,
    color: '#4951FF',
    marginBottom: 8,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  noteText: {
    marginRight: 10,
    fontSize: 16,
    color: '#4951FF',
    marginBottom: 8,
    fontWeight: 'bold',
  },
});

export default DetailNotasScreen;
