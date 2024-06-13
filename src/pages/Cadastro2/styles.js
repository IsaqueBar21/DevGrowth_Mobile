//ESTILIZAÇÃO TELA CADASTRO 1
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
    margin-top: -150px;
`;

// ESTILO IMAGEM LOGO
export const Logo = styled.Image`    
    width: 180px;
    height: 100px;
    margin-top: 150px;
    margin-bottom: 60px;    
`;

// AREA LABEL CAMPOS CADASTRO
export const AreaInput = styled.View`
    flex-direction: row; 
`;

// CAMPOS DE INPUT DE DADOS
export const Input = styled.TextInput`
    background-color: #FFF;
    width: 65%;
    font-size: 18px;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 35px;   
`;

// BOTAO DE CADASTRAR
export const SubmitButton = styled.TouchableOpacity`
    width: 160px;
    border: 2px solid #AFD5AA;
    height: 60px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;  
    margin-bottom: 20px;
`;

export const SubmitText = styled.Text`
    font-size: 26px;
    color: #AFD5AA;    
    font-weight: bold;
`;

