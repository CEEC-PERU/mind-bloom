import { View, Text, Image, Pressable, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from 'react-native-paper';
import { windowWidth } from '../../utils/Dimentions';

type ImageType = "profile" | "course" | "flashcard" | "logo";

interface Props {
  readonly onImageSelected: (uri: string, id?: number) => void;
  readonly image_type: ImageType;
  readonly image_uri?: string;
}

interface ImageTypeConfig {
  width: number | "auto";
  height: number;
  borderRadius: number;
  borderWidth?: number;
}

const defaultImageConfig: ImageTypeConfig = {
  width: "auto",
  height: 180,
  borderRadius: 5,
};

const imageTypeConfig: { [key: string]: ImageTypeConfig } = {
  profile: {
    ...defaultImageConfig,
    width: 155,
    height: 155,
    borderRadius: 1000,
  },
  course: {
    ...defaultImageConfig,
    width: "auto",
    height: 180,
    borderRadius: 5,
    borderWidth: 1
  },
  flashcard: {
    ...defaultImageConfig,
    width: windowWidth * 0.35,
    height: 220,
    borderRadius: 5,
    borderWidth: 1
  },
  logo: {
    ...defaultImageConfig,
    width: windowWidth * 0.25,
    height: 105,
    borderRadius: 1000,
    borderWidth: 1
  }
};

export default function CustomImagePicker({ onImageSelected, image_type, image_uri }: Props) {
  const config = imageTypeConfig[image_type] || defaultImageConfig;
  const [image, setImage] = useState<null | string>(null);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, image_type === "profile" ? 4 : 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        onImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ marginLeft: 20, marginBottom: 10, display: image_type === "profile" || image_type === "flashcard" ? "none" : "flex" }}>
        <Text>{image_type === "logo" ? "Selecciona un logo" : "Selecciona una imagen"}</Text>
      </View>
      {image ? (
        <Pressable onPress={pickImage}>
          <Image
            source={{ uri: image }}
            style={{
              width: config.width,
              height: config.height,
              borderRadius: config.borderRadius,
            }}
          />
        </Pressable>
      ) : (
        <Pressable style={{
          width: config.width,
          height: config.height,
          borderRadius: config.borderRadius,
          borderWidth: config.borderWidth,
          justifyContent: "center",
          alignItems: "center",
          borderColor: "#2B32CE",
        }}
          onPress={pickImage}>

          {image_uri ?
            <Image source={{ uri: image_uri }} style={{
              width: config.width,
              height: config.height,
              borderRadius: config.borderRadius,
            }} /> : <Icon size={60} source={"camera"} color="#4951FF"
            />}
        </Pressable>
      )}
    </View>
  );
}


/*
SELECT evaluation_id, quizz_type, name, module_id, is_complete
  FROM public.evaluations;
	
SELECT * FROM COURSES
SELECT * FROM MODULES
SELECT * FROM DICTIONARYQUIZZES
SELECT * FROM FLASHCARDS

DELETE FROM COURSES WHERE COURSE_ID = 
DELETE FROM MODULES WHERE MODULE_ID = 
DELETE FROM DICTIONARYQUIZZES WHERE MODULE_ID = 
DELETE FROM FLASHCARDS WHERE MODULE_ID = 
*/