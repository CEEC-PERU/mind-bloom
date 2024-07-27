import { StyleSheet, } from "react-native";
import { windowHeight } from "../../../../utils/Dimentions";

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
        paddingHorizontal: 20,
        paddingTop: 20
    },
    textHeaderBold: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    textHeader: {
        fontSize: 15,
        fontWeight: '300'
    },
    searcher: {
        marginVertical: 10
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: windowHeight * 0.6,
    },
    listStudentsToAdd: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        columnGap: 10,
        marginTop: 20,
        marginBottom: 10
    },
    buttonAddAll: { display: "flex", width: 55, height: 55, borderRadius: 20, justifyContent: "center", alignItems: "center", marginVertical: 20 },
    containerAdd: { display: "flex", flexDirection: "row", alignItems: "center", columnGap: 10 }
});