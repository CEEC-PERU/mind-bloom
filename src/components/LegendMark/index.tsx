import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface Props {
  readonly text: string,
  readonly color: string
}

export default function LegendMark({text, color}: Props) {
  return (
    <View style={styles.row}>
      <View style={{width: 13, height: 13, backgroundColor: color, borderRadius: 3}} />
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    columnGap: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%"
  },
  text: {
    color: "#7A7A7A"
  }
})