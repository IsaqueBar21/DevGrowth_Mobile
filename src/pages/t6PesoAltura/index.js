import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../connections/firebaseConnection';

const UserInputScreen = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params;

  const handleNext = async () => {
    if (!weight || !height) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos antes de continuar.");
      return;
    }

    // Cálculo do IMC
    const weightInKg = parseFloat(weight.replace(" kg", ""));
    const heightInMeters = parseFloat(height.replace(" m", ""));
    const imc = weightInKg / (heightInMeters * heightInMeters);
    let imcCategory;

    // Classificação do IMC
    if (imc < 18.5) {
      imcCategory = 1; // Abaixo do peso normal
    } else if (imc >= 18.5 && imc <= 24.9) {
      imcCategory = 2; // Peso normal
    } else if (imc >= 25 && imc <= 29.9) {
      imcCategory = 3; // Excesso de peso
    } else if (imc >= 30 && imc <= 34.9) {
      imcCategory = 4; // Obesidade classe I
    } else {
      imcCategory = 5; // Obesidade classe II ou III
    }

    try {
      // Atualiza os dados no Firestore com a categoria do IMC (1 a 5)
      const userRef = doc(db, "Usuario", userId);
      await updateDoc(userRef, {
        altura: heightInMeters.toString(),
        peso: weightInKg.toString(),
        imcCategory, // Armazena a classificação (1, 2, 3, 4 ou 5)
      });

      // Alerta com a categoria do IMC
      Alert.alert("Sucesso!");
      navigation.navigate('t7Biotipo', { userId }); // Continua para a próxima tela
    } catch (error) {
      console.error("Erro ao atualizar dados no Firestore:", error);
      Alert.alert("Erro", "Não foi possível salvar os dados. Tente novamente.");
    }
  };

  const formatWeight = (value) => {
    const formattedValue = value.replace(/[^0-9.,]/g, "").replace(/,/g, ".");
    const isValid = /^[0-9]*\.?[0-9]?$/.test(formattedValue);
    if (isValid || formattedValue === "") {
      setWeight(formattedValue ? `${formattedValue} kg` : "");
    }
  };

  const formatHeight = (value) => {
    const formattedValue = value.replace(/[^0-9.,]/g, "").replace(/,/g, ".");
    const isValid = /^[0-9]\.[0-9]{0,2}$/.test(formattedValue) || /^[0-9]\.?$/.test(formattedValue);
    if (isValid || formattedValue === "") {
      setHeight(formattedValue ? `${formattedValue} m` : "");
    }
  };

  const clearWeight = () => setWeight("");
  const clearHeight = () => setHeight("");

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/LogoDevGrowth.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.label}>Qual é o seu peso atual?</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={weight.replace(" kg", "")}
        onChangeText={formatWeight}
        placeholder="Ex: 75.5 kg"
        placeholderTextColor="#aaa"
        onFocus={clearWeight}
      />

      <Text style={styles.label}>Qual é a sua altura?</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={height.replace(" m", "")}
        onChangeText={formatHeight}
        placeholder="Ex: 1.75 m"
        placeholderTextColor="#aaa"
        onFocus={clearHeight}
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Próximo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#383538",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: -50,
  },

  label: {
    fontSize: 18,
    color: "#AFD5AA",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    width: "90%",
    height: 50,
    borderColor: "#FFF",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#000",
    marginBottom: 20,
  },

  button: {
    marginTop: 20,
    width: "90%",
    height: 50,
    backgroundColor: "#383538",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#afd5aa'
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UserInputScreen;
