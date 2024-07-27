import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    text2: {
        fontWeight: 'bold',
      },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3C63FF',
    },
    cardContainer: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    userDetails: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 5,
        rowGap: 10,
        paddingBottom: 20
    },
    h1: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    h2: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 14,
        fontWeight: '100',
    }
})
