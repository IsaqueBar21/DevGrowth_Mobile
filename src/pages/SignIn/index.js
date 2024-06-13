import React from "react";
import {Platform} from "react-native";

// IMPORTAÇÃO DO ESTILO DA PAGINA DE LOGIN
import {Background, 
        Container, 
        Logo, 
        AreaInput, 
        Input, 
        SubmitButton,
        SubmitButton2,
        SubmitText,
        SubmitText2,
        Link,
        LinkText
        } from "./styles";

// NAVEGAÇÃO PARA TELA DE CADASTRO 1
import { useNavigation } from "@react-navigation/native";

export default function SignIn(){
    
    // INSTANCIA PARA NAVEGAR ENTRE TELAS
    const navigation = useNavigation();

    return(
        <Background>
            
            {/* CONTAINER LOGO */}
            <Container
                // FAZ A TELA SUBIR QUANDO O TECLADO PRECISAR APARECER
                // VERIFICA SE O SISTEMA É IOS PARA APLICAR O MESMO PADRÃO
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                enabled
            >
                <Logo
                    source={require('../../assets/LogoDevGrowth.png')}
                />

                {/* CAMPOS LOGIN E SENHA */}
                <AreaInput>
                    <Input
                        placeholder="Email"
                    />   
                </AreaInput>
                <AreaInput>
                    <Input
                        placeholder="Senha"
                    />                       
                </AreaInput>

                <Link>
                    <LinkText>Esqueci minha senha</LinkText>
                </Link>

                <SubmitButton activeOpacity={0.5}>
                    <SubmitText>Entrar</SubmitText>
                </SubmitButton>

                {/* PROPRIEDADE ONPRESS LEVA PARA A PAGINA CONFORME PASSADO ENTRE '' */}
                <SubmitButton2 activeOpacity={0.5} onPress={() => navigation.navigate('SignUp')}>
                    <SubmitText2>Fazer meu cadastro</SubmitText2>
                </SubmitButton2>


            </Container>
            
        </Background>
    )
}