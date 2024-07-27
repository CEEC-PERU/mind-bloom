import { Text, View } from 'react-native'
import React from 'react'
import { styles } from './styles'

interface Props {
    readonly text: string
}
export default function Subtitle({ text }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.h2}>{text}</Text>
        </View>
    )
}
