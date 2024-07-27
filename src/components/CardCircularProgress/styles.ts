import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        borderRadius: 8,
    },
    containerChart: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10,
    },
    column: {
        flex: 1,
        padding: 8,
        alignItems: "center",
        justifyContent: "center",
        rowGap: 15,
    },
    row: {
        flexDirection: "row"
    },
    legend: {
        justifyContent: "flex-start",
        width: "100%"
    },
    title: {
        alignItems: "center",
        marginTop: 15,
        marginHorizontal:15 
    }
})