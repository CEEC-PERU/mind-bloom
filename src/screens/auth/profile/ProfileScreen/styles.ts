import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flex: 1,
        backgroundColor: "#fff",
        position: 'relative', 
    },
    content: {
        flex: 1,
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginTop: 10,
        rowGap: 30
    },
    text: {
        fontSize: 15,
        fontWeight: '400',
        color: "#8689CD",
        textAlign: 'center', 
    },
    h1: {
        fontSize: 25,
        fontWeight: '600',
        color: "#4951FF",
        marginTop: 5,
        marginBottom: 15,
        textAlign: 'center', 
    },
    form: {
        marginVertical: 20,
        rowGap: 20
    },
    ebook: {
        top: 0, 
        right: 0, 
    },
    image_container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    email: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        margin: 10,
        columnGap: 20
    },
    email_text: {
        fontSize: 15,
        fontWeight: '400',
        color: "#8689CD",
        textAlign: 'center',
    }
});