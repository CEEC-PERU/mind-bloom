import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    containerHexagon: {
        alignSelf: 'flex-start',
        overflow: 'hidden'
    },
    hexagon: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        position: 'absolute',
    },
    headerText: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold'
    },
    container: {
        flexDirection: 'row',
        marginVertical: 20,
        paddingRight: 20
    },
    containerText: {
        width: "65%",
        marginHorizontal: 10,
        flexDirection: 'column',
        gap: 7
    },
    subHeaderText: {
        flex: 1,
        flexWrap: 'wrap',
        fontSize: 14,
        color: "#787878"
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    }
})