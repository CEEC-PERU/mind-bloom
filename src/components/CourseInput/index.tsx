import { StyleSheet, Text, View, KeyboardTypeOptions } from 'react-native';
import React from 'react';
import { Controller } from 'react-hook-form';
import { TextInput } from 'react-native-paper';

interface CourseInputProps {
    readonly label: string;
    readonly control: any;
    readonly name: string;
    readonly inputType: 'text' | 'number' | 'date' | "email" | "password";
    readonly rules?: any;
}

export default function CourseInput({ label, control, name, inputType, rules }: CourseInputProps) {
    let keyboardType: KeyboardTypeOptions = "default";
    switch (inputType) {
        case "number":
            keyboardType = "numeric";
            break;
        case "password":
            keyboardType = "visible-password";
            break;
        case "email":
            keyboardType = "email-address";
            break;
        case "text":
            keyboardType = "default";
            break;
        default:
            keyboardType = "default";
            break;
    }
    return (
        <View style={styles.container}>
            <Controller
                rules={rules}
                control={control}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <View style={{}}>
                        <TextInput
                            label={label}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            mode={
                                name.includes("description") ||
                                    name === "word" ||
                                    name.includes("meaning") ||
                                    name.includes("evaluation") ||
                                    name.includes("flash-card")
                                    ? "outlined" : "flat"}
                            style={{ backgroundColor: '#fff', padding: 10, fontSize: 15 }}
                            underlineColor="#2B32CE"
                            selectionColor="#2B32CE"
                            activeUnderlineColor="#2B32CE"
                            outlineColor="#2B32CE"
                            activeOutlineColor="#2B32CE"
                            keyboardType={keyboardType}
                            maxLength={rules?.maxLength?.value || undefined}
                            multiline={name === "description"}
                            numberOfLines={name === "description" ? 6 : 1}
                            secureTextEntry={inputType === "password"}
                        />
                        {error && (
                            <Text style={styles.span}>{error.message ?? 'Error'}</Text>
                        )}
                    </View>
                )}
                name={name}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    span: {
        color: 'red',
        fontWeight: '400'
    }
});