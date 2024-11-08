import React, { useState } from "react";
import { Platform, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Background, Container, AreaInput, Input, Logo, SubmitButton, SubmitText, IconContainer } from './styles';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando AsyncStorage

// Firebase
import { getAuth, fetchSignInMethodsForEmail, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from '../../../config/firebaseConfig';
import { initializeApp } from "firebase/app";

// Inicializa o Firebase
let app;
let auth;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  console.log("Firebase está inicializado:", app.name);
} catch (error) {
  console.error("Erro ao inicializar o Firebase:", error);
  Alert.alert('Erro', 'Não foi possível conectar ao Firebase.');
}

export default function SignUp() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Função para validar email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Função para verificar se o email já existe
  const checkIfEmailExists = async (email) => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      return methods.length > 0;
    } catch (error) {
      console.error('Erro ao verificar email:', error);
      return false;
    }
  };

  // Função para salvar dados localmente
  const saveUserDataLocally = async (email, password) => {
    try {
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userPassword', password);
      console.log('Dados salvos localmente!');
    } catch (error) {
      console.error('Erro ao salvar os dados localmente:', error);
    }
  };

  // Função chamada quando o botão "Cadastrar" é pressionado
  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Erro', 'O formato do email está inválido. Exemplo: seunome@email.com');
      return;
    }

    const emailExists = await checkIfEmailExists(email);
    if (emailExists) {
      Alert.alert('Erro', 'Este email já está cadastrado.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres!');
      return;
    }

    // Criar usuário no Firebase
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Cadastro2'); // Navega para a próxima tela após sucesso
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      const errorCode = error.code;
      const errorMessage = error.message;
      
      // Personalizar a mensagem de erro com base no código do erro
      if (errorCode === 'auth/weak-password') {
        Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      } else if (errorCode === 'auth/email-already-in-use') {
        Alert.alert('Erro', 'Este email já está cadastrado.');
      } else if (errorCode === 'auth/invalid-email') {
        Alert.alert('Erro', 'O formato do email está inválido.');
      } else {
        Alert.alert('Erro', errorMessage);
      }

      // Caso o Firebase falhe, salvar localmente e navegar para a próxima página
      await saveUserDataLocally(email, password);  // Salvar dados localmente
      Alert.alert('Sucesso', 'Cadastro falhou no Firebase, mas dados salvos localmente!');
      navigation.navigate('Cadastro2'); // Navegar para a próxima tela
    }
  };

  return (
    <Background>
      <Container
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
      >
        <Logo
          source={require('../../assets/LogoDevGrowth.png')}
        />

        <AreaInput>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Senha"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <IconContainer onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye" : "eye-off"} size={24} color="#383838" />
          </IconContainer>
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Confirmar Senha"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <IconContainer onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Ionicons name={showConfirmPassword ? "eye" : "eye-off"} size={24} color="#383838" />
          </IconContainer>
        </AreaInput>

        <SubmitButton
          activeOpacity={0.5}
          onPress={handleSignUp}
        >
          <SubmitText>Cadastrar</SubmitText>
        </SubmitButton>
      </Container>
    </Background>
  );
}
