// ESSA PAGINA É RESPONSÁVEL POR SINCRONIZAR OS DADOS DO USUÁRIO AO FAZER O LOGIN NA APLICAÇÃO 

import React, {createContext, useState} from "react";

// VALOR INICIAL OBJETO VAZIO
export const AuthContext = createContext({});

// O PROVIDER QUE PROVÊ AS INFORMAÇÕES DE LOGIN DO USUARIO
function AuthProvider({children}){
    // USUARIO DE TESTE PARA VERIFICAR E VALIDAR AS INFORMAÇÕES DO USUARIO NA TELA 
    const [user, setUser] = useState({
        nome: 'Usuario Teste'
    })

    return(
        // INFORMAÇÃO QUE TODOS TERÃO ACESSO
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

// PARA QUE TODOS TENHAM ACESSO A ESSE CONTEXTO É NECESSÁRIO IMPORTAR NO APP.JS PRINCIPAL