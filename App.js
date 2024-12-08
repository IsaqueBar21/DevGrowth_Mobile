import React, { useEffect, useState } from "react";

import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from 'expo-splash-screen';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';


import t1Login from "./src/pages/t1Login";
import t2Cadastro1 from "./src/pages/t2Cadastro1";
import t3confirmaEmail from "./src/pages/t3confirmaEmail";
import t4AceitaTermos from "./src/pages/t4AceitaTermos";
import t5Cadastro2 from "./src/pages/t5Cadastro2";
import t6PesoAltura from "./src/pages/t6PesoAltura";
import t7Biotipo from "./src/pages/t7Biotipo";
import t8Objetivos from "./src/pages/t8Objetivos";
import Principal from "./src/pages/Principal";
import Treinos from './src/pages/TelaTreinos';
import Perfil from './src/pages/TelaPerfil';
import Categorias from './src/pages/TelaReceitas';
import Doces from './src/pages/TelaDoces';
import Evolucao from './src/pages/Evolucao';
import telaDisp from './src/pages/telaDisp';

const Stack = createNativeStackNavigator();

export default function App(){

  const [isAppReady, setIsAppReady] = useState(false);

  // Função para carregar o app corretamente
  useEffect(() => {
    const prepare = async () => {
      try {
        // Impede que a splash screen desapareça automaticamente
        await SplashScreen.preventAutoHideAsync();
        // Simula algum carregamento necessário
        // Aguarde o carregamento de fontes ou outros recursos aqui, se necessário
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simula o delay
      } catch (e) {
        console.warn(e);
      } finally {
        // Quando tudo estiver pronto, esconde a splash screen
        setIsAppReady(true);
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  if (!isAppReady) {
    return null; // Enquanto o app não estiver pronto, não renderiza nada
  }


  return(
    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen name="Login" component={t1Login} options={{title: 'Login', headerStyle: {backgroundColor: '#383538',}, headerTintColor: '#AFD5AA', headerShown: false,}} />      


        <Stack.Screen name="t2Cadastro1" component={t2Cadastro1} options={{title: 'Faça seu Cadastro', headerStyle: {backgroundColor: '#383538',}, headerTintColor: '#AFD5AA', headerShown: true,}}/>        
        
        <Stack.Screen name="t3confirmaEmail" component={t3confirmaEmail} options={{title: 'Confirme seu E-mail', headerStyle: {backgroundColor: '#383538',}, headerTintColor: '#AFD5AA', headerShown: true,}}/>    

        <Stack.Screen name="t4AceitaTermos" component={t4AceitaTermos} options={{title: 'Termos e Condições', headerStyle: {backgroundColor: '#383538',}, headerTintColor: '#AFD5AA', headerShown: true,}}/>    

        <Stack.Screen name="t5Cadastro2" component={t5Cadastro2} options={{title: 'Faça seu Cadastro', headerStyle: {backgroundColor: '#383538',}, headerTintColor: '#AFD5AA', headerShown: true,}}/>    

        <Stack.Screen name="telaDisp" component={telaDisp} options={{title: 'Disponibilidade', headerStyle: {backgroundColor: '#383538',}, headerTintColor: '#AFD5AA', headerShown: true,}}/>      

        <Stack.Screen name="t6PesoAltura" component={t6PesoAltura} options={{title: 'Peso e Altura', headerStyle: {backgroundColor: '#383538',}, headerTintColor: '#AFD5AA', headerShown: true,}}/>        

        <Stack.Screen name="t7Biotipo" component={t7Biotipo} options={{title: 'Biotipo', headerStyle: {backgroundColor: '#383538',}, headerTintColor: '#AFD5AA', headerShown: true,}}/>         

        <Stack.Screen name="t8Objetivos" component={t8Objetivos} options={{title: 'Objetivos', headerStyle: {backgroundColor: '#383538',}, headerTintColor: '#AFD5AA', headerShown: true,}} />     

        <Stack.Screen name="Principal" component={Principal} options={{ title: 'Tela Principal', headerStyle: { backgroundColor: '#383538', }, headerTintColor: '#AFD5AA', headerShown: false, }} /> 

        <Stack.Screen name="Treinos" component={Treinos} options={{ title: 'Treinos', headerStyle: { backgroundColor: '#383538', }, headerTintColor: '#AFD5AA', headerShown: false, }} />

        <Stack.Screen name="Perfil" component={Perfil} options={{ title: 'Perfil', headerStyle: { backgroundColor: '#383538', }, headerTintColor: '#AFD5AA', headerShown: false, }} />

        <Stack.Screen name="Receita" component={Categorias} options={{ title: 'Receitas', headerStyle: { backgroundColor: '#383538', }, headerTintColor: '#AFD5AA', headerShown: false, }} />

        <Stack.Screen name="Evolucao" component={Evolucao} options={{ title: 'Evolução', headerStyle: { backgroundColor: '#383538', }, headerTintColor: '#AFD5AA', headerShown: false, }} />        

        <Stack.Screen name="Doces" component={Doces} options={{ title: 'Tela Doces', headerStyle: { backgroundColor: '#AFD5AA', }, headerTintColor: '#000', headerShown: false, }} />

      </Stack.Navigator>

    </NavigationContainer>
  )
}

