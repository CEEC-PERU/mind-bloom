import { View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'

interface CourseInputProps {
    readonly label: string;
    readonly name: string;
    readonly inputType: 'text' | 'number' | 'date';
    readonly answerType: 'correct_answer' | 'incorrect_answer' | 'question' | 'evaluation_name' | 'points';
    readonly value: string | number;
    readonly onChangeText?: (text: string) => void;
}

export default function EvaluationResponseInput({ label, name, inputType, answerType, value, onChangeText }: CourseInputProps) {
    const keyboardType = inputType === 'number' ? 'numeric' : 'default';
    return (
        <View style={{
            display: "flex",
            flexDirection: "row",
            width: answerType === "incorrect_answer" ? "90%" : "100%",
            alignItems: "center",
            justifyContent: "space-between"
        }}>
            <TextInput
                label={label}
                mode={"outlined"}
                style={{ 
                    backgroundColor: '#fff', 
                    padding: 3, 
                    fontSize: 15, 
                    marginBottom: 15, 
                    width: "100%"
                }}
                underlineColor="#2B32CE"
                selectionColor="#2B32CE"
                activeUnderlineColor="#2B32CE"
                outlineColor="#2B32CE"
                activeOutlineColor="#2B32CE"
                keyboardType={keyboardType}
                value={value.toString()}
                onChangeText={onChangeText}
            />
            
        </View>
    )
}

