import React, { useState } from 'react';
import { 
  Platform, 
  KeyboardAvoidingView, 
  TouchableOpacity, 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  Image, 
  Alert 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import { auth } from "../../connections/firebaseConnection"; // Importando a configuração existente
import { signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification } from "firebase/auth"; // Corrigido o import

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const navigation = useNavigation();

  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };
  
  const handleForgotPassword = () => {
    if (!email) { 
      Alert.alert('Erro', 'Por favor, insira seu email para recuperar a senha.');
      return;
    }
  
    if (!isEmailValid(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido!');
      return;
    }
  
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          'Email enviado',
          'Um email para redefinir sua senha foi enviado. Verifique sua caixa de entrada.',
        );
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          Alert.alert('Erro', 'Não encontramos uma conta com este email.');
        } else {
          Alert.alert('Erro', 'Ocorreu um erro ao tentar enviar o email. Tente novamente.');
        }
      });
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }
    if (!isEmailValid(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido!');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres!');
      return;
    }

    // Autenticação com Firebase
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
  
        if (user.emailVerified) {
          // Email confirmado, prosseguir com o login
          Alert.alert('Sucesso', 'Login realizado com sucesso!');
          navigation.navigate('Principal', { userId: user.uid });
        } else {
          // Email não confirmado, exibir alerta
          Alert.alert(
            'Email não confirmado',
            'Seu email ainda não foi confirmado. Por favor, verifique sua caixa de entrada e confirme o email antes de fazer login.',
            [
              { text: 'OK', style: 'default' },
              {
                text: 'Reenviar email de verificação',
                onPress: () => {
                  // Use a função sendEmailVerification do Firebase diretamente no user
                  sendEmailVerification(user) // Corrigido para chamar o método corretamente
                    .then(() => Alert.alert('Sucesso', 'Email de verificação reenviado!'))
                    .catch(() => Alert.alert('Erro', 'Não foi possível enviar o email de verificação.'));
                },
              },
            ]
          );
        }
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          Alert.alert(
            'Usuário não encontrado',
            'Não encontramos uma conta com esse email. Deseja se cadastrar?',
            [
              { text: 'Cancelar', style: 'cancel' },
              { 
                text: 'Cadastrar', 
                onPress: () => navigation.navigate('t2Cadastro1') 
              },
            ]
          );
        } else if (error.code === 'auth/wrong-password') {
          Alert.alert('Erro', 'Senha incorreta. Tente novamente.');
        } else {
          Alert.alert('Erro', 'Ocorreu um erro ao fazer login. Tente novamente.');
        }
      });
  };

  return (
    <View style={styles.background}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../../assets/LogoDevGrowth.png')}
            style={styles.logoImage}
          />
        </View>

        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputArea}>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              secureTextEntry={!passwordVisible}
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity 
              style={styles.eyeIcon} 
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Ionicons 
                name={passwordVisible ? "eye-off" : "eye"} 
                size={24} 
                color="gray" 
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.link} onPress={handleForgotPassword}>
          <Text style={styles.linkText}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => navigation.navigate('t2Cadastro1')}
        >
          <Text style={styles.signUpText}>Fazer meu cadastro</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#383538',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  logoContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },

  logoImage: {
    width: 240,
    height: 120,
    resizeMode: 'contain',
  },

  inputArea: {
    width: '100%',
    marginBottom: 15,
  },

  input: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    borderColor: '#CCC',
    borderWidth: 1,
  },

  passwordContainer: {
    position: 'relative',
  },

  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 12,
  },

  link: {
    marginBottom: 20,
    marginLeft: -180,
  },

  linkText: {
    fontSize: 14,
    color: '#AFD5AA',
    textDecorationLine: 'underline',
  },

  loginButton: {
    width: '50%',
    height: 50,
    backgroundColor: '#383538',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 3,       
    marginTop: 20,
    borderColor: '#AFD5AA',
  },

  loginText: {
    color: '#AFD5AA',
    fontSize: 26,
    fontWeight: 'bold',
  },

  signUpButton: {
    width: '90%',
    height: 60,
    backgroundColor: '#AFD5AA',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#218380',
    marginTop: 20,
  },

  signUpText: {
    color: '#383538',
    fontSize: 26,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
