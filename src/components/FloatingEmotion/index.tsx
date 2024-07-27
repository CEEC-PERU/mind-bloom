import React, { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, Dimensions, Image } from 'react-native';

interface FloatingEmotionProps {
  gifSource: any; // Ruta de la imagen GIF
}

const { height } = Dimensions.get('window');

const FloatingEmotion: React.FC<FloatingEmotionProps> = ({ gifSource }) => {
  const [position] = useState(new Animated.Value(height)); // Comenzar desde la parte inferior de la pantalla

  useEffect(() => {
    Animated.timing(position, {
      toValue: -height, // Mover el emoji arriba y fuera de la pantalla
      duration: 4000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.imageContainer, { transform: [{ translateY: position }] }]}>
      <Image source={gifSource} style={styles.gifImage} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    zIndex: 9999,
    alignSelf: 'center', // Centrar horizontalmente
  },
  gifImage: {
    width: 100, // Ajustar el tamaño de la imagen GIF según sea necesario
    height: 100,
  },
});

export default FloatingEmotion;
