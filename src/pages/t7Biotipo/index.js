import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { doc, updateDoc } from 'firebase/firestore'; // Para salvar no banco de dados
import { db } from '../../connections/firebaseConnection'; // Conexão com o Firestore

const biotypes = [
  {
    id: 1,
    title: 'Endomorfo',
    description: 'Biotipo que tende a acumular mais gordura corporal e possui uma estrutura mais larga.',
    image: require('../../img/Endomorfo.png'),
  },
  {
    id: 2,
    title: 'Mesomorfo',
    description: 'Biotipo com maior facilidade para ganhar massa muscular e com estrutura mais atlética.',
    image: require('../../img/Mesomorfo.png'),
  },
  {
    id: 3,
    title: 'Ectomorfo',
    description: 'Biotipo com dificuldade de ganhar peso e estrutura corporal mais magra.',
    image: require('../../img/Ectomorfo.png'),
  },
];

const BiotypeCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params; // Recebe o userId da tela anterior

  const handleNext = () => {
    if (activeIndex < biotypes.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleContinue = async () => {
    const selectedBiotype = biotypes[activeIndex].title;

    try {
      // Atualiza o biotipo no Firestore
      const userRef = doc(db, 'Usuario', userId);
      await updateDoc(userRef, {
        biotype: selectedBiotype,
      });

      console.log('Biotipo atualizado com sucesso:', selectedBiotype);

      // Navega para a próxima tela, passando o biotipo selecionado
      navigation.navigate('t8Objetivos', { userId, biotype: selectedBiotype });
    } catch (error) {
      console.error('Erro ao salvar o biotipo:', error);
      Alert.alert('Erro', 'Não foi possível salvar o biotipo. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={handlePrev} disabled={activeIndex === 0}>
          <Text style={[styles.navButton, activeIndex === 0 && styles.disabled]}>◀</Text>
        </TouchableOpacity>

        <Image source={biotypes[activeIndex].image} style={styles.image} />

        <TouchableOpacity onPress={handleNext} disabled={activeIndex === biotypes.length - 1}>
          <Text style={[styles.navButton, activeIndex === biotypes.length - 1 && styles.disabled]}>▶</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{biotypes[activeIndex].title}</Text>
      <Text style={styles.description}>{biotypes[activeIndex].description}</Text>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continuar</Text>
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
    backgroundColor: '#383538'
  },

  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginHorizontal: 20, // Para dar espaço entre as setas e a imagem
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#afd5aa'
  },

  description: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 10,
    color: '#afd5aa',
    marginBottom: 20,
  },
  navButton: {
    fontSize: 30,
    color: '#afd5aa',
  },
  disabled: {
    color: '#fff',
  },
  continueButton: {
    marginTop: 30,
    backgroundColor: '#383538',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#AFD5AA'
  },
  continueButtonText: {
    color: '#AFD5AA',
    fontSize: 18,
  },
});

export default BiotypeCarousel;
