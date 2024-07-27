import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../navigation/StudentDrawer';
import { useRankingEvaluation } from './hooks/useRankingEvaluation';
import { styles } from './styles';
type RankingScreenRouteProp = RouteProp<RootStackParamList, 'Ranking'>;
const RankingScreen: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
  const route = useRoute<RankingScreenRouteProp>();
  const { totalScore, evaluationId } = route.params;
  const { ranking, loading } = useRankingEvaluation(evaluationId);

  const sortedRanking = ranking.sort((a, b) => {
    const scoreA = parseFloat(a.total_score);
    const scoreB = parseFloat(b.total_score);
  
    if (!isNaN(scoreA) && !isNaN(scoreB)) {
      if (scoreA !== scoreB) {
        return scoreB - scoreA; // Orden descendente
      } else {
        return a.User.Profile.first_name.localeCompare(b.User?.Profile?.first_name);
      }
    } else {
      console.error("Error: total_score no es un número válido");
      return 0;
    }
  });
  
  //  ranking en tres grupos
  const firstPlace = sortedRanking[0];
  const secondPlace = sortedRanking[1];
  const thirdPlace = sortedRanking[2];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RANKING DE</Text>
      <Text style={styles.subtitle}>PARTICIPANTES</Text>
      <View style={styles.rectangle}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            {/* Primer lugar */}
            <View style={styles.topCircleContainer}>
              <View style={styles.circleContainer}>
                <Image source={{ uri: firstPlace.User?.Profile?.profile_picture || 'https://res.cloudinary.com/dk2red18f/image/upload/v1709030685/CEEC/RANKING/uy7xmqjehhtvtddqbbjv.png'}} style={styles.circleImage} />
                <Text style={styles.circleText}>{firstPlace.User?.Profile?.first_name || 'Usuario'} {firstPlace.User?.Profile?.last_name || ''}</Text>
                <View style={styles.pointsContainer}>
                  <Text style={styles.pointsText}>{firstPlace.total_score} puntos</Text>
                </View>
              </View>
            </View>
            {/* Segundo lugar */}
            <View style={styles.bottomCircleContainer}>
              <View style={[styles.circleContainer, styles.leftCircle]}>
                <Image source={{ uri: secondPlace.User?.Profile?.profile_picture || 'https://res.cloudinary.com/dk2red18f/image/upload/v1709030685/CEEC/RANKING/uy7xmqjehhtvtddqbbjv.png'}} style={styles.circleImage} />
                <Text style={styles.circleText}>{secondPlace.User?.Profile?.first_name || 'Usuario'} {secondPlace.User?.Profile?.last_name || ''}</Text>
                <View style={styles.pointsContainer}>
                  <Text style={styles.pointsText}>{secondPlace.total_score} puntos</Text>
                </View>
              </View>
              {/* Tercer lugar */}
              <View style={[styles.circleContainer, styles.rightCircle]}>
                <Image source={{ uri: thirdPlace.User?.Profile?.profile_picture || 'https://res.cloudinary.com/dk2red18f/image/upload/v1709030685/CEEC/RANKING/uy7xmqjehhtvtddqbbjv.png'}} style={styles.circleImage} />
                <Text style={styles.circleText}>{thirdPlace.User?.Profile?.first_name || 'Usuario'} {thirdPlace.User?.Profile?.last_name || ''}</Text>
                <View style={styles.pointsContainer}>
                  <Text style={styles.pointsText}>{thirdPlace.total_score} puntos</Text>
                </View>
              </View>
            </View>
          </>
        )}
      </View>
      <View style={styles.extraRectangle}>
        <Text style={styles.extraText1}>{totalScore} puntos </Text>
      </View>
    </View>
  );
};



export default RankingScreen;
