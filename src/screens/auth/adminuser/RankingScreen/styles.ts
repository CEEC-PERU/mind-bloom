import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  
    leftContainer: {
        width: "50%",
        alignSelf: 'flex-start',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 100,
      },
    rightContainer: {
        width: "50%",
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        height: 100,
    },
    name: {
        color: "#4951FF",
        fontWeight: "bold",
        fontSize: 16,
    },
    label: {
        color: "#4951FF",
        fontWeight: "400",
        fontSize: 13,
    },
    container: {
        marginTop:50,
        backgroundColor: "#FAFAFF",
        marginHorizontal:60,
        flexDirection: "row",
        padding: 20,
        borderLeftWidth: 7,
        borderRadius: 7,
        overflow: "hidden",
        borderColor:"#4951FF",
    },
    bottomButton: {
        padding: 15,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    fondo: {
      backgroundColor: "#fff",
    },
})
