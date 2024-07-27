import { StyleSheet } from 'react-native';

import { windowWidth } from '../../../utils/Dimentions';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginTop: 20,
    },
    text: {
        fontSize: 15,
        fontWeight: '400',
        color: "#8689CD",
        textAlign: 'center',
    },
    h1: {
        marginTop: 25,
        fontSize: 25,
        fontWeight: '600',
        color: "#fff",
        marginVertical: 15,
        textAlign: 'center',
    },
    form: {
        marginVertical: 20,
        rowGap: 30,
        width: windowWidth * 0.8,
    },
    ebook: {
        top: 0,
        right: 0,
        height: 120,
        width: 120,
        marginBottom: 0,
    },
    logo: {
        height: 150,
        width: 220,
        marginBottom: 0,
        marginTop: 0,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', 
        justifyContent: 'center',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    errorText: {
        color: 'red',
        fontWeight: '400',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      modalScroll: {
        maxHeight: 300,
        marginBottom: 20,
      },
      modalText: {
        fontSize: 14,
        textAlign: 'justify',
      },
      modalButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
      },
      modalButtonText: {
        color: 'white',
        fontSize: 16,
      },
      title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      subTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
      },
      paragraph: {
        fontSize: 12,
        marginBottom: 10,
        lineHeight: 24,
      },
});
