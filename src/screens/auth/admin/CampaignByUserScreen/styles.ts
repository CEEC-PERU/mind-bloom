import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 15,
        rowGap: 10,
        paddingBottom: 20,
    },
    button: {
        backgroundColor: '#7849FF',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 30,
      },
      buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
      },
    bottomButton: {
        padding: 15,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
})
