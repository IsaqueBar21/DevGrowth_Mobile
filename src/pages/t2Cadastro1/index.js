import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Alert, View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import { collection, doc, setDoc} from "firebase/firestore";
import { db, auth } from "../../connections/firebaseConnection"; // Certifique-se de importar corretamente

const t2Cadastro1 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Erro', 'O formato do email está inválido. Exemplo: seunome@email.com');
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
  
    try {
      // Criar usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
  
      // Enviar e-mail de verificação
      await sendEmailVerification(userCredential.user);
  
      // Adicionar dados ao Firestore
      const userRef = doc(collection(db, "Usuario"), userId);
      await setDoc(userRef, {
        email,
      });
  
      Alert.alert(
        'Sucesso',
        'Cadastro realizado com sucesso! Um e-mail de verificação foi enviado para sua conta.',
        [
          { text: 'OK', onPress: () => navigation.navigate('t3confirmaEmail', { userId }) } // Passando o userId
        ]
      );
    } catch (error) {
      // Verifica se o erro é relacionado a e-mail duplicado
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Erro', 'Este e-mail já está cadastrado. Tente outro.');
      } else {
        Alert.alert('Erro', error.message);
      }
    }
  };
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.logoContainer}>
        <Image source={require('../../../assets/LogoDevGrowth.png')} style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>
          <Ionicons name={showPassword ? "eye" : "eye-off"} size={24} color="#383838" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.iconContainer}>
          <Ionicons name={showConfirmPassword ? "eye" : "eye-off"} size={24} color="#383838" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSignUp}
        activeOpacity={0.7}
      >
        <Text style={styles.submitText}>Cadastrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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

  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },

  iconContainer: {
    marginLeft: 10,
  },

  submitButton: {
    backgroundColor: '#383538',
    borderColor: '#AFD5AA',
    borderWidth: 2,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    alignSelf: 'center', 
  },
  
  submitText: {
    color: '#AFD5AA',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default t2Cadastro1;
