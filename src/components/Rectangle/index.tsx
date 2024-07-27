// Rectangle.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface RectangleProps {
  color: string;
  text: string; // Cambié el nombre de la propiedad a 'text'
}

const Rectangle: React.FC<RectangleProps> = ({ color, text }) => {
  return (
    <View style={[styles.rectangle, { backgroundColor: color }]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rectangle: {
    width: 170,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Rectangle;
