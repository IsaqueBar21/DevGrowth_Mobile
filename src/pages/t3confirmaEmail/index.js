import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'; // Hook para navegação

const VerificationScreen = () => {
  const route = useRoute();
  const { userId } = route.params;
  const [code, setCode] = useState('');
  const navigation = useNavigation();  // Inicializando o hook de navegação
  const [errorMessage, setErrorMessage] = useState('');

  const handleVerify = () => {
    if (code.trim() === '') {
      setErrorMessage('Por favor, insira o código de verificação.');
      return;
    }

    if (code !== '123456') { // Código fictício para validação
      setErrorMessage('O código inserido está incorreto. Tente novamente.');
      return;
    }

    Alert.alert('Sucesso!', 'Código verificado com sucesso!');
    setErrorMessage('');
    navigation.navigate('t4AceitaTermos', {userId});

  };

  return (
    <View style={styles.container}>

      <View style={styles.logoContainer}>
        <Image source={require('../../../assets/LogoDevGrowth.png')} style={styles.logo}
        resizeMode="contain" />
      </View>  

      <Text style={styles.title}>Verificação de Código</Text>
      <Text style={styles.subtitle}>
        Insira o código enviado para o seu e-mail cadastrado.
      </Text>

      <TextInput
        style={[styles.input, errorMessage && styles.inputError]}
        placeholder="Digite o código de verificação"
        keyboardType="number-pad"
        maxLength={6}
        value={code}
        onChangeText={setCode}
      />

      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
        <View style={styles.button}> 
      <TouchableOpacity  onPress={handleVerify}>
        <Text style={styles.buttonText}>Verificar</Text>
      </TouchableOpacity>
      </View>
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

  input: {
    height: 50,
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    fontSize: 16,
    marginBottom: 10,
  },
  inputError: {
    borderColor: '#FF5A5F',
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
    width: 120,    
  },
  buttonText: {
    color: '#AFD5AA',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default VerificationScreen;
