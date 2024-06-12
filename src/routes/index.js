//ESSA PAGINA VERIFICA QUEM ESTA LOGADO DEFINE AS ROTAS DO APLICATIVO

import React from "react";
import { View, ActivityIndicator } from "react-native";

//IMPORTAÇÃO DAS ROTAS DEFINIDAS
import AuthRoutes from "./auth.routes";

function Routes() {
    //CARREGAMENTO DA PAGINA
    const loading = false;

    //VERIFICA USUARIO LOGADO
    const signed = false;
    
    return(
        //CONDIÇÃO PARA VERIFICAR SE O USUARIO ESTA LOGADO
        // SE ESTIVER VAI PARA AUTHROUTES
        // SE NÃO IRÁ PARA UMA VIEW VAZIA (TEMPORARIO)
        signed ? <View></View> : <AuthRoutes/>
    )
}

export default Routes;