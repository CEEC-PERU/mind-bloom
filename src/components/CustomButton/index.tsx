import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import React from 'react'

interface Props {
    readonly text: string,
    readonly onPress: () => void,
    readonly disabled: boolean
    readonly size?: "large" | "small"
    readonly type?: "seccondary" | "primary" | "danger"
    
}

export default function CustomButton({ text, onPress, disabled, size, type }: Props) {
    let buttonColor: string;
    switch (type) {
        case "seccondary":
            buttonColor = "#878787";
            break;
        case "danger":
            buttonColor = "red";
            break;
        default:
            buttonColor = "#FAB416";
    }
    return (
        <View>
            <TouchableOpacity
                onPress={onPress}
                style={{
                    backgroundColor: buttonColor,
                    padding: size === "small" ? 10 : 17,
                    borderRadius: 10,
                    marginBottom: type === "danger" || size === "small" ? 13 : 30,
                    alignItems: "center",
                    justifyContent: "center",
                    width: size === "large" ? "80%" : "60%", 
                    alignSelf: "center",
                }}
                disabled={disabled}
            >
                <Text style={{
                    textAlign: 'center',
                    color: "#fff",
                    fontSize: size === "small" ? 13 : 17,
                    fontWeight: '700'
                }}
                >
                    {text}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({})