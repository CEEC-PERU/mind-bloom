import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Step } from '../../screens/auth/admin/CreateCourse';
import { windowWidth } from '../../utils/Dimentions';
import { getModuleInfoById } from '../../services/module.service';
import { useAuth } from '../../context/AuthContext';
import { Material } from '../../interfaces/ContentModuleInterface';
import CourseInput from '../CourseInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { rules } from '../../utils/Rules';
import { FlashCardRequest } from '../../interfaces/FlashCardInterfaces';
import CustomButton from '../CustomButton';
import { postFlashCard } from '../../services/flashcard.service';
import CustomImagePicker from '../CustomImagePicker';
import { PostImage } from '../../services/image.service';
import LoadIndicator from '../LoadIndicator';


interface ImageObject {
  id: number;
  image: string;
}

interface ImagesState {
  correct_images: ImageObject[];
  incorrect_images: ImageObject[];
}
interface Props {
  readonly step: Step
  readonly onFlashCardCreated: (created: boolean) => void
  readonly newModuleId: number
}

export default function FormFlashCard({ newModuleId, onFlashCardCreated, step }: Props) {
  const { userToken } = useAuth();
  const [module, setModule] = useState<null | Material>(null);
  const { control, handleSubmit, getValues } = useForm<any>();
  const [images, setImages] = useState<ImagesState>({
    correct_images: [{ id: 0, image: "" }],
    incorrect_images: [{ id: 0, image: "" }]
  });
  const [isLoading, setIsLoading] = useState(false);

  const saveFlashCards: SubmitHandler<any> = async (data) => {
    setIsLoading(true);
    const formData = getValues();
    const request = await jsonFormater(formData);
    const response = await postFlashCard(request, userToken!);
    if (response.data.error) {
      Alert.alert("Error", `${response?.data.error}`);
      onFlashCardCreated(false);
      setIsLoading(false);
    } else {
      Alert.alert("Éxito", `${response?.data.message}`);
      onFlashCardCreated(true);
      setIsLoading(false);
    }
  }

  const jsonFormater = async (json: any): Promise<FlashCardRequest> => {
    const correct_answers = await Promise.all(images.correct_images.map(async (image) => {
      if (image.id !== 0 && image.image !== "") {
        const formData = new FormData();
        formData.append('image', {
          uri: image.image,
          type: 'image/jpeg',
          name: 'image.jpg'
        } as any);
        const response = await PostImage(formData);
        return response!.imageUrl;
      } else {
        return "https://icones.pro/wp-content/uploads/2021/05/icone-point-d-interrogation-question-violet.png";
      }
    }));

    const incorrect_answers = await Promise.all(images.incorrect_images.map(async (image) => {
      if (image.id !== 0 && image.image !== "") {
        const formData = new FormData();
        formData.append('image', {
          uri: image.image,
          type: 'image/jpeg',
          name: 'image.jpg'
        } as any);
        const response = await PostImage(formData);
        return response!.imageUrl;
      } else {
        return "https://icones.pro/wp-content/uploads/2021/05/icone-point-d-interrogation-question-violet.png";
      }
    }));
    if (correct_answers.length > 0) {
      correct_answers.shift();
    }

    if (incorrect_answers.length > 0) {
      incorrect_answers.shift();
    }
    const transformedJson: FlashCardRequest = {
      indication: json["flash-card"],
      correct_answer: correct_answers,
      incorrect_answer: incorrect_answers,
      module_id: newModuleId,
      quizztype_id: 2
    };

    return transformedJson;
  }

  const handleImageSelected = (image: string, id: number, isCorrect: boolean) => {
    const key = isCorrect ? 'correct_images' : 'incorrect_images';
    const index = images[key].findIndex(item => item.id === id);
    if (index !== -1) {
      const newImages = [...images[key]];
      newImages[index].image = image;
      setImages({ ...images, [key]: newImages });
    } else if (index) {
      setImages(prevImages => {
        const updatedImages = { ...prevImages };
        updatedImages[key] = [...prevImages[key], { id, image }];
        return updatedImages;
      })
    }
  };

  useEffect(() => {
    (async () => {
      const module = await getModuleInfoById(newModuleId, userToken!);
      setModule(module);
    })();
  }, []);

  if (isLoading) return <View style={styles.scrollContainer}>
    <LoadIndicator animating size='large' />
  </View>

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        display: step !== 'flash-card' ? "none" : "flex",
      }}
    >
      <ScrollView style={{
        flex: 1,
        width: windowWidth,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
      }} >
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <Text style={{
            color: "#4951FF",
            fontWeight: "bold"
          }}> Módulo: </Text>
          <Text style={{
            color: "#4951FF"
          }}>
            {module?.name}
          </Text>
        </View>
        <View style={{ marginTop: 15 }}>
          <CourseInput
            control={control}
            name='flash-card'
            label='Indicaciones'
            inputType='text'
            rules={rules}
          />
          <Text>Opciones correctas:</Text>
          <View style={[styles.correctCards, { marginBottom: 20, flexDirection: "row" }]}>
            <ScrollView horizontal={true}>
              {[1, 2, 3].map(number => (
                <View key={number} style={{
                  paddingHorizontal: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <CustomImagePicker onImageSelected={(image: string) => handleImageSelected(image, number, true)} image_type='flashcard' />
                </View>
              ))}
            </ScrollView>
          </View>
          <Text>Opciones incorrectas:</Text>
          <View style={[styles.incorrectCards, { marginBottom: 20, flexDirection: "row" }]}>
            <ScrollView horizontal={true}>
              {[1, 2, 3].map(number => (
                <View key={number} style={{
                  display: "flex",
                  paddingHorizontal: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <CustomImagePicker onImageSelected={(image: string) => handleImageSelected(image, number, false)} image_type='flashcard' />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
        <View>
          <CustomButton disabled={isLoading} text='Guardar flash cards' onPress={handleSubmit(saveFlashCards)} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>

  )
}

const styles = StyleSheet.create({
  correctCards: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#3FE11C",
    borderRadius: 10,
    marginTop: 15,
    paddingTop: 15
  },
  incorrectCards: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FF0000",
    borderRadius: 10,
    marginTop: 15,
    paddingTop: 15
  },
  scrollContainer: {
    flex: 1,
    width: windowWidth,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  }
})