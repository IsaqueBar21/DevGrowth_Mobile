// TELA CADASTRO 1
import React from "react";
import {Platform} from "react-native";

// IMPORTAÇÃO DOS ESTILOS DA TELA DE LOGIN
import {Background, 
    Container, 
    AreaInput, 
    Input,
    Logo, 
    SubmitButton, 
    SubmitText, } from './styles';

    // NAVEGAÇÃO PARA TELA DE CADASTRO 2
import { useNavigation } from "@react-navigation/native";

export default function Cadastro2(){

    // INSTANCIA PARA NAVEGAR ENTRE TELAS
    const navigation = useNavigation();

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
            onPress={() => navigation.navigate('')}>
                    <SubmitText>Próximo</SubmitText>
            </SubmitButton>              

              

            </Container>
        </Background>
    )
}

