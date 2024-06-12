import React from 'react';
import { StatusBar } from 'react-native';

// IMPORTAÇÃO DAS ROTAS DO APP
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';


export default function App() {
  return (
    //ATRAVES DO NAVIGATION APLICAMOS A ROTA CRIADA PARA NAVEGAÇÃO
    <NavigationContainer>
      
      {/* DEFINIR BARRA SUPERIOR DA MESMA COR DA APP */}
      <StatusBar
        backgroundColor="#383538"
        // cor icones
        barStyle="light-content"
      />

      <Routes/>
    </NavigationContainer>
  );
}


