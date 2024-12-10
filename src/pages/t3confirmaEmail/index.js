import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../connections/firebaseConnection'; // Certifique-se de importar corretamente

const VerificationScreen = () => {
  const route = useRoute();
  const { userId } = route.params;
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState('');

  const handleCheckEmailVerification = async () => {
    try {
      await auth.currentUser.reload(); // Atualiza os dados do usuário
      if (auth.currentUser.emailVerified) {
        Alert.alert('Sucesso!', 'Seu e-mail foi verificado com sucesso!');
        setErrorMessage('');
        navigation.navigate('t4AceitaTermos', { userId });
      } else {
        setErrorMessage('O e-mail ainda não foi verificado. Verifique novamente.');
      }
    } catch (error) {
      console.error('Erro ao verificar o e-mail:', error);
      setErrorMessage('Erro ao verificar e-mail. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/LogoDevGrowth.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Confirmação de E-mail</Text>
      <Text style={styles.subtitle}>
        Um e-mail de verificação foi enviado para sua conta. Clique no link de verificação e depois pressione o botão abaixo.
      </Text>

      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

      <TouchableOpacity onPress={handleCheckEmailVerification} style={styles.button}>
        <Text style={styles.buttonText}>Verificar E-mail</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#383538',
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: -50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#ADF5AA',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ADF5AA',
    marginBottom: 20,
  },
  errorMessage: {
    color: '#FF5A5F',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#383538',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#ADF5AA',
    width: 200,
  },
  buttonText: {
    color: '#AFD5AA',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VerificationScreen;
