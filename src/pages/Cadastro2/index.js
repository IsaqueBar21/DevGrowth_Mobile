// TELA CADASTRO 2
import React, {useContext} from "react";
import {Platform} from "react-native";

// IMPORTAÇÃO DOS ESTILOS DA TELA DE LOGIN
import {Background, 
    Container, 
    AreaInput, 
    Input,
    Logo, 
    SubmitButton, 
    SubmitText, } from './styles';

// NAVEGAÇÃO PARA TELA ...
import { useNavigation } from "@react-navigation/native";

//IMPORTAÇÃO DO CONTEXTO PARA ACESSAR AS INFORMAÇÕES
import { AuthContext } from '../../contexts/auth';

export default function Cadastro2(){

    // INSTANCIA PARA NAVEGAR ENTRE TELAS
    const navigation = useNavigation();

    //PERMISSAO DO USO DO CONTEXTO ATRAVES DO NOME PASSADO
    const {user} = useContext(AuthContext)

    //FUNÇÃO QUE VERIFICA OS DADOS DO CONTEXTO CRIADO CONFORME AS INFORMAÇÕES DIGITADAS PELO USUARIO 
    function handleSignUp(){
        console.log(user.nome);
    }

    return(
        <Background>   

             {/* AREA GERAL */}
            <Container 
            // FAZ A TELA SUBIR QUANDO O TECLADO PRECISAR APARECER
            // VERIFICA SE O SISTEMA É IOS PARA APLICAR O MESMO PADRÃO
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled
            >
            
            {/* IMAGEM LOGO */}
            <Logo
                source={require('../../assets/LogoDevGrowth.png')}
            />

            {/* CAMPOS DE CADASTRO */}
            <AreaInput>
                <Input
                    placeholder="Nome"
                />   
            </AreaInput>
            <AreaInput>
                    <Input
                        placeholder="Sobrenome"
                    />                       
            </AreaInput>
            <AreaInput>
                    <Input
                        placeholder="Data de Nascimento"
                    />                       
            </AreaInput>   
            <AreaInput>
                    <Input
                        placeholder="CPF"
                    />                       
            </AreaInput>

             {/* PROPRIEDADE ONPRESS LEVA PARA A PAGINA CONFORME PASSADO ENTRE '' */}
            <SubmitButton activeOpacity={0.5}
            onPress={handleSignUp}>
                    <SubmitText>Próximo</SubmitText>
            </SubmitButton>              

              

            </Container>
        </Background>
    )
}

