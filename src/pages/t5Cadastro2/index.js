import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'; // Hook para navegação e recuperação de params
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { updateDoc, doc, query, where, getDocs, collection} from 'firebase/firestore'; // Importar updateDoc e doc
import { db } from '../../connections/firebaseConnection'; // Conexão com o Firestore

const t5Cadastro2 = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [dob, setDob] = useState('');
  const [cpf, setCpf] = useState('');
  const [selectedSex, setSelectedSex] = useState(null);
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params; // Recebe o userId da navegação

  // Funções de validação e formatação
  const handleNameChange = (text) => {
    const cleaned = text.replace(/[^A-Za-zÀ-ÿ\s]/g, '');
    setName(cleaned);
  };

  const handleSurnameChange = (text) => {
    const cleaned = text.replace(/[^A-Za-zÀ-ÿ\s]/g, '');
    setSurname(cleaned);
  };

  const handleDobChange = (text) => {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.length > 2 && cleaned.length <= 4) {
      cleaned = cleaned.replace(/(\d{2})(\d+)/, '$1/$2');
    } else if (cleaned.length > 4) {
      cleaned = cleaned.replace(/(\d{2})(\d{2})(\d+)/, '$1/$2/$3');
    }
    setDob(cleaned);
  };

  const handleCpfChange = (text) => {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.length > 3 && cleaned.length <= 6) {
      cleaned = cleaned.replace(/(\d{3})(\d+)/, '$1.$2');
    } else if (cleaned.length > 6 && cleaned.length <= 9) {
      cleaned = cleaned.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    } else if (cleaned.length > 9) {
      cleaned = cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    setCpf(cleaned);
  };

  const validateInputs = () => {
    let valid = true;
    let newErrors = {};

    if (name.trim() === '') {
      newErrors.name = 'Nome é obrigatório.';
      valid = false;
    }

    if (surname.trim() === '') {
      newErrors.surname = 'Sobrenome é obrigatório.';
      valid = false;
    }

    const dobRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!dobRegex.test(dob)) {
      newErrors.dob = 'Data de nascimento inválida (DD/MM/AAAA).';
      valid = false;
    }

    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(cpf)) {
      newErrors.cpf = 'CPF inválido (formato: 000.000.000-00).';
      valid = false;
    }

    if (!selectedSex) {
      newErrors.sex = 'Selecione o sexo.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignUp = async () => {
    if (validateInputs()) {
      try {
        // Verificar se o CPF já está cadastrado
        const usersRef = collection(db, 'Usuario'); // Referência à coleção
        const q = query(usersRef, where('cpf', '==', cpf)); // Query para verificar o CPF
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          // CPF já existe no banco
          Alert.alert('Erro', 'Este CPF já está cadastrado. Tente outro.');
          return;
        }
  
        // Atualizando o documento no Firestore
        const userRef = doc(db, 'Usuario', userId); // Referência ao documento do usuário
        await updateDoc(userRef, {
          nome: name,
          sobrenome: surname,
          data_nascimento: dob,
          cpf: cpf,
          sexo: selectedSex,
        });
  
        Alert.alert('Sucesso', 'Cadastro atualizado com sucesso!');
        navigation.navigate('telaDisp', { userId }); // Próxima tela
      } catch (error) {
        Alert.alert('Erro', 'Ocorreu um erro ao verificar ou atualizar os dados.');
        console.error(error);
      }
    } else {
      Alert.alert('Erro', 'Corrija os erros antes de continuar.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/LogoDevGrowth.png')} style={styles.logo} resizeMode="contain" />

      <View style={styles.areaInput}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={handleNameChange}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>
      <View style={styles.areaInput}>
        <TextInput
          style={styles.input}
          placeholder="Sobrenome"
          value={surname}
          onChangeText={handleSurnameChange}
        />
        {errors.surname && <Text style={styles.errorText}>{errors.surname}</Text>}
      </View>
      <View style={styles.areaInput}>
        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento (DD/MM/AAAA)"
          value={dob}
          onChangeText={handleDobChange}
          keyboardType="numeric"
          maxLength={10}
        />
        {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}
      </View>
      <View style={styles.areaInput}>
        <TextInput
          style={styles.input}
          placeholder="CPF (000.000.000-00)"
          value={cpf}
          onChangeText={handleCpfChange}
          keyboardType="numeric"
          maxLength={14}
        />
        {errors.cpf && <Text style={styles.errorText}>{errors.cpf}</Text>}
      </View>

      <Text style={styles.label}>Sexo:</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => setSelectedSex('Masculino')}
        >
          <View style={styles.radioCircle}>
            {selectedSex === 'Masculino' && <View style={styles.selectedRadio} />}
          </View>
          <Text style={styles.textRadioCircle}>Masculino</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => setSelectedSex('Feminino')}
        >
          <View style={styles.radioCircle}>
            {selectedSex === 'Feminino' && <View style={styles.selectedRadio} />}
          </View>
          <Text style={styles.textRadioCircle}>Feminino</Text>
        </TouchableOpacity>
      </View>
      {errors.sex && <Text style={styles.errorText}>{errors.sex}</Text>}

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSignUp}
        activeOpacity={0.7}
      >
        <Text style={styles.submitText}>Próximo</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#383538',
  },

  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: -50,
  },

  areaInput: {
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: '#AFD5AA',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',

  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },

  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#AFD5AA'
  },

  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },

  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#AFD5AA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  selectedRadio: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#AFD5AA',
  },

  textRadioCircle: {
    color: '#AFD5AA'
  },

  submitButton: {
    backgroundColor: '#383538',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    borderColor: '#AFD5AA',
    borderWidth: 3,
  },

  submitText: {
    color: '#AFD5AA',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default t5Cadastro2
