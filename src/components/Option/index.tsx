import { StyleSheet, Text,  TouchableOpacity } from 'react-native'

interface Props {
  readonly option: string
  readonly isOptionsDisabled: boolean
  readonly validateAnswer: (option: string)=>void
}


export default function Option({ option, isOptionsDisabled, validateAnswer}: Props) {
  return (
    <TouchableOpacity
      key={option}
      onPress={() => validateAnswer(option)}
      disabled={isOptionsDisabled}
      style={styles.option}
    >
      <Text style={styles.textOption}> {option} </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  option: {
    borderWidth: 2,
    height: 50,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10
  },
  textOption: {
    flex: 1,
    fontSize: 17
},
})