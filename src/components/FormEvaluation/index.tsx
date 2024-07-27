import { Alert, KeyboardAvoidingView, Platform, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getModuleInfoById } from '../../services/module.service';
import { Material } from '../../interfaces/ContentModuleInterface';
import { Step } from '../../screens/auth/admin/CreateCourse';
import { ScrollView } from 'react-native-gesture-handler';
import { useAuth } from '../../context/AuthContext';
import CustomButton from '../CustomButton';
import { useNavigation } from '@react-navigation/native'
import EvaluationResponseInput from '../EvaluationResponseInput';
import EvaluationQuestion from '../EvaluationQuestion';
import { EvaluationRequest, EvaluationResponse, QuizzRequest } from '../../interfaces/EvaluationInterface';
import { postEvaluation } from '../../services/quizz.service';
import { PostImage } from '../../services/image.service';
import { styles } from './styles';
import LoadIndicator from '../LoadIndicator';

interface Props {
  readonly step: Step
  readonly onEvaluationCreated: (created: boolean) => void
  readonly newModuleId: number
}

export default function FormEvaluation({ newModuleId, onEvaluationCreated, step }: Props) {
  const { userToken } = useAuth();
  const [module, setModule] = useState<null | Material>(null);
  const [nroQuestions, setNroQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<QuizzRequest[]>([]);
  const [evaluationRequest, setEvaluationRequest] = useState<EvaluationRequest>({
    module_id: newModuleId,
    name: "",
  });
  const [newEvaluation, setNewEvaluation] = useState<EvaluationResponse>({
    module_id: newModuleId,
    name: "",
    evaluation_id: 0
  });
  const [errors, setErrors] = useState({
    evaluation_name: false,
    questions: false,
  });

  useEffect(() => {
    setNroQuestions([]);
    setQuestions([]);
    setErrors({
      evaluation_name: false,
      questions: false,
    });
    setEvaluationRequest({
      module_id: newModuleId,
      name: "",
    });
    setNewEvaluation({
      module_id: newModuleId,
      name: "",
      evaluation_id: 0
    });
    (async () => {
      const module = await getModuleInfoById(newModuleId, userToken!);
      setModule(module);
    })();
  }, []);

  const addQuestion = () => {
    setNroQuestions([...nroQuestions, '']);
  };

  const removeQuestion = (index: number) => {
    const updatedNro = [...nroQuestions];
    updatedNro.splice(index, 1);
    setNroQuestions(updatedNro);
    const updateQuestions = [...questions];
    updateQuestions.splice(index - 1, 1);
    setQuestions(updateQuestions);
  };

  const showQuestion = (question: QuizzRequest) => {
    const updatedQuestions = [...questions];

    const existingQuestionIndex = updatedQuestions.findIndex(q => q.order === question.order);
    if (existingQuestionIndex === -1) {
      updatedQuestions.push(question);
    } else {
      updatedQuestions[existingQuestionIndex] = question;
    }
    updatedQuestions.sort((a, b) => a.order! - b.order!);
    setQuestions(updatedQuestions);
    // console.log(JSON.stringify(updatedQuestions, null, 2));
  }

  const navigation = useNavigation();
  const navigateToCoursesScreen = () => {
    navigation.navigate('Cursos' as never)
  };

  const handleChangeInput = (name: keyof EvaluationRequest, text: string | number | string[]) => {
    setEvaluationRequest((prevState) => ({
      ...prevState,
      [name]: text,
    }));
  };

  const validateEvaluation = () => {
    let hasErrors = false;

    if (evaluationRequest.name === "") {
      setErrors(prevState => ({
        ...prevState,
        evaluation_name: true
      }));
      hasErrors = true;
    } else {
      setErrors(prevState => ({
        ...prevState,
        evaluation_name: false
      }));
    }

    if (questions.length === 0) {
      setErrors(prevState => ({
        ...prevState,
        questions: true
      }));
      hasErrors = true;
    } else {
      setErrors(prevState => ({
        ...prevState,
        questions: false
      }));
    }

    return !hasErrors;
  };

  const sendEvaluation = async () => {
    if (validateEvaluation()) {
      setIsLoading(true);
      const updatedQuestions = await Promise.all(questions.map(async (question, index) => {
        const formData = new FormData();
        formData.append('image', {
          uri: question.image_url,
          type: 'image/jpeg',
          name: 'image.jpg'
        } as any);
        const response = await PostImage(formData);
        return { ...question, image_url: response?.imageUrl } as QuizzRequest
      }));
      const evaluationWithQuestions = {
        evaluation: evaluationRequest,
        questions: updatedQuestions
      }
      const response = await postEvaluation(evaluationWithQuestions, userToken!);
      if (response) {
        setIsLoading(false);
        Alert.alert("Éxito", "Se ha creado la evaluación satisfactoriamente");
        navigateToCoursesScreen();
        setNewEvaluation(response);
      }
    } else {
      setIsLoading(false);
      Alert.alert("Error", "Corrija los errores antes de enviar la evaluación")
    }
  };

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
        display: step !== 'evaluation' ? "none" : "flex",
      }}
    >
      <ScrollView style={[styles.container]} >
        <View style={styles.header}>
          <Text style={{ color: "#4951FF", fontSize: 17 }}> Evaluación para el módulo: </Text>
          <Text style={styles.title}>
            {module?.name}
          </Text>
        </View>
        <View style={{ marginTop: 15 }}>
          {errors.evaluation_name && <Text style={styles.dangerText}>Campo requerido</Text>}
          <EvaluationResponseInput
            inputType='text'
            label='Nombre de evaluación'
            name={`evaluation_name`}
            answerType='evaluation_name'
            value={evaluationRequest.name}
            onChangeText={(text) => handleChangeInput("name", text)}
          />
        </View>
        <View style={{ display: "flex", alignItems: "flex-end" }}>
          <View style={{ width: "40%" }}>
            <CustomButton disabled={false} onPress={addQuestion} text='Agregar pregunta' size='small' />
          </View>
        </View>
        {errors.questions && <Text style={styles.dangerText}>Cree una pregunta como mínimo</Text>}
        {nroQuestions.map((_, index) => (
          <View key={_ + index.toString()} style={styles.cardQuestion}>
            <View
              style={styles.questionContainer}
            >
              <CustomButton disabled={false} onPress={() => removeQuestion(index)} text='Eliminar pregunta' size='small' type='danger' />
            </View>
            <EvaluationQuestion order={index + 1} evaluation_id={newEvaluation.evaluation_id} sendQuestion={showQuestion} typeQuizz='evaluation' />
          </View>
        ))}
        <View style={{ marginTop: 15 }}>
          <CustomButton disabled={isLoading} onPress={sendEvaluation} text='Crear evaluación' />
          <CustomButton disabled={isLoading} onPress={() => navigateToCoursesScreen()} text='Crear más tarde' type={"seccondary"} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

