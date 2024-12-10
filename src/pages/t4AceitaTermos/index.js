import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Linking, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Hook para navegação
import { useRoute } from '@react-navigation/native';
import Checkbox from 'expo-checkbox'; // Usando expo-checkbox

const TermsScreen = ({ navigation }) => {  // Removendo a duplicação de 'navigation'
  const [isChecked, setIsChecked] = useState(false);
  const route = useRoute();
  const { userId } = route.params;
  const handleContinue = () => {
    if (isChecked) {
      navigation.navigate('t5Cadastro2', {userId}); // Navega para a próxima página
    } else {
      Alert.alert('Atenção', 'Você deve aceitar os termos e condições para continuar.');
    }
  };

  const openTerms = () => {
    // URL dos termos e condições
    const termsUrl = 'https://sesisenaispedu-my.sharepoint.com/:w:/g/personal/isaque_barbosa_portalsesisp_org_br/ET2BeI6wNItCuXdRAYEUdnYBWGvvrDCBgjgdwxykMgWTbA?rtime=RxIaqhYQ3Ug';
    Linking.openURL(termsUrl).catch((err) =>
      Alert.alert('Erro', 'Não foi possível abrir o link dos termos e condições.')
    );
  };

  return (   
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../../assets/LogoDevGrowth.png')} style={styles.logo} resizeMode="contain" />
      </View>  

      <Text style={styles.title}>Termos e Condições e Políticas de Privacidade</Text>

      <Text style={styles.termsText}>
        Para ler os termos e condições{' '}
        <Text style={styles.linkText} onPress={openTerms}>
          clique aqui
        </Text>.
      </Text>

      <View style={styles.checkboxContainer}>
        <Checkbox
          value={isChecked}
          onValueChange={setIsChecked}
          color={isChecked ? '#218380' : undefined} // Personalizando a cor
        />
        <Text style={styles.checkboxLabel}>Eu aceito os termos e condições</Text>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#383538',
  },

  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: -100,
  }, 

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ADF5AA',
    textAlign: 'center'
  },

  checkboxContainer: {
    color: '#ADF5AA',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 8,
    color: '#ADF5AA',
  },
  termsText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ADF5AA',
    marginBottom: 20,
  },

  linkText: {
    color: '#FFF',
    textDecorationLine: 'underline',
  },

  continueButton: {
    backgroundColor: '#383538',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    borderColor: '#ADF5AA',
    borderWidth: 2,
    marginTop: 50,
  },
  continueButtonText: {
    color: '#ADF5AA',
    fontSize: 18,
    fontWeight: 'bold'
  },
});

export default TermsScreen;
