import { useNavigation, useRoute } from '@react-navigation/native'; // Hooks para navegação
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../connections/firebaseConnection'; // Conexão com o Firestore

const App = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params; // Recebe o userId da navegação
  const [selectedGoals, setSelectedGoals] = useState([]);

  const goals = [
    'Ganhar Peso (Massa Muscular)',
    'Perder Peso',
    'Definição Muscular',
    'Melhorar Condicionamento Físico',
  ];

  const handleSelectGoal = (goal) => {
    const isGainWeightSelected = selectedGoals.includes('Ganhar Peso (Massa Muscular)');
    const isLoseWeightSelected = selectedGoals.includes('Perder Peso');

    // Bloquear a seleção de "Ganhar Peso" e "Perder Peso" simultaneamente
    if (
      (goal === 'Ganhar Peso (Massa Muscular)' && isLoseWeightSelected) ||
      (goal === 'Perder Peso' && isGainWeightSelected)
    ) {
      Alert.alert('Conflito', 'Não é possível selecionar "Ganhar Peso" e "Perder Peso" ao mesmo tempo.');
      return;
    }

    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal)); // Desmarcar objetivo
    } else {
      setSelectedGoals([...selectedGoals, goal]); // Marcar objetivo
    }
  };

  const handleNext = async () => {
    if (selectedGoals.length === 0) {
      Alert.alert('Atenção', 'Por favor, selecione pelo menos um objetivo para continuar.');
      return;
    }

    try {
      // Atualiza os objetivos no Firestore
      const userRef = doc(db, 'Usuario', userId);
      await updateDoc(userRef, {
        objetivos: selectedGoals, // Salva os objetivos selecionados
      });

      Alert.alert('Sucesso', 'Seus objetivos foram salvos com sucesso!');
      navigation.navigate('Principal', { userId }); // Navega para a próxima tela
    } catch (error) {
      console.error('Erro ao salvar os objetivos:', error);
      Alert.alert('Erro', 'Não foi possível salvar seus objetivos. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/LogoDevGrowth.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Qual o seu objetivo?</Text>
      {goals.map((goal) => (
        <TouchableOpacity
          key={goal}
          style={styles.optionContainer}
          onPress={() => handleSelectGoal(goal)}
        >
          <View style={styles.checkbox}>
            {selectedGoals.includes(goal) && <View style={styles.checked} />}
          </View>
          <Text style={styles.goalText}>{goal}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.continueButton} onPress={handleNext}>
        <Text style={styles.continueButtonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#383538'
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
    marginBottom: 20,
    textAlign: 'center',
    color: '#afd5aa'
  },

  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#afd5aa',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checked: {
    width: 12,
    height: 12,
    backgroundColor: '#afd5aa',
  },

  goalText: {
    fontSize: 18,
    color: '#afd5aa'
  },

  continueButton: {
    marginTop: 30,
    backgroundColor: '#383538',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#AFD5AA',
  },
  continueButtonText: {
    color: '#AFD5AA',
    textAlign: 'center',
    fontSize: 18,
  },

  
});

export default App;
