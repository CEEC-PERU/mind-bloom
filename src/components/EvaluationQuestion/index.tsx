import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import EvaluationResponseInput from '../EvaluationResponseInput';
import { Icon } from 'react-native-paper';
import CustomImagePicker from '../CustomImagePicker';
import { QuizzEvaluationRequest, QuizzRequest } from '../../interfaces/EvaluationInterface';


interface Props {
    readonly order: number
    readonly evaluation_id: number
    readonly sendQuestion: (question: QuizzRequest) => void
    readonly typeQuizz: "evaluation" | "prequizz" | "dictionary"
}

export default function EvaluationQuestion({ order, evaluation_id, sendQuestion, typeQuizz }: Props) {
    const [incorrectAnswers, setIncorrectAnswers] = useState(['']);
    const [selectedImage, setSelectedImage] = useState("");

    const handleImageSelected = (image: string) => {
        setSelectedImage(image);
    }
    const addIncorrectAnswer = () => {
        setIncorrectAnswers([...incorrectAnswers, '']);
    };
    const handleIncorrectAnswerChange = (index: number, value: string) => {
        const updatedAnswers = [...incorrectAnswers];
        updatedAnswers[index] = value;
        setIncorrectAnswers(updatedAnswers);
    };

    const [question, setQuestion] = useState<QuizzRequest | QuizzEvaluationRequest>({
        correct_answer: "",
        evaluation_id: evaluation_id,
        image_url: "",
        incorrect_answer: undefined,
        points: 0,
        question: "",
        quizz_type: 1
    });

    type QuizzKeys = keyof (QuizzRequest & QuizzEvaluationRequest);

    const handleChangeInput = (name: QuizzKeys, text: string | number | string[]) => {
        setQuestion((prevState) => ({
            ...prevState,
            image_url: selectedImage,
            incorrect_answer: incorrectAnswers,
            [name]: text,
        }));
    };



    const removeIncorrectAnswer = (indexToRemove: number) => {
        const updatedAnswers = [...incorrectAnswers];
        updatedAnswers.splice(indexToRemove, 1);
        setIncorrectAnswers(updatedAnswers);
        handleChangeInput("incorrect_answer", updatedAnswers);
    };

    useEffect(() => {
        sendQuestion({ ...question, incorrect_answer: incorrectAnswers, order });
    }, [question, incorrectAnswers]);

    useEffect(() => {
        setIncorrectAnswers(['']);
        setQuestion({
            correct_answer: "",
            evaluation_id: evaluation_id,
            image_url: "",
            incorrect_answer: [''],
            points: 0,
            question: "",
            quizz_type: 1
        });
    }, []);

    return (
        <View>

            {
                typeQuizz === "evaluation" &&
                <>
                    <Text style={{ color: "#4951FF", }}> {`Pregunta ${order}`} </Text>
                    <EvaluationResponseInput
                        inputType='text'
                        label='Pregunta'
                        name={`question`}
                        answerType='question'
                        value={question?.question || ''}
                        onChangeText={(text) => handleChangeInput('question', text)}
                    />
                </>
            }


            <CustomImagePicker onImageSelected={handleImageSelected} image_type='course' />

            <Text style={{ color: "#4951FF", }}> Respuesta correcta: </Text>
            <EvaluationResponseInput
                inputType='text'
                label='Respuesta'
                name={`correct_answer`}
                answerType='correct_answer'
                value={question?.correct_answer || ''}
                onChangeText={(text) => handleChangeInput('correct_answer', text)}
            />

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={{ color: "#4951FF", }}> Respuestas incorrectas: </Text>
                <Pressable onPress={addIncorrectAnswer}>
                    <Icon size={25} source={"plus-circle"} color='#2B32CE' />
                </Pressable>
            </View>

            {incorrectAnswers.map((answer, index) => (
                <View
                    key={index}
                    style={styles.containerQuestion}
                >
                    <EvaluationResponseInput
                        inputType='text'
                        label='Respuesta'
                        name={`incorrect_answer_${index}`}
                        answerType='incorrect_answer'
                        value={answer}
                        onChangeText={(text) => handleIncorrectAnswerChange(index, text)}
                    />
                    <Pressable onPress={() => removeIncorrectAnswer(index)}>
                        <Icon size={25} source={"close-circle"} color='red' />
                    </Pressable>
                </View>
            ))}
            {
                typeQuizz === "evaluation" &&
                <>
                    <Text style={{ color: "#4951FF", }}> Puntos de pregunta: </Text>
                    <EvaluationResponseInput
                        inputType='number'
                        label='Puntos'
                        name={`points`}
                        answerType='points'
                        value={(question as QuizzEvaluationRequest)?.points}
                        onChangeText={(text) => handleChangeInput("points", text)}
                    />
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    containerQuestion: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5
    }
})