// MaterialScreen.tsx
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../navigation/StudentDrawer';
import { useMaterial } from './hooks/useMaterial';
import { extractVideoSource } from './hooks/extractDriveFileId'; // Renombrada para generalizar el propósito
import { materialScreenStyles as styles } from './styles';
import { LoadIndicator } from '../../../../components';

type MaterialScreenRouteProp = RouteProp<RootStackParamList, 'Material'>;

const MaterialScreen: React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
  const route = useRoute<MaterialScreenRouteProp>();
  const { moduleId } = route.params;
  const video = useRef(null);
  const { material, loading } = useMaterial(moduleId);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [status, setStatus] = useState({});

  if (loading) {
    return (
      <View style={styles.container}>
        <LoadIndicator animating size='large'/>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {material.length > 0 ? (
        material.map((item) => (
          <View key={item.module_id} style={styles.videoContainer}>
            {isVideoLoading && (
              <ActivityIndicator style={styles.videoLoadingIndicator} size="large" color="#0000ff" />
            )}
            {item.ppt_url && (
              <Video
                ref={video}
                style={styles.video}
                source={{
                  uri: (item.ppt_url),
                }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onPlaybackStatusUpdate={(status) => {
                  setStatus(() => status);
                  if (!status.isLoaded) {
                    setIsVideoLoading(true);
                  } else {
                    setIsVideoLoading(false);
                  }
                }}
              />
            )}
          </View>
        ))
      ) : (
        <Text>No material data available</Text>
      )}
    </View>
  );
};

export default MaterialScreen;
