import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    authContainer: {
      width: '80%',
      maxWidth: 500,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      padding: 16,
      borderRadius: 8,
      elevation: 3,
    },
    title: {
      fontSize: 24,
      fontFamily: 'Poppins-Bold',
      marginBottom: 24,
      textAlign: 'center',
      color: '#000000',
    },
    input: {
      height: 40,
      fontFamily: 'Poppins-Regular',
      borderColor: '#ddd',
      borderWidth: 1,
      marginBottom: 16,
      padding: 8,
      borderRadius: 4,
      color: '#000000',
    },
    buttonContainer: {
      marginBottom: 16,
      marginTop: 15,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 4,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      textAlign: 'center',
      fontFamily: 'Poppins-Regular',
    },
    toggleText: {
      color: '#000000',
      textAlign: 'center',
      fontFamily: 'Poppins-Regular',
    },
    bottomContainer: {
      marginTop: 20,
    },
    emailText: {
      fontSize: 18,
      fontFamily: 'Poppins-Regular',
      textAlign: 'center',
      marginBottom: 20,
    },
});
