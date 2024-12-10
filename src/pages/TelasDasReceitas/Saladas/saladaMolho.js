import React, { useEffect, useCallback, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, RussoOne_400Regular } from "@expo-google-fonts/russo-one";
import { db } from "../../../connections/firebaseConnection";
import { doc, getDoc} from 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';

SplashScreen.preventAutoHideAsync(); // Impede que a splash screen desapareça automaticamente

export default function SaladaMolho() {
    const [loading, setLoading] = useState(true); 
    const [titulo01, setTitulo01] = useState("...");
    const [ingredientes01, setIngredientes01] = useState("...");
    const [preparo01, setPreparo01] = useState("...");

    const navigation = useNavigation();
    const [fontsLoaded] = useFonts({
        RussoOne_400Regular,
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    useEffect(() => {
        async function getDados() {
            const docRef01 = doc(db, "Receitas", "SaladaCaesar");

            try {
                const snapshot01 = await getDoc(docRef01);
                setTitulo01(snapshot01.data()?.titulo);
                setIngredientes01(snapshot01.data()?.ingredientes);
                setPreparo01(snapshot01.data()?.modo_preparo);
            } catch (err) {
                console.log("Erro ao buscar receitas:", err);
            } finally {
                setLoading(false);
            }
        }
        getDados();
    }, []);

    if (!fontsLoaded) {
        return null; 
    }

    // Função para formatar os ingredientes
    const formatarIngredientes = (ingredientes) => {
        // Dividir os ingredientes por quebras de linha ou pontos
        return ingredientes.split("\n").map((ingrediente, index) => {
            return (
                <View key={index}>
                    <Text style={styles.textoIngrediente}>{ingrediente.trim()}</Text>
                </View>
            );
        });
    };

    // Função para formatar o modo de preparo
    const formatarPreparo = (preparo) => {
        // Dividir o preparo por pontos, para separar cada etapa
        // Dividir os ingredientes por quebras de linha ou pontos
        return preparo.split("\n").map((preparo, index) => {
            return (
                <View key={index}>
                    <Text style={styles.textoIngrediente}>{preparo.trim()}</Text>
                </View>
            );
        });
    };

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FFF" />
                    <Text style={styles.loadingText}>Carregando...</Text>
                </View>
            ) : (
                <View style={styles.conteudo}>
                    <Icon 
                        name="arrow-back" 
                        size={30} 
                        color="#FFF" 
                        style={styles.backIcon} 
                        onPress={() => navigation.goBack()} 
                    />
                    <View style={{ alignItems: 'baseline', justifyContent: 'center', flexDirection: 'row', paddingTop: 25 }}>
                        <Text style={styles.textNome}>{titulo01}</Text>
                    </View>
                    <Text style={styles.textReceita}>Ingredientes</Text>
                    <View style={styles.retangulo}>
                        {formatarIngredientes(ingredientes01)}
                    </View>

                    <Text style={styles.textReceita}>Modo de Preparo</Text>
                    <View style={styles.retangulo}>
                        {formatarPreparo(preparo01)}
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#353835',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#353835',
    },
    loadingText: {
        color: '#FFF',
        fontSize: 20,
        marginTop: 10,
        fontFamily: 'RussoOne_400Regular',
    },
    textNome: { 
        marginTop: 20,
        marginBottom: 5,
        color: "#AFD5AA",
        fontSize: 25,
        fontFamily: 'RussoOne_400Regular',
        textAlign: 'center',
    },
    textReceita: { 
        marginTop: 1,
        marginBottom: 1,
        color: "#AFD5AA",
        fontSize: 23,
        fontFamily: 'RussoOne_400Regular',
    },
    conteudo: {
        marginTop: 40,
        alignItems: 'center',
        flex: 1,
    },
    retangulo: {
        flexDirection: 'row',
        backgroundColor: '#353835', 
        padding: 10,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "#AFD5AA",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
        width: 380,
    },
    textoEsquerda: {
        fontSize: 16,
        color: '#FFFF',
        flexShrink: 1,
        width: 'auto',
        overflow: 'hidden',
    },
    textoDireitaContainer: {
        alignItems: 'flex-end',
        flexDirection: 'column',
    },
    textoDireita: {
        fontSize: 14,
        color: '#FFFF',
    },
    backIcon: {
        position: 'absolute',
        top: 1,
        color: "#AFD5AA",
        left: 20,
    },
    subtitulo: {
        fontSize: 17,
        color: '#AFD5AA',
        fontFamily: 'RussoOne_400Regular',
        marginTop: 15,
    },
    textoIngrediente: {
        fontSize: 12.5,
        color: '#FFFF',
        marginBottom: 10,
    },
});

