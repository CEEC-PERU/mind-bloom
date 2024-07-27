import { StyleSheet } from 'react-native';

export const quizScreenStyles = StyleSheet.create({
  
  answersContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 5,
  },
  answerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    color: 'white',
  },
  incorrectSelected: {
    backgroundColor: '#FF6F6F',
  },
  incorrectIcon: {
    color: '#FF73F9',
    position: 'absolute',
    right: 10,
    fontSize: 24,
  },
  clapIcon: {
    fontSize: 32,
  },
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 20,
    height: '100%',
  },
  questionImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 12,
  },
  elapsedTimeText: {
    fontSize: 18,
    color: '#0B109F',
    marginTop: 0,
    marginBottom: 20,
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
    marginVertical: 8,
    marginLeft: 15,
    marginRight: 15,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#7849FF',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
  correctOption: {
    backgroundColor: '#4CAF50',
  },
  incorrectOption: {
    backgroundColor: '#FF6F6F',
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
    width: 150,
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
    fontSize: 18,
    color: 'white',
    margin: 10,
    fontWeight: 'bold',
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