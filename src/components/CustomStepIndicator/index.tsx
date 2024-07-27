import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import StepIndicator from 'react-native-step-indicator';

const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#5FBDFF',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#5FBDFF',
    stepStrokeUnFinishedColor: '#D9D9D9',
    separatorFinishedColor: '#5FBDFF',
    separatorUnFinishedColor: '#D9D9D9',
    stepIndicatorFinishedColor: '#5FBDFF',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#5FBDFF',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#D9D9D9',
    labelColor: '#fff',
    labelSize: 11,
    currentStepLabelColor: '#5FBDFF'
}

interface Props {
    readonly currentPosition: number
    readonly labels: string[]
}

export default function CustomStepIndicator({ currentPosition, labels }: Props) {
    return (
        <View style={styles.container}>
            <StepIndicator
                customStyles={customStyles}
                currentPosition={currentPosition}
                labels={labels}
                stepCount={labels.length}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%"
    }
})