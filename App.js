import React from 'react';
import { StatusBar } from 'react-native';

// IMPORTAÇÃO DAS ROTAS DO APP
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';

// IMPORTAÇÃO DO CONTEXTO DE VALIDAÇÃO DE USUARIOS
import AuthProvider from './src/contexts/auth';


export default function App() {
  return (
    //ATRAVES DO NAVIGATION APLICAMOS A ROTA CRIADA PARA NAVEGAÇÃO
    <NavigationContainer>

         {/* CONTEXTO ENGLOBA TODAS AS TELAS */}
        <AuthProvider>
      
          {/* DEFINIR BARRA SUPERIOR DA MESMA COR DA APP */}
          <StatusBar
            backgroundColor="#383538"
            // cor icones
            barStyle="light-content"
          />

          <Routes/>
          
        </AuthProvider>

    </NavigationContainer>
  );
}


