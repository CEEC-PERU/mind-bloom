import { StyleSheet } from 'react-native';

export const quizScreenStyles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    paddingTop: 20,
    paddingHorizontal: 20,
    height: '100%',
  },
  questionImage: {
    width: '100%', // Ocupar el 100% del ancho del contenedor
    height: 250,   // Ajustar el tamaño según sea necesario
    marginBottom: 6,
    borderRadius: 12, 
  }, 
  questionContainer: {
    backgroundColor: '#7849FF',
    borderRadius: 12,
    padding: 10,
    position: 'relative', // Agregar posición relativa
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
    marginVertical: 14,
    flex: 1,
  },
  optionButton: {
    paddingVertical: 12,
    marginVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20, // Cambiar el radio de borde a 20
    backgroundColor: '#7849FF',
    alignItems: 'center', // Alinear el contenido al centro
  },
  optionTextLeft: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    textAlign: 'left',
  },
  optionTextCenter: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  correctOption: {
    backgroundColor: '#4CAF50',
  },
  incorrectOption: {
    backgroundColor: '#FF5733',
  },
  elapsedTimeText: {
    fontSize: 18,
    color: '#0B109F',
    marginTop: 0,
    marginBottom: 0,
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
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  question: {
    fontSize: 17,
    color:'#7849FF',
    alignItems: 'center', 
    margin:9,
    fontWeight: 'bold',
    textAlign: 'center', // Center align the text
  },
  parent: {
    height: '100%',
  },
  noQuestionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
  }
  , optionText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
  incorrectIcon: {
    color: '#FF73F9',
    position: 'absolute',
    right: 10,
    fontSize: 24,
  },
});
