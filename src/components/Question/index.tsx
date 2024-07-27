import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface ParsedQuestion {
    question: string,
    options: string[],
    correct_option: string,
    points: number
}

interface Props {
    readonly allQuestions: ParsedQuestion[],
    readonly currentQuestionIndex: number
}

export default function Question({allQuestions, currentQuestionIndex}: Props) {
    return (
        <View>
            <View style={styles.counter}>
                <Text style={styles.text}>
                    {currentQuestionIndex + 1} / {allQuestions.length}
                </Text>
            </View>

            <Text style={styles.textQuestion}>
                {allQuestions[currentQuestionIndex]?.question}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    counter: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    text: {
        fontSize: 18,
    },
    textQuestion: {
        fontSize: 22,
    },
})