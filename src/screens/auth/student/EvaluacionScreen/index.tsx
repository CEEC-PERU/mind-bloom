import React, { useState, useEffect } from 'react';
import { Image, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { styles } from '../EvaluacionScreen/style';
import { useEvaluation } from './hooks/useEvaluation';
import { useRotation } from '../EvaluacionScreen/hooks/useRotation';
import { Evaluation} from '../../../../interfaces/EvaluationInterface';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../navigation/StudentDrawer';
import { NavigationProp } from '@react-navigation/native';

type EvaluacionScreenRouteProp = RouteProp<RootStackParamList, 'Evaluacion'>;

const EvaluacionScreen: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
  const route = useRoute<EvaluacionScreenRouteProp>();
  const { moduleId , course_id} = route.params;
  const { evaluations, loading } = useEvaluation(moduleId);
  const [rotate, setRotate] = useState(true);
  const rotation = useRotation(rotate);

  useEffect(() => {
    return () => {
      setRotate(false); // Detener la rotación
    };
  }, []);

  return (
    <View style={styles.container3}>
      <View style={styles.container2}>
        <View style={styles.container}>
          <Text style={styles.title}>Evaluación</Text>
        </View>
        <View style={styles.bannerContainer}>
          <Image
            source={{
              uri: 'https://cdn.iconscout.com/icon/free/png-512/free-quiz-4039217-3354814.png?f=webp&w=256',
            }}
            style={[styles.banner, { transform: [{ rotate: `${rotation}deg` }] }]}
            resizeMode="contain"
            
          />
        </View>
        {loading ? (
  <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
) : (
  evaluations.length > 0 ? (
    evaluations.map((evaluation, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          console.log('evaluation.evaluation_id:', evaluation.Evaluation?.evaluation_id);
          navigation.navigate('Quiz', { evaluationId: evaluation.Evaluation?.evaluation_id  , course_id});
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Comenzar</Text>
      </TouchableOpacity>
    ))
  ) : (
    <Text>No evaluations available</Text>
  )
)}
      </View>
    </View>
  );
};

export default EvaluacionScreen;
