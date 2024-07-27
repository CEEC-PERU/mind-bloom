import { StyleSheet } from "react-native";
import { windowWidth } from "../../utils/Dimentions";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: windowWidth,
      paddingVertical: 20,
      paddingHorizontal: 20,
      backgroundColor: '#fff',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
    },
    cardQuestion: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: "#9C9C9C",
      paddingRight: 10,
      paddingLeft: 10,
      paddingTop: 5,
      marginBottom: 15
    },
    questionContainer: {
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingTop: 8
    },
    header: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      rowGap: 10
    },
    title: {
      fontWeight: "bold",
      color: "#4951FF",
      fontSize: 17
    },
    dangerText: {
      color: 'red',
      margin: 0,
      padding: 0
    },
    scrollContainer: {
      flex: 1,
      width: windowWidth,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#fff',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
    },
  })