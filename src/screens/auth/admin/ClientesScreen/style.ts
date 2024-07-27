import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    buttonContainer: {
        marginTop:20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '75%',
      },
   centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: 'rgba(0, 0, 0, 0.5)', 
},
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modalText: {
        color:'#7849FF',
        marginBottom: 15,
        textAlign: "center",
        fontSize: 23,
        fontWeight: 'bold'
      },
      input: {
        height: 50,
        width: 250,
        margin: 12,
        borderWidth: 1,
        padding: 10,
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 15,
        rowGap: 10,
        paddingBottom: 20,
    },
    cardContainer: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    userDetails: {
        flex: 1,
        marginLeft: 10,
    },
    userDetails2: {
      flex: 1,
      paddingLeft:0,
  },
  text2: {
    fontWeight: 'bold',
  },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    score: {
        fontSize: 16,
        color: '#666',
    },
    evaluationDetails: {
        flex: 1,
        marginLeft: 10,
    },
    evaluationItem: {
        marginLeft: 20,
    },
    evaluationText: {
        fontSize: 14,
    },
    divider: {
        fontSize: 14,
        color: '#999',
    },
});

