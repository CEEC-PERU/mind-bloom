import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        rowGap: 10,
        padding: 20,
    },
    imageProfile: {
        height: 80,
        width: 80,
        borderRadius: 50,
        marginBottom: 10
    },
    image: {
        height: 80,
        width: 190,
        marginBottom: 10
    },
    textTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold'
    },
    text: {
        marginLeft:12,
        color: '#fff',
        fontSize: 13
    },
    body: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#B6B9FF'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    }
})