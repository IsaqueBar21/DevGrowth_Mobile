import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Cadastro2 from "../pages/Cadastro2";

const AuthStack = createNativeStackNavigator();

//ROTAS DE AUTENTICAÇÃO
function AuthRoutes(){
    return(
        //Configurações de rota
        <AuthStack.Navigator>

            {/* TELA LOGIN */}
            <AuthStack.Screen
                name="SignIn"
                component={SignIn}

                // ESCONDE O HEADER DA TELA 
                options={{headerShown: false}}
            />

            {/* TELA CADASTRO 1*/}
            <AuthStack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    // estilos cabeçalho pagina cadastro
                    headerStyle:{
                        backgroundColor: '#383538',
                    },
                    headerTintColor: '#AFD5AA',
                    headerTitle: '',
                }}
            />

            {/* TELA CADASTRO 2*/}
            <AuthStack.Screen
                name="Cadastro2"
                component={Cadastro2}
                options={{
                    // estilos cabeçalho pagina cadastro
                    headerStyle:{
                        backgroundColor: '#383538',
                    },
                    headerTintColor: '#AFD5AA',
                    headerTitle: '',
                }}
            />


        </AuthStack.Navigator>
    )
}

export default AuthRoutes;