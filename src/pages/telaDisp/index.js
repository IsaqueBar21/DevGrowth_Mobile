import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importação correta

const AvailabilityScreen = ({ navigation }) => {
  const [selectedDays, setSelectedDays] = useState(1); // Número de dias selecionados (1 a 7)

  return (
    <View style={styles.container}>
      {/* Logo na parte superior */}
      <Image source={require('../Principal/Img/LogoDevGrowth.png')} style={styles.logo} />

      {/* Saudação personalizada */}
      <Text style={styles.greeting}>
        Olá, <Text style={styles.name}>Nome</Text>, seja bem-vindo!!
      </Text>

      {/* Texto explicativo */}
      <Text style={styles.instructions}>
        Precisamos que responda algumas perguntas para que o seu treino seja feito de acordo com{" "}
        <Text style={styles.whiteText}>seu objetivo</Text>
      </Text>

      {/* Pergunta sobre a disponibilidade para treinar */}
      <Text style={styles.question}>
        Qual sua <Text style={styles.whiteText}>disponibilidade</Text> para treinar durante a semana?
      </Text>

      {/* Aba de seleção para os dias */}
      <Picker
        selectedValue={selectedDays}
        onValueChange={(itemValue) => setSelectedDays(itemValue)}
        style={styles.picker}
      >
        {[...Array(7)].map((_, index) => (
          <Picker.Item key={index} label={`${index + 1} dia(s)`} value={index + 1} />
        ))}
      </Picker>

      {/* Botão de próximo com borda */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('t6PesoAltura')} // Altere para a próxima tela do seu fluxo
      >
        <Text style={styles.buttonText}>Próximo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#383538',
  },
  logo: {
    width: '60%',
    height: undefined,
    aspectRatio: 16 / 9,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#afd5aa',
  },

  name: {
    color: '#fff', // Palavra "Nome" em branco
  },

  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#afd5aa',
  },

  whiteText: {
    color: '#fff', // Palavra "seu objetivo" e "disponibilidade" em branco
  },

  question: {
    fontSize: 18,
    color: '#afd5aa',
    marginBottom: 20,
  },

  picker: {
    height: 50,
    width: 300,
    backgroundColor: '#fff',
    color: '#383538',
    marginBottom: 30,
  },

  button: {
    borderColor: '#afd5aa', // Borda branca no botão
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: '#383538', // Cor de fundo do botão
    marginTop: 20,
  },

  buttonText: {
    color: '#afd5aa', // Cor do texto no botão
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AvailabilityScreen;
