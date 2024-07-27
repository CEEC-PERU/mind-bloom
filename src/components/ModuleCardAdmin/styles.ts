import { windowWidth, windowHeight } from '../../utils/Dimentions';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: windowWidth * 0.70,
        padding: 15,
        marginRight: 20,
        backgroundColor: '#F9F9FF',
        borderRadius: 8,
        flexDirection: "column",
        height: windowHeight * 0.40,   
             
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: "20%",
        borderBottomWidth: 1,
        borderBottomColor: "#B1B5FF",
        gap: 2,
        paddingBottom: 10
    },
    cardBody: {
        height: "60%",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#B1B5FF",
        gap: 5
    },
    cardFooter: {
        height: "20%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    link: {
        color: '#4951FF',
        fontWeight: '500'
    },
    date: {
        fontSize: 15
    },
    time: {
        fontSize: 12
    },
    counter: {
        backgroundColor: '#4951FF',
        padding: 5,
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    },
    number: {
        color: '#fff',
        fontSize: 12,
        fontWeight: "bold"
    },
    evaluation: {
        fontWeight: "bold",
        color: '#4951FF',

    },
    name: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#525252"
    },
    nameEvaluation: {
        fontSize: 15,
        marginLeft: 15
    },
    contentBody: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    }
})