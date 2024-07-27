import { StyleSheet } from 'react-native';
import { windowWidth, windowHeight } from '../../../../utils/Dimentions';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 0,
  },
  header: {
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingBottom: 5,
  },
  searchInput: {
    backgroundColor: '#6B88FE',
    color: '#fff',
    height: 50,
    width: windowWidth * 0.92,
    borderRadius: 30,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  cardContainer: {
    borderRadius: 20,
    width: windowWidth * 0.92,
    height: 180,
    marginBottom: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  imageContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    overflow: 'hidden',
  },
  logoContainer: {
    marginTop:10,
    marginLeft:80,
    width: 68, 
    height: 25, 
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logo: {
    width: '100%', // Asegura que la imagen del logo se ajuste completamente al contenedor
    height: '100%',
  },
  
  cardImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
  bottomImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
export const textStyles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  courseTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 0,
  },
  loadingText: {
    fontSize: 18,
    color: '#4951FF',
    textAlign: 'center',
  },
});