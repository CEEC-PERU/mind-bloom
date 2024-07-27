import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
        borderRadius: 8,
        overflow: "scroll",
        rowGap: 10,
    },
    containerChart: {
        paddingBottom: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        padding: 15,
    },
    date: {
        marginHorizontal: 10,
        color: "#4E4E4E"
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginHorizontal: 25,
        marginBottom: 20
    },
    button: {
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        columnGap: 10
    },
    label: {
        color: "#9E9E9E",
        fontSize: 12
    }
})
