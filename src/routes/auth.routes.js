import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

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

            {/* TELA CADASTRO */}
            <AuthStack.Screen
                name="SignUp"
                component={SignUp}
            />
        </AuthStack.Navigator>
    )
}

export default AuthRoutes;