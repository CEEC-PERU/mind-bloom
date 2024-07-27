import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        marginTop: 20
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
