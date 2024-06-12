//ESTILIZAÇÃO TELA LOGIN
import styled from 'styled-components/native';


// BACKGROUND APP
export const Background = styled.View`
    flex:1;
    background-color: #383538;
`;

// ESTILO CONTAINER COM ELEMENTOS
export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-top: -400px;
`;

// ESTILO IMAGEM LOGO
export const Logo = styled.Image`    
    width: 240px;
    height: 120px;
    margin-top: 400px;
    margin-bottom: 100px;    
`;

// AREA LABEL CAMPOS LOGIN E SENHA
export const AreaInput = styled.View`
    flex-direction: row; 
`;

// CAMPOS DE INPUT DE DADOS
export const Input = styled.TextInput`
    background-color: #FFF;
    width: 90%;
    font-size: 18px;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 35px;   
`;

// BOTAO ESQUECI MINHA SENHA
export const Link = styled.TouchableOpacity`
    margin-top: -25px;
    margin-bottom: 40px;
    margin-left: -200px;
    
`;

export const LinkText = styled.Text`
    font-size: 16px;
    color: #AFD5AA;
    underscore: true;
`;

// BOTAO DE ENTRAR
export const SubmitButton = styled.TouchableOpacity`
    width: 100px;
    border: 2px solid #AFD5AA;
    height: 48px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;  
    margin-bottom: 20px;
`;

export const SubmitText = styled.Text`
    font-size: 20px;
    color: #AFD5AA;    
    font-weight: bold;
`;

// BOTAO CADASTRO
export const SubmitButton2 = styled.TouchableOpacity` 
    width: 220px;
    border: 2px solid #218380;
    background-color: #AFD5AA;
    height: 48px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;  
    margin-bottom: 20px;
`;

export const SubmitText2 = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #383538; 
`;







