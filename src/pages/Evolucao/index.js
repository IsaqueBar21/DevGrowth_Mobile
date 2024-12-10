import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import * as ImagePicker from 'expo-image-picker';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderBackButton } from '@react-navigation/elements'; // Para o botão de voltar
 
// Componente CalendarView
const CalendarView = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [weight, setWeight] = useState('');
  const [photo, setPhoto] = useState(null);
  const [data, setData] = useState({});
 
  useEffect(() => {
    const checkPermissions = async () => {
      const { status } = await ImagePicker.getCameraPermissionsAsync();
      if (status !== 'granted') {
        const { status: requestStatus } = await ImagePicker.requestCameraPermissionsAsync();
        if (requestStatus !== 'granted') {
          Alert.alert(
            'Permissão necessária',
            'Por favor, permita o uso da câmera para que você possa tirar fotos.'
          );
        }
      }
    };
 
    checkPermissions();
  }, []);
 
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
 
    const dayData = data[day.dateString];
    if (dayData) {
      setWeight(dayData.weight || '');
      setPhoto(dayData.photo || null);
    } else {
      setWeight('');
      setPhoto(null);
    }
 
    setModalVisible(true);
  };
 
  const handleSave = () => {
    setData((prev) => ({
      ...prev,
      [selectedDate]: { weight, photo },
    }));
    setModalVisible(false);
  };
 
  const handleDelete = () => {
    setData((prev) => {
      const newData = { ...prev };
      delete newData[selectedDate];
      return newData;
    });
    setModalVisible(false);
  };
 
  const handlePhotoPick = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
 
      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível abrir a câmera. Tente novamente.');
    }
  };
 
  const CustomButton = ({ title, onPress, color = '#fff', backgroundColor = '#218380' }) => (
    <TouchableOpacity style={[styles.customButton, { backgroundColor }]} onPress={onPress}>
      <Text style={[styles.customButtonText, { color }]}>{title}</Text>
    </TouchableOpacity>
  );
 
  return (
    <View style={styles.container}>
      {/* Área de imagem, título e subtítulo */}
      <View style={styles.header}>
        <Image
          source={require('../Principal/Img/LogoDevGrowth.png')} // Altere o caminho da imagem conforme necessário
          style={styles.headerImage}
        />
        <Text style={styles.headerTitle}>Evolução</Text>
        <Text style={styles.headerSubtitle}>Acompanhe sua trajetória</Text>
      </View>
 
      {/* Calendário */}
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          ...Object.keys(data).reduce((acc, key) => {
            acc[key] = { marked: true, dotColor: '#fff' }; // Cor do ponto do dia marcado
            return acc;
          }, {}),
        }}
        theme={{
          backgroundColor: '#383538', // Cor do fundo do calendário
          calendarBackground: '#383538', // Fundo da área do calendário
          textSectionTitleColor: '#218380', // Cor do texto dos dias da semana
          selectedDayBackgroundColor: '#fff', // Cor de fundo do dia selecionado
          selectedDayTextColor: '#ffffff', // Cor do texto do dia selecionado
          todayTextColor: '#218380', // Cor do texto do dia atual
          dayTextColor: '#afd5aa', // Cor padrão dos dias
          textDisabledColor: '#d9e1e8', // Cor dos dias desativados
          dotColor: '#218380', // Cor do ponto nos dias marcados
          arrowColor: '#FFF', // Cor das setas de navegação
          monthTextColor: '#afd5aa', // Cor do nome do mês
        }}
      />
 
      {/* Modal de detalhes */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Detalhes do dia: {selectedDate}</Text>
          <ScrollView contentContainerStyle={styles.content}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.image} />
            ) : (
              <Text style={styles.placeholderText}>Nenhuma foto adicionada.</Text>
            )}
            <Text style={styles.weightText}>
              {weight ? `Peso: ${weight} kg` : 'Nenhum peso registrado.'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu peso"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
            <CustomButton title="Tirar Foto" onPress={handlePhotoPick} />
            <View style={styles.buttonRow}>
              <CustomButton style={styles.customButtonText} title="Salvar" onPress={handleSave} backgroundColor="#218380" />
              <CustomButton title="Excluir" onPress={handleDelete} backgroundColor="red" />
              <CustomButton title="Voltar" onPress={() => setModalVisible(false)} backgroundColor="#218380" />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};
 
// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#383538',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerImage: {
    width: '60%',
    height: undefined,
    aspectRatio: 16 / 9,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#afd5aa',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#cccccc',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(56, 53, 56, 0.9)',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  title: {
    fontSize: 20,
    color: '#afd5aa',
    marginTop: 150,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  placeholderText: {
    color: '#ccc',
    marginBottom: 20,
  },
  weightText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  customButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  customButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
 
// Configuração da navegação
const Stack = createNativeStackNavigator();
 
const App = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#383538',
        },
        headerTintColor: '#afd5aa',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Calendar"
        component={CalendarView}
        options={({ navigation }) => ({
          title: 'Evolução',
          headerLeft: () => (
            <HeaderBackButton
              tintColor="#afd5aa"
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};
 
export default App;