import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Icon } from 'react-native-paper';

interface Props {
    readonly icon: string
    readonly text: string
    readonly onPress?: () => void
    readonly widthText: number
    readonly isVisible?: boolean
    readonly disabled?: boolean
}

export default function AnimatedButton({ icon, onPress, text, widthText, isVisible = false, disabled = false }: Props) {
    const width = useSharedValue(50);

    width.value = withSpring(isVisible ? widthText : 50);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: width.value,
        };
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} disabled={disabled}>
                <Animated.View style={[styles.button, animatedStyle, disabled && styles.disabledButton]}>
                    <Icon size={27} source={icon} color="#fff" />
                    {isVisible && (
                        <Text style={styles.text}>{text}</Text>
                    )}
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginHorizontal: 8
    },
    button: {
        padding: 11,
        backgroundColor: 'blue',
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    disabledButton: {
        backgroundColor: 'gray',
    },
});