import { StyleSheet } from 'react-native'
  export const styles = StyleSheet.create({
    whiteRectangle: {
      width: '100%',
      height: 'auto', // Usar 'auto' permitirá que el rectángulo se ajuste automáticamente al contenido
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    
    },
    whiteRectangle2: {
      width: '100%', // adjust the width to 50% to ensure two elements fit in a row
      height: 100,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:5
    },
    icon:{
        height:20,
        width:20,
        marginHorizontal:20
    },
    leftContainer: {
      width: "50%",
      alignSelf: 'flex-start',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      height: 100,
    },
  rightContainer: {
      width: "50%",
      alignSelf: 'flex-start',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      height: 100,
  },
  name: {
      color: "#4951FF",
      fontWeight: "bold",
      fontSize: 16,
  },
  bottomButton: {
      padding: 15,
      alignItems: 'flex-end',
      justifyContent: 'center',
  },
  fondo: {
    backgroundColor: "#fff",
  },
  inputContainer3: {
    flexDirection: 'row', alignItems: 'center',
  borderWidth: 2,
  backgroundColor: '#4951FF',
  marginTop:20,
  padding:10,
  borderRadius:10,
  borderColor: '#D9D9D9',
},
    container: {
      flex: 1,
      backgroundColor: '#E4E7F5',
    },
    container2: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 0,
    },
    fecha: {
      flexDirection: 'row', 
      alignItems: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      color: '#4951FF',
    },
    title: {
     height:120,
     width:420
    },
    label: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 15,
      marginBottom: 5,
    },
    archivo:{
      flex: 1,
       textAlign: 'center',
        color: '#4951FF',
        fontWeight: "bold",
 
  },
    inputContainer: {
      marginHorizontal:20
    },
    inputContainer2: {
      alignItems: 'center',
      marginBottom: 20,
    
    },
    input: {
      color:'#4951FF',
      fontWeight: 'bold',
      borderRadius: 5,
      marginLeft:15,
      width: '80%', 
      height: 20,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#F5A62E',
      padding: 15,
      alignItems: 'center',
      borderRadius: 5,
      margin:50,
      marginHorizontal:130
    },
    buttonText: {
  
      color: '#fff',
    },
  });

