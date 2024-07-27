import { styles } from "./styles"
import { View } from 'react-native'
import React from 'react'
import LegendMark from '../LegendMark'
import Subtitle from "../Subtitle"

interface Props {
    readonly children: React.ReactNode
    readonly title: string,
    readonly leyend: {text: string, color: string}[]
}

export default function CardCircularProgress({ children, leyend,  title }: Props) {
    let counter = 0;
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Subtitle text={title} />
            </View>
            <View style={styles.containerChart}>
                <View style={styles.column}>
                    {children}
                </View>
                <View style={styles.column}>
                    {
                        leyend.map((t, i) => <LegendMark color={t.color} text={t.text}  key={t.text + counter++}/>)
                    }
                </View>
            </View>
        </View>

    )
}