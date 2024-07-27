import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  
  banner: {
    height: 350,
    width: 350,
  },
  title: {
    color: '#3840F1',
    fontSize: 36,
    fontWeight: '600',
    textAlign: 'center', // Agregar aquí
  },
  bannerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  container: {
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#7849FF',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  container2: {
    paddingTop: 45,
    paddingHorizontal: 20,
    height: '100%',
  },
  container3: {
    color:'#fff',
    paddingTop: 40,
    paddingHorizontal: 16,
    height: '92%',
  },
  loadingIndicator: {
    marginTop: 20, // Add any other styling as needed
    Color: '#7849FF',
  },
});
