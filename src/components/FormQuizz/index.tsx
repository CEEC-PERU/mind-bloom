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
import { EvaluationRequest, EvaluationResponse, QuizzEvaluationRequest, QuizzRequest } from '../../interfaces/EvaluationInterface';
import { postEvaluation, postPrequizz } from '../../services/quizz.service';
import { PostImage } from '../../services/image.service';
import { styles } from './styles';
import { PrequizzRequest } from '../../interfaces/PrequizzInterface';
import LoadIndicator from '../LoadIndicator';
import { windowWidth } from '../../utils/Dimentions';
import { DictionaryRequest } from '../../interfaces/DictionaryInterfaces';
import { postDictionary } from '../../services/dictionary.service';

interface Props {
    readonly step: Step
    readonly onEvaluationCreated: (created: boolean) => void
    readonly itemId: number
    readonly typeQuizz: "evaluation" | "prequizz" | "dictionary"
    readonly title: string
}

export default function FormQuizz({ itemId, onEvaluationCreated, step, typeQuizz, title }: Props) {
    const { userToken } = useAuth();
    const [module, setModule] = useState<null | Material>(null);
    const [nroQuestions, setNroQuestions] = useState<string[]>([]);
    const [questions, setQuestions] = useState<QuizzRequest[] | QuizzEvaluationRequest[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [evaluationRequest, setEvaluationRequest] = useState<EvaluationRequest>({
        module_id: itemId,
        name: "",
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
            module_id: itemId,
            name: "",
        });
        if (typeQuizz === "evaluation") {
            (async () => {
                const module = await getModuleInfoById(itemId, userToken!);
                setModule(module);
            })();
        }
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
        if (evaluationRequest.name === "" && typeQuizz === "evaluation") {
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

    const getUpdateData = async () => {
        return await Promise.all(questions.map(async (question, index) => {
            if (question.image_url) {
                const formData = new FormData();
                formData.append('image', {
                    uri: question.image_url,
                    type: 'image/jpeg',
                    name: 'image.jpg'
                } as any);
                const response = await PostImage(formData);
                return { ...question, image_url: response?.imageUrl, evaluation_id: itemId } as QuizzRequest | QuizzEvaluationRequest
            } else {
                return { ...question, image_url: "", evaluation_id: itemId } as QuizzRequest | QuizzEvaluationRequest
            }
        }));
    }

    const sendQuizz = async () => {
        if (validateEvaluation()) {
            if (typeQuizz === "evaluation") {
                const updatedQuestions = await getUpdateData();
                const evaluationWithQuestions = {
                    evaluation: evaluationRequest,
                    questions: updatedQuestions
                }
                const response = await postEvaluation(evaluationWithQuestions, userToken!);
                if (response) {
                    Alert.alert("Éxito", "Se ha creado la evaluación satisfactoriamente");
                    navigateToCoursesScreen();
                    return;
                }
            } else if (typeQuizz === "dictionary") {
                setIsLoading(true)
                const updatedQuestions = await getUpdateData();
                const dictionaryQuestions: DictionaryRequest[] = updatedQuestions.map(question => {
                    const questionFormat: DictionaryRequest = {
                        correct_answer: [question.correct_answer],
                        incorrect_answer: question.incorrect_answer!,
                        word: question.image_url,
                        module_id: itemId,
                        quizztype_id: 3
                    }
                    return questionFormat
                });
                const response = await postDictionary(dictionaryQuestions, userToken!);
                if (response) {
                    Alert.alert("Éxito", "Se ha creado el diccionario satisfactoriamente");
                    setIsLoading(false);
                    onEvaluationCreated(true);
                    return;
                }
            } else if (typeQuizz === "prequizz") {
                setIsLoading(true);
                const updatedQuestions = await getUpdateData();
                const prequizzQuestions: PrequizzRequest[] = updatedQuestions.map(question => {
                    const questionFormat: PrequizzRequest = {
                        correct_answer: question.correct_answer,
                        incorrect_answer: question.incorrect_answer!,
                        image_url: question.image_url,
                        question: question.question,
                        course_id: itemId,
                    }
                    return questionFormat
                });
                const response = await postPrequizz(prequizzQuestions, userToken!);
                if (response) {
                    setIsLoading(false);
                    Alert.alert("Éxito", "Se ha creado el prequizz satisfactoriamente");
                    navigateToCoursesScreen();
                    return;
                } else {
                    Alert.alert("Error", "No se pudo crear el prequizz, intente más tarde");
                }
            }

        } else {
            Alert.alert("Error", "Corrija los errores antes de enviar la evaluación")
        }
    };


    let quizzText;
    if (typeQuizz === "prequizz") {
        quizzText = "PREQUIZZ PARA EL CURSO:";
    } else if (typeQuizz === "dictionary") {
        quizzText = "DICCIONARIO PARA EL MÓDULO:";
    } else {
        quizzText = "EVALUACIóN PARA EL MÓDULO:";
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
                display: step === 'prequizz' || step === "dictionary" ? "flex" : "none",
            }}
        >
            <ScrollView style={[styles.container]} >
                <View style={styles.header}>
                    <Text style={{ color: "#4951FF", fontSize: 14, }}>{quizzText}</Text>
                    <Text style={{ color: "#4951FF", fontSize: 17, fontWeight: 'bold', marginBottom: 35 }}>{title.toUpperCase()}</Text>
                </View>
                {typeQuizz === "evaluation" &&
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
                }
                <View style={{ display: "flex", alignItems: "flex-end" }}>
                    <View style={{ width: "40%" }}>
                        <CustomButton disabled={false} onPress={addQuestion} text={typeQuizz === "dictionary" ? "Agregar palabra" : "Agregar pregunta"} size='small' />
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
                        <EvaluationQuestion order={index + 1} evaluation_id={0} sendQuestion={showQuestion} typeQuizz={typeQuizz} />
                    </View>
                ))}
                <View style={{ marginTop: 15 }}>
                    <CustomButton disabled={isLoading} onPress={sendQuizz} text={`Crear ${typeQuizz}`} />
                    <CustomButton disabled={isLoading} onPress={() => navigateToCoursesScreen()} text='Crear más tarde' type={"seccondary"} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

