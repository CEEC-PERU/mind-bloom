// CourseCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Icon } from '@rneui/themed';

interface CourseCardProps {
  name: string;
  image: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ name, image }) => {
  return (
    <Card>
      <Card.Image source={{ uri: image }} style={styles.cardImage} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{name}</Text>
        <Icon name="arrow-right" size={30} color="#4951FF" />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardImage: {
    width: '100%',
    height: 150,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
  },
});

export default CourseCard;
