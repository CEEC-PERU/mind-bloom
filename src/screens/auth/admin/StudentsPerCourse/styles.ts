import { StyleSheet } from 'react-native'


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollViewContent: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 10,
        rowGap: 10,
        paddingBottom: 10,
        paddingHorizontal: 20
    },
    header: {
        display: "flex",
        backgroundColor: "#fff",
        padding: 20
    },
    textHeaderBold: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    textHeader: {
        fontSize: 15,
        fontWeight: '300'
    }
})
