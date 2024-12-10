import React, { useEffect, useCallback, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, RussoOne_400Regular } from "@expo-google-fonts/russo-one";
import { db } from "../../connections/firebaseConnection";
import { doc, getDoc} from 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';

SplashScreen.preventAutoHideAsync(); // Impede que a splash screen desapareça automaticamente

export default function Doces() {
    const [loading, setLoading] = useState(true); // Estado para controle de carregamento
    const [titulo01, setTitulo01] = useState("...");
    const [kcal01, setKcal01] = useState("...");
    const [tempo01, setTempo01] = useState("...");

    const [titulo02, setTitulo02] = useState("...");
    const [kcal02, setKcal02] = useState("...");
    const [tempo02, setTempo02] = useState("...");

    const [titulo03, setTitulo03] = useState("...");
    const [kcal03, setKcal03] = useState("...");
    const [tempo03, setTempo03] = useState("...");

    const [titulo04, setTitulo04] = useState("...");
    const [kcal04, setKcal04] = useState("...");
    const [tempo04, setTempo04] = useState("...");

    const navigation = useNavigation();
    const [fontsLoaded] = useFonts({
        RussoOne_400Regular,
    });

    // Função para esconder a splash screen quando as fontes estiverem carregadas
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    useEffect(() => {
        async function getDados() {
            const docRef01 = doc(db, "Receitas", "TortaEspumaDeLimao");
            const docRef02 = doc(db, "Receitas", "BoloCenoura");
            const docRef03 = doc(db, "Receitas", "BrigadeiroCacau");
            const docRef04 = doc(db, "Receitas", "PudimLeiteCondensado");

            try {
                // Carregando os dados das receitas
                const snapshot01 = await getDoc(docRef01);
                const snapshot02 = await getDoc(docRef02);
                const snapshot03 = await getDoc(docRef03);
                const snapshot04 = await getDoc(docRef04);

                setTitulo01(snapshot01.data()?.titulo);
                setKcal01(snapshot01.data()?.kcal);
                setTempo01(snapshot01.data()?.tempo);

                setTitulo02(snapshot02.data()?.titulo);
                setKcal02(snapshot02.data()?.kcal);
                setTempo02(snapshot02.data()?.tempo);

                setTitulo03(snapshot03.data()?.titulo);
                setKcal03(snapshot03.data()?.kcal);
                setTempo03(snapshot03.data()?.tempo);

                setTitulo04(snapshot04.data()?.titulo);
                setKcal04(snapshot04.data()?.kcal);
                setTempo04(snapshot04.data()?.tempo);

            } catch (err) {
                console.log("Erro ao buscar receitas:", err);
            } finally {
                setLoading(false); // Após o carregamento, definimos o estado para false
            }
        }

        getDados();
    }, []);

    if (!fontsLoaded) {
        return null; // Não renderiza nada até as fontes estarem carregadas
    }

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            {/* Tela de carregamento */}
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FFF" />
                    <Text style={styles.loadingText}>Carregando...</Text>
                </View>
            ) : (
                
                <View style={styles.conteudo}>
                    {/* BOTÃO VOLTAR TELA */}
                    <Icon 
                        name="arrow-back" 
                        size={30} 
                        color="#FFF" 
                        style={styles.backIcon} 
                        onPress={() => navigation.goBack()} 
                    />

                    <View style={{ alignItems: 'baseline', justifyContent: 'center', flexDirection: 'row', paddingTop: 25 }}>
                        <Text style={styles.textNome}>Doces</Text>
                    </View>
                    <Text style={styles.textReceita}>Lista de Receitas</Text>

                    {/* BOTÕES */}
                    {/* Receita 01 */}
                    <TouchableOpacity onPress={ () => navigation.navigate('TortaEspumaLimao') }>
                        <View style={styles.retangulo}>
                            <Text style={styles.textoEsquerda}>{titulo01}</Text>
                            <View style={styles.textoDireitaContainer}>
                                <Text style={styles.textoDireita}>{kcal01} kcal</Text>
                                <Text style={styles.textoDireita}>{tempo01} min</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/* Receita 02 */}
                    <TouchableOpacity onPress={ () => navigation.navigate('BoloCenoura') }>
                        <View style={styles.retangulo}>
                            <Text style={styles.textoEsquerda}>{titulo02}</Text>
                            <View style={styles.textoDireitaContainer}>
                                <Text style={styles.textoDireita}>{kcal02} kcal</Text>
                                <Text style={styles.textoDireita}>{tempo02} min</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/* Receita 03 */}
                    <TouchableOpacity onPress={ () => navigation.navigate('BrigadeiroCacau') }>
                        <View style={styles.retangulo}>
                            <Text style={styles.textoEsquerda}>{titulo03}</Text>
                            <View style={styles.textoDireitaContainer}>
                                <Text style={styles.textoDireita}>{kcal03} kcal</Text>
                                <Text style={styles.textoDireita}>{tempo03} min</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/* Receita 04 */}
                    <TouchableOpacity onPress={ () => navigation.navigate('PudimLeiteCondensado') }>
                        <View style={styles.retangulo}>
                            <Text style={styles.textoEsquerda}>{titulo04}</Text>
                            <View style={styles.textoDireitaContainer}>
                                <Text style={styles.textoDireita}>{kcal04} kcal</Text>
                                <Text style={styles.textoDireita}>{tempo04} min </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
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
        marginTop: 10,
        marginBottom: 5,
        color: "#AFD5AA",
        fontSize: 33,
        fontFamily: 'RussoOne_400Regular',
    },
    textReceita: { 
        marginBottom: 10,
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
        width: 340,
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
});
