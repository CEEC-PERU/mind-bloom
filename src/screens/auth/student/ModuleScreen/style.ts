// moduleScreenStyles.ts
import { StyleSheet } from 'react-native';
import { windowWidth , windowHeight } from '../../../../utils/Dimentions';

export const moduleScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0FF',
    marginBottom: 0,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#EAEAED',
    marginBottom: 16,
    marginTop: 5,
  },
  containercourse: {
    padding: 0,
  },
  courseImageContainer: {
    width: '100%', 
    position: 'relative',
    overflow: 'hidden',
  },
  courseImage: {
    marginTop: 15,
    width: '100%', // La imagen ocupa todo el ancho de su contenedor
    aspectRatio: 16 / 9, // Proporción de aspecto (puedes ajustar esto según la relación de aspecto deseada)
  },
  courseImageOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#920404', // Color de sombra
    opacity: 0.7, // Opacidad de la sombra
  }, 
  searcher: {
    margin: 16 
},
  courseInfo: {
    marginBottom: 8,
  },
  courseTitle: {
    position: 'absolute',
    top: 0, // Posición en la parte superior del contenedor
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 25, // Añade un relleno superior para separar el título del borde superior
  },
  courseDescription: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#fff',
    fontSize: 15,
    paddingTop: 80, // Añade un relleno superior para separar el título del borde superior
  },
  subtitulo: {
    textAlign: 'center',
    color: '#3C63FF',
    fontWeight: 'bold',
    fontSize: 16,

    marginTop:12
  },
  bottomImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
