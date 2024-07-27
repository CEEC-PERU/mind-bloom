import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { windowWidth } from '../../utils/Dimentions'
import { ScrollView } from 'react-native-gesture-handler'
import CourseInput from '../CourseInput'
import { ModuleRequest } from '../../interfaces/CourseInterfaces'
import { useForm, SubmitHandler } from 'react-hook-form'
import CustomButton from '../CustomButton'
import { PostModule } from '../../services/module.service'
import { Step } from '../../screens/auth/admin/CreateCourse'
import { rules } from '../../utils/Rules'
import LoadIndicator from '../LoadIndicator'
interface Props {
  readonly newCourseId: number
  readonly onModuleCreated: (moduel_id: number, name: string) => void
  readonly step: Step
}
export default function FormModule({
  newCourseId,
  onModuleCreated,
  step
}: Props) {
  const { control, handleSubmit, setValue } = useForm<ModuleRequest>();
  const [isLoading, setIsLoading] = useState(false);
  const createModule: SubmitHandler<ModuleRequest> = async (data) => {
    try {
      setIsLoading(true);
      const { name, ppt_url } = data
      const response = await PostModule({
        name,
        ppt_url,
        course_id: newCourseId
      });
      if (response) {
        setIsLoading(false);
        Alert.alert("Éxito", `${response?.message}`);
        onModuleCreated(response?.newModule.module_id ?? 0, response.newModule.name);
        setValue("name", "");
        setValue("ppt_url", "");
        setValue("course_id", newCourseId);
      }
    } catch (error) {
      Alert.alert("Error", `${error}`);
      setValue("course_id", newCourseId);
      setValue("ppt_url", "");
      setValue("name", "");
      console.error(error);
    }
  }
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
        display: step !== "module" ? "none" : "flex"

      }}
    >
      <ScrollView style={{
        flex: 1,
        width: windowWidth,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
      }} >
        <Text style={{ color: '#4951FF', textAlign: "center", fontWeight: "500", fontSize: 17 }}>Módulo {1}</Text>
        <View style={{
          width: "100%",
          marginTop: 20
        }}>
          <CourseInput inputType='text' name='name' control={control} label='Nombre del módulo' rules={rules} />
          <CourseInput inputType='text' name='ppt_url' control={control} label='URL del material de la clase' rules={rules} />
          <View style={{ display: "flex" }}>
            <CustomButton text='Crear módulo' onPress={handleSubmit(createModule)} disabled={isLoading} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>

  )
}

const styles = StyleSheet.create({
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