import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../connections/firebaseConnection";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFonts, RussoOne_400Regular } from "@expo-google-fonts/russo-one";
import * as SplashScreen from 'expo-splash-screen';
import Icon from 'react-native-vector-icons/Ionicons'; 

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
    const [objetivos, setObjetivos] = useState([]); // Estado para armazenar os objetivos
    const [biotipo, setBiotipo] = useState(""); // Estado para armazenar o biotipo

    // Função assíncrona que faz a busca no banco de dados
    async function getUserData(userId) {
        try {
            setLoading(true);
            const userDocRef = doc(db, "Usuario", userId);
            const userDocument = await getDoc(userDocRef);

            if (userDocument.exists()) {
                const { nome, sobrenome, email, cpf, sexo, data_nascimento, objetivos, biotype } = userDocument.data();
                setNome(nome || "");
                setSobrenome(sobrenome || "");
                setEmail(email || "");
                setCPF(cpf ? `${cpf.slice(0, 3)}.***.***-${cpf.slice(-2)}` : "CPF não disponível");
                setSexo(sexo || "");
                setData(data_nascimento || "Data não disponível");
                setObjetivos(objetivos || []);
                setBiotipo(biotype || "Biotipo não disponível");
            } else {
                Alert.alert("Erro", "Documento não encontrado no Firestore.");
            }
        } catch (error) {
            console.error("Erro ao buscar dados do Firestore:", error);
            Alert.alert("Erro", "Não foi possível buscar os dados do Firestore.");
        } finally {
            setLoading(false);
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
                <View style={styles.container}>
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
                        <Text style={[styles.Area]} numberOfLines={1}>{nome}{sobrenome}</Text>

                        <Text style={styles.Info}>E-mail</Text>
                        <Text style={styles.Area} numberOfLines={1}>{email}</Text>

                        <Text style={styles.Info}>Sexo</Text>
                        <Text style={[styles.Area]} numberOfLines={1}>{sexo}</Text>

                        <Text style={styles.Info}>CPF</Text>
                        <Text style={[styles.Area]} numberOfLines={1}>{CPF}</Text>

                        <Text style={styles.Info}>Data de Nascimento</Text>
                        <Text style={[styles.Area]} numberOfLines={1}>{data_nasc}</Text>

                        {/* Exibindo Objetivos */}
                        <Text style={styles.Info}>Objetivos</Text>
                        <Text style={styles.Area}>
                            {objetivos.length > 0 ? objetivos.join(", ") : "Nenhum objetivo definido"}
                        </Text>

                        {/* Exibindo Biotipo */}
                        <Text style={styles.Info}>Biotipo</Text>
                        <Text style={styles.Area}>{biotipo}</Text>
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
        backgroundColor: "#383538",
        padding:25
    },
    backIcon: {
        position: 'absolute',
        top: 10,
        left: 1,
    },
    titulo: {
        color: '#AFD5AA',
        fontFamily: 'RussoOne_400Regular',
        fontSize: 40,
        marginTop: -40,
        marginBottom: 30
    },
    Info: {
        color: '#AFD5AA',
        fontFamily: 'RussoOne_400Regular',
        fontSize: 20,
        paddingBottom: 5
    },
    Area: {
        backgroundColor: '#FFF',
        padding: 8,
        paddingRight: 40,
        borderRadius: 10,
        textAlign: 'left',
        marginBottom: 15,
        width: '100%'
    },
    tamanho: {
        width: 300,
        marginLeft: -5
    },
    conteudo: {
        alignItems: 'center',
        fontFamily: 'RussoOne_400Regular',
        paddingHorizontal: 25
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#383538',
    },
    loadingText: {
        color: '#AFD5AA',
        fontSize: 20,
        marginTop: 10,
        fontFamily: 'RussoOne_400Regular',
    }
});
