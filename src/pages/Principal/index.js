import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, RussoOne_400Regular } from "@expo-google-fonts/russo-one";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../connections/firebaseConnection";

export default function Principal() {
    const navigation = useNavigation();
    const route = useRoute();
    const { userId } = route.params; // Obtendo o userId do contexto
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento dos dados
    const [nome, setNome] = useState("..."); // Estado para armazenar o nome
    const [error, setError] = useState(null); // Estado para armazenar erros

    // Função assíncrona que faz a busca no banco de dados
    async function getUserData() {
        try {
            setLoading(true);
            if (!userId) {
                throw new Error("Usuário não autenticado.");
            }
            const userDocRef = doc(db, "Usuario", userId); // Usando diretamente o userId do contexto
            const userDocument = await getDoc(userDocRef);

            if (userDocument.exists()) {
                const { nome } = userDocument.data();
                setNome(nome ? nome : "Nome não disponível");
            } else {
                setError("Documento não encontrado no Firestore.");
            }
        } catch (error) {
            setError("Não foi possível buscar os dados.");
            console.error("Erro ao buscar dados do Firestore:", error);
        } finally {
            setLoading(false);
        }
    }

    // useEffect para carregar dados ao montar o componente
    useEffect(() => {
        if (!userId) {
            Alert.alert('Erro', 'Você precisa estar logado!');
            navigation.navigate('Login');  // Redireciona para a tela de login se não houver userId
        } else {
            getUserData(); // Carregar dados do usuário se o userId estiver presente
        }
    }, [userId]);

    // Função de navegação
    function navegaTreinos() {
        if (userId) {
            navigation.navigate('Treinos', { userId });
        } else {
            Alert.alert('Erro', 'Você não está autenticado.');
        }
    }

    function navegaEvolucao() {
        if (userId) {
            navigation.navigate('Evolucao', {userId})
        } else {
            Alert.alert('Erro', 'Você não está autenticado.');
        }
    }

    function navegaReceitas() {
        if (userId) {
            navigation.navigate('Receita', { userId });
        } else {
            Alert.alert('Erro', 'Você não está autenticado.');
        }
    }

    function navegaPerfil() {
        if (userId) {
            navigation.navigate('Perfil', { userId });
        } else {
            Alert.alert('Erro', 'Você não está autenticado.');
        }
    }

    function navegaSair() {
        navigation.navigate('Login');
    }

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
                    <Image
                        style={styles.logo}
                        source={require('./Img/LogoDevGrowth.png')}
                    />

                    <View style={{ width: '100%', alignItems: 'center', paddingTop: 25 }}>
                        <View style={{ flexDirection: 'row', width: 300, justifyContent: 'flex-start' }}>
                            <Text style={styles.textOla}>Olá,</Text>
                            <Text style={styles.textNome} numberOfLines={1} ellipsizeMode="tail">
                                {nome}
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.bemVindo}>Seja bem Vindo</Text>

                    <TouchableOpacity onPress={navegaTreinos}>
                        <Text style={[styles.text, { paddingLeft: 67, paddingRight: 67 }]}>Treinos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={navegaEvolucao}>
                        <Text style={styles.text}>Evolução</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={navegaReceitas}>
                        <Text style={[styles.text, { paddingLeft: 55, paddingRight: 55 }]}>Receitas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={navegaPerfil}>
                        <Text style={[styles.text, { paddingLeft: 93, paddingRight: 93 }]}>Perfil</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={navegaSair}>
                        <Text style={styles.sair}>Sair</Text>
                    </TouchableOpacity>
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
        backgroundColor: '#383538',
    },
    logo: {
        width: 100,
        height: 50,
    },
    text: {
        fontSize: 50,
        marginTop: 25,
        backgroundColor: "#383538",
        color: "#AFD5AA",
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#AFD5AA',
        textAlign: 'center',
        fontFamily: 'RussoOne_400Regular',
    },
    textOla: {
        color: '#AFD5AA',
        fontSize: 35,
        fontFamily: 'RussoOne_400Regular',
        textAlign: 'left',
        width: 70,
    },
    textNome: {
        color: "#FFF",
        fontSize: 35,
        fontFamily: 'RussoOne_400Regular',
        flex: 1,
        textAlign: 'left',
        marginLeft: 8,
    },
    bemVindo: {
        color: '#218380',
        fontSize: 17,
        marginLeft: -160,
        fontFamily: 'RussoOne_400Regular',
    },
    conteudo: {
        marginTop: -20,
        alignItems: 'center',
        fontFamily: 'RussoOne_400Regular',
    },
    sair: {
        paddingTop: 30,
        fontSize: 25,
        color: '#218380',
        fontFamily: 'RussoOne_400Regular',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#383538', // Fundo com a mesma cor da tela para manter a uniformidade
    },
    loadingText: {
        color: '#AFD5AA',
        fontSize: 20,
        marginTop: 10,
        fontFamily: 'RussoOne_400Regular',
    }
});
