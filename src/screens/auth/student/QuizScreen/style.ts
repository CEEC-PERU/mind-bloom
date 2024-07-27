// moduleScreenStyles.ts
import { StyleSheet } from 'react-native';

export const quizScreenStyles = StyleSheet.create({
  incorrectIcon: {
    color: '#FF73F9',
    position: 'absolute',
    right: 10,
    fontSize: 24,
  },
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
    container: {
        paddingTop: 20,
        paddingHorizontal: 20,
        height: '100%',
      },
      questionImage: {
        width: '100%', // Ocupar el 100% del ancho del contenedor
        height: 150,   // Ajustar el tamaño según sea necesario
        marginBottom: 10,
        borderRadius: 12, 
      },
    
      questionContainer: {
        backgroundColor: '#7849FF',
        borderRadius: 12,
        padding: 10,
        marginBottom:20,
        position: 'relative', // Agregar posición relativa
      },
      elapsedTimeText: {
        fontSize: 14,
        marginTop: 5,
        color: '#0B109F',
      },
            
    
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      loadingText: {
        fontSize: 32,
        fontWeight: '700',
      },
      top: {
        marginVertical: 16,
      },
      options: {
        marginVertical: 16,
        flex: 1,
      
      },
      optionButton: {
        paddingVertical: 12,
        marginVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 12,
        backgroundColor: '#7849FF',
        alignItems: 'flex-start', 
      },
      correctOption: {
        backgroundColor: '#4CAF50',
      },
      incorrectOption: {
        backgroundColor: '#FF5733',
      },
      optionText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
        textAlign: 'left', // alinear el texto a la izquierda
      },
      bottom: {
        marginBottom: 12,
        paddingVertical: 16,
        justifyContent: 'center',
        flexDirection: 'row',
      },
      button: {
        backgroundColor: '#4557F8',
        padding: 12,
        width:150,
        paddingHorizontal: 16,
        borderRadius: 10,
        alignItems: 'center', 
        marginBottom: 20,
      },
      buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
      },
      question: {
        fontSize: 17,
        margin:5,
        fontWeight: 'bold',
        color:'#7849FF',
        textAlign : 'center'
      },
      parent: {
        height: '100%',
      },
      noQuestionsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
});
