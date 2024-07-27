import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        marginTop:20
      },
      cardContainer: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor:"#4951FF",
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
        marginLeft: 10,
      },
      userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
      },
      score: {
        fontSize: 16,
        color: '#666',
        fontWeight: 'bold',
      },
      status: {
        fontSize: 16,
        color: '#f00', // Default color for 'Desaprobado'
      },
      approvedStatus: {
        color: 'green',
      },
    });