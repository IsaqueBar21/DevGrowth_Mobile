import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../connections/firebaseConnection";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFonts, RussoOne_400Regular } from "@expo-google-fonts/russo-one";
import * as SplashScreen from 'expo-splash-screen';

export default function Perfil() {
    const navigation = useNavigation();
    const route = useRoute();
    const { userId } = route.params; // Recebe o userId dinamicamente pela rota
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento dos dados
    const [nome, setNome] = useState(""); // Estado para armazenar o nome
    const [sobrenome, setSobrenome] = useState(""); // Estado para armazenar o sobrenome
    const [email, setEmail] = useState(""); // Estado para armazenar o email
    const [CPF, setCPF] = useState(""); // Estado para armazenar o CPF
    const [sexo, setSexo] = useState(""); // Estado para armazenar o sexo
    const [data_nasc, setData] = useState(""); // Estado para armazenar a data de nascimento

    // Função assíncrona que faz a busca no banco de dados
    async function getUserData(userId) {
        try {
            setLoading(true); // Ativa o estado de carregamento
            const userDocRef = doc(db, "Usuario", userId); // Referência ao documento do usuário
            const userDocument = await getDoc(userDocRef);

            if (userDocument.exists()) {
                const { nome, sobrenome, email, CPF, sexo, data_nasc } = userDocument.data(); // Extrair os dados
                setNome(nome || "");
                setSobrenome(sobrenome || "");
                setEmail(email || "");
                setCPF(CPF || "");
                setSexo(sexo || "");

                // Conversão de Timestamp para string formatada
                if (data_nasc) {
                    const date = data_nasc.toDate(); // Converte o Timestamp para um objeto Date
                    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${
                        (date.getMonth() + 1).toString().padStart(2, '0')
                    }/${date.getFullYear()}`;
                    setData(formattedDate);
                } else {
                    setData("Data não disponível");
                }
            } else {
                Alert.alert("Erro", "Documento não encontrado no Firestore.");
            }   
        } catch (error) {
            console.error("Erro ao buscar dados do Firestore:", error);
            Alert.alert("Erro", "Não foi possível buscar os dados do Firestore.");
        } finally {
            setLoading(false); // Desativa o estado de carregamento
        }
    }

    // useEffect para carregar dados ao montar o componente
    useEffect(() => {
        if (userId) {
            getUserData(userId); // Busca os dados do Firestore usando o ID recebido
        } else {
            Alert.alert("Erro", "ID do usuário não fornecido.");
        }
    }, [userId]); // Adicionado userId como dependência
    
    // Carregamento das fontes
    const [fontsLoaded] = useFonts({
        RussoOne_400Regular,
    });

    // Função para esconder a splash screen quando as fontes estiverem carregadas
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null; // Não renderiza nada até as fontes estarem carregadas
    }

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            {/* Tela de carregamento */}
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#AFD5AA" />
                    <Text style={styles.loadingText}>Carregando...</Text>
                </View>
            ) : (
                // Conteúdo da tela exibido após o carregamento
                <View style={styles.conteudo}>
                    {/* Botão voltar */}
                    <Icon
                        name="arrow-back"
                        size={30}
                        color="#FFF"
                        style={styles.backIcon}
                        onPress={() => navigation.goBack()}
                    />

                    {/* Título */}
                    <Text style={styles.titulo}>Perfil</Text>

                    <View style={styles.tamanho}>
                        {/* Informações do perfil */}
                        <Text style={styles.Info}>Nome Completo</Text>
                        <Text style={[styles.Area]} numberOfLines={1}>{nome} {sobrenome}</Text>

                        <Text style={styles.Info}>E-mail</Text>
                        <Text style={styles.Area} numberOfLines={1}>{email}</Text>

                        <Text style={styles.Info}>CPF</Text>
                        <Text style={[styles.Area]} numberOfLines={1}>{CPF}</Text>

                        <Text style={styles.Info}>Sexo</Text>
                        <Text style={[styles.Area]} numberOfLines={1}>{sexo}</Text>

                        <Text style={styles.Info}>Data de Nascimento</Text>
                        <Text style={[styles.Area]} numberOfLines={1}>{data_nasc}</Text>

                        <Text style={styles.Info}>Senha</Text>
                        <Text style={[styles.Area]} numberOfLines={1}></Text>

                        {/* Botões */}
                        <View style={styles.row}>
                            <TouchableOpacity>
                                <Text style={styles.AltSenha}>Alterar Senha</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.espaco}>
                                <Text style={styles.AltSenha}>Resetar Biotipo</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        backgroundColor: "#383538",
    },
    backIcon: {
        position: 'absolute',
        top: -60,
        color: '#AFD5AA',
        left: 20,
    },
    titulo: {
        color: '#AFD5AA',
        fontFamily: 'RussoOne_400Regular',
        fontSize: 40, // Levemente reduzido para caber melhor
        marginTop: -40,
        marginBottom: 30
    },
    Info: {
        color: '#AFD5AA',
        fontFamily: 'RussoOne_400Regular',
        fontSize: 20, // Mantido tamanho maior, mas mais adequado para a tela
        paddingBottom: 5
    },
    Area: {
        backgroundColor: '#FFF',
        padding: 8, // Um pouco mais de padding para deixar o campo mais legível
        paddingRight: 40, // Ajuste leve no padding para garantir que o texto caiba
        borderRadius: 10,
        textAlign: 'left',
        marginBottom: 15, // Aumentado um pouco o espaço entre os campos
        width: '100%'
    },
    AltSenha: {
        color: '#AFD5AA',
        fontFamily: 'RussoOne_400Regular',
        fontSize: 14, // Um pouco maior para manter a legibilidade
        borderWidth: 1,
        borderColor: '#AFD5AA',
        borderRadius: 5,
        padding: 6,
        paddingLeft: 12,
        width: 120, // Botão de alterar senha com largura um pouco maior
        height: 32
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Ajuste para dar espaço entre os botões
        marginTop: 15
    },
    espaco: {
        paddingLeft: 20, // Ajustado para distribuir melhor os botões
    },
    tamanho: {
        width: 300, // Largura ajustada para caber melhor na tela sem ser estreito
        marginLeft: -5
    },
    conteudo: {
        alignItems: 'center',
        fontFamily: 'RussoOne_400Regular',
        paddingHorizontal: 25 // Margem horizontal ajustada para dar mais espaço
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#383538',
    },
    loadingText: {
        color: '#AFD5AA',
        fontSize: 20, // Mantido um bom tamanho para legibilidade
        marginTop: 10,
        fontFamily: 'RussoOne_400Regular',
    }
});
