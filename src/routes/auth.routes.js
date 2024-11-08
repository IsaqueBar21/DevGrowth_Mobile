// AuthRoutes.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Cadastro2 from "../pages/Cadastro2";
import verificaEmail from "../pages/verificaEmail"; // Importando a tela de verificação de código

const AuthStack = createNativeStackNavigator();

// ROTAS DE AUTENTICAÇÃO
function AuthRoutes() {
  return (
    // Configurações de rota
    <AuthStack.Navigator>
      
      {/* TELA LOGIN */}
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />

      {/* TELA CADASTRO 1 */}
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerStyle: {
            backgroundColor: "#383538",
          },
          headerTintColor: "#AFD5AA",
          headerTitle: "",
        }}
      />

      {/* TELA VERIFICAÇÃO DE CÓDIGO */}
      <AuthStack.Screen
        name="verificaEmail" // Nome da rota
        component={verificaEmail} // Componente da tela de verificação
        options={{
          headerStyle: {
            backgroundColor: "#383538",
          },
          headerTintColor: "#AFD5AA",
          headerTitle: "",
        }}
      />

      {/* TELA CADASTRO 2 */}
      <AuthStack.Screen
        name="Cadastro2"
        component={Cadastro2}
        options={{
          headerStyle: {
            backgroundColor: "#383538",
          },
          headerTintColor: "#AFD5AA",
          headerTitle: "",
        }}
      />
      
    </AuthStack.Navigator>
  );
}

export default AuthRoutes;
