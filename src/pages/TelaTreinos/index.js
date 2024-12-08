import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../connections/firebaseConnection'; // Ajuste o caminho se necessário

export default function Treinos() {
    const navigation = useNavigation();
    const [imc, setImc] = useState(null);
    const [biotipo, setBiotipo] = useState(null);
    const [objetivo, setObjetivo] = useState(null);
    const [pdfLink, setPdfLink] = useState(null);
    const route = useRoute();
    const { userId } = route.params; // Recebe o userId da navegação

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Puxa os dados do usuário a partir do userId
                const userRef = doc(db, 'Usuario', userId);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    setImc(userData.imcCategory); // Obtém o IMC do usuário
                    setBiotipo(userData.biotype); // Obtém o biotipo
                    setObjetivo(userData.objetivos); // Obtém o objetivo

                    const pdfLinks = {
                        "Ganhar Peso (Massa muscular)": {
                          Ectomorfo: {
                            1: "https://link.to/pdf/ganho_massa_ectomorfo_1dia.pdf",
                            2: "https://link.to/pdf/ganho_massa_ectomorfo_2dias.pdf",
                            3: "https://link.to/pdf/ganho_massa_ectomorfo_3dias.pdf",
                            4: "https://link.to/pdf/ganho_massa_ectomorfo_4dias.pdf",
                            5: "https://drive.google.com/file/d/1c8Tyl9IvRW8NwkGZUhW1-cZ279fVgOuk/preview",
                            6: "https://link.to/pdf/ganho_massa_ectomorfo_6dias.pdf",
                            7: "https://link.to/pdf/ganho_massa_ectomorfo_7dias.pdf",
                          },
                          Endomorfo: {
                            1: "https://link.to/pdf/ganho_massa_endomorfo_1dia.pdf",
                            2: "https://link.to/pdf/ganho_massa_endomorfo_2dias.pdf",
                            3: "https://link.to/pdf/ganho_massa_endomorfo_3dias.pdf",
                            4: "https://link.to/pdf/ganho_massa_endomorfo_4dias.pdf",
                            5: "https://link.to/pdf/ganho_massa_endomorfo_5dias.pdf",
                            6: "https://link.to/pdf/ganho_massa_endomorfo_6dias.pdf",
                            7: "https://link.to/pdf/ganho_massa_endomorfo_7dias.pdf",
                          },
                          Mesomorfo: {
                            1: "https://link.to/pdf/ganho_massa_mesomorfo_1dia.pdf",
                            2: "https://link.to/pdf/ganho_massa_mesomorfo_2dias.pdf",
                            3: "https://link.to/pdf/ganho_massa_mesomorfo_3dias.pdf",
                            4: "https://link.to/pdf/ganho_massa_mesomorfo_4dias.pdf",
                            5: "https://link.to/pdf/ganho_massa_mesomorfo_5dias.pdf",
                            6: "https://link.to/pdf/ganho_massa_mesomorfo_6dias.pdf",
                            7: "https://link.to/pdf/ganho_massa_mesomorfo_7dias.pdf",
                          }
                        },
                        "Perda de Massa Muscular": {
                          Ectomorfo: {
                            1: "https://link.to/pdf/perda_massa_ectomorfo_1dia.pdf",
                            2: "https://link.to/pdf/perda_massa_ectomorfo_2dias.pdf",
                            3: "https://link.to/pdf/perda_massa_ectomorfo_3dias.pdf",
                            4: "https://link.to/pdf/perda_massa_ectomorfo_4dias.pdf",
                            5: "https://link.to/pdf/perda_massa_ectomorfo_5dias.pdf",
                            6: "https://link.to/pdf/perda_massa_ectomorfo_6dias.pdf",
                            7: "https://link.to/pdf/perda_massa_ectomorfo_7dias.pdf",
                          },
                          Endomorfo: {
                            1: "https://link.to/pdf/perda_massa_endomorfo_1dia.pdf",
                            2: "https://link.to/pdf/perda_massa_endomorfo_2dias.pdf",
                            3: "https://link.to/pdf/perda_massa_endomorfo_3dias.pdf",
                            4: "https://link.to/pdf/perda_massa_endomorfo_4dias.pdf",
                            5: "https://link.to/pdf/perda_massa_endomorfo_5dias.pdf",
                            6: "https://link.to/pdf/perda_massa_endomorfo_6dias.pdf",
                            7: "https://link.to/pdf/perda_massa_endomorfo_7dias.pdf",
                          },
                          Mesomorfo: {
                            1: "https://link.to/pdf/perda_massa_mesomorfo_1dia.pdf",
                            2: "https://link.to/pdf/perda_massa_mesomorfo_2dias.pdf",
                            3: "https://link.to/pdf/perda_massa_mesomorfo_3dias.pdf",
                            4: "https://link.to/pdf/perda_massa_mesomorfo_4dias.pdf",
                            5: "https://link.to/pdf/perda_massa_mesomorfo_5dias.pdf",
                            6: "https://link.to/pdf/perda_massa_mesomorfo_6dias.pdf",
                            7: "https://link.to/pdf/perda_massa_mesomorfo_7dias.pdf",
                          }
                        },
                        "Definição Muscular": {
                          Ectomorfo: {
                            1: "https://link.to/pdf/definicao_muscular_ectomorfo_1dia.pdf",
                            2: "https://link.to/pdf/definicao_muscular_ectomorfo_2dias.pdf",
                            3: "https://link.to/pdf/definicao_muscular_ectomorfo_3dias.pdf",
                            4: "https://link.to/pdf/definicao_muscular_ectomorfo_4dias.pdf",
                            5: "https://link.to/pdf/definicao_muscular_ectomorfo_5dias.pdf",
                            6: "https://link.to/pdf/definicao_muscular_ectomorfo_6dias.pdf",
                            7: "https://link.to/pdf/definicao_muscular_ectomorfo_7dias.pdf",
                          },
                          Endomorfo: {
                            1: "https://link.to/pdf/definicao_muscular_endomorfo_1dia.pdf",
                            2: "https://link.to/pdf/definicao_muscular_endomorfo_2dias.pdf",
                            3: "https://link.to/pdf/definicao_muscular_endomorfo_3dias.pdf",
                            4: "https://link.to/pdf/definicao_muscular_endomorfo_4dias.pdf",
                            5: "https://link.to/pdf/definicao_muscular_endomorfo_5dias.pdf",
                            6: "https://link.to/pdf/definicao_muscular_endomorfo_6dias.pdf",
                            7: "https://link.to/pdf/definicao_muscular_endomorfo_7dias.pdf",
                          },
                          Mesomorfo: {
                            1: "https://link.to/pdf/definicao_muscular_mesomorfo_1dia.pdf",
                            2: "https://link.to/pdf/definicao_muscular_mesomorfo_2dias.pdf",
                            3: "https://link.to/pdf/definicao_muscular_mesomorfo_3dias.pdf",
                            4: "https://link.to/pdf/definicao_muscular_mesomorfo_4dias.pdf",
                            5: "https://link.to/pdf/definicao_muscular_mesomorfo_5dias.pdf",
                            6: "https://link.to/pdf/definicao_muscular_mesomorfo_6dias.pdf",
                            7: "https://link.to/pdf/definicao_muscular_mesomorfo_7dias.pdf",
                          }
                        },
                        "Melhorar Condicionamento Físico": {
                          Ectomorfo: {
                            1: "https://link.to/pdf/melhorar_condicionamento_ectomorfo_1dia.pdf",
                            2: "https://link.to/pdf/melhorar_condicionamento_ectomorfo_2dias.pdf",
                            3: "https://link.to/pdf/melhorar_condicionamento_ectomorfo_3dias.pdf",
                            4: "https://link.to/pdf/melhorar_condicionamento_ectomorfo_4dias.pdf",
                            5: "https://link.to/pdf/melhorar_condicionamento_ectomorfo_5dias.pdf",
                            6: "https://link.to/pdf/melhorar_condicionamento_ectomorfo_6dias.pdf",
                            7: "https://link.to/pdf/melhorar_condicionamento_ectomorfo_7dias.pdf",
                          },
                          Endomorfo: {
                            1: "https://link.to/pdf/melhorar_condicionamento_endomorfo_1dia.pdf",
                            2: "https://link.to/pdf/melhorar_condicionamento_endomorfo_2dias.pdf",
                            3: "https://link.to/pdf/melhorar_condicionamento_endomorfo_3dias.pdf",
                            4: "https://link.to/pdf/melhorar_condicionamento_endomorfo_4dias.pdf",
                            5: "https://link.to/pdf/melhorar_condicionamento_endomorfo_5dias.pdf",
                            6: "https://link.to/pdf/melhorar_condicionamento_endomorfo_6dias.pdf",
                            7: "https://link.to/pdf/melhorar_condicionamento_endomorfo_7dias.pdf",
                          },
                          Mesomorfo: {
                            1: "https://link.to/pdf/melhorar_condicionamento_mesomorfo_1dia.pdf",
                            2: "https://link.to/pdf/melhorar_condicionamento_mesomorfo_2dias.pdf",
                            3: "https://link.to/pdf/melhorar_condicionamento_mesomorfo_3dias.pdf",
                            4: "https://link.to/pdf/melhorar_condicionamento_mesomorfo_4dias.pdf",
                            5: "https://link.to/pdf/melhorar_condicionamento_mesomorfo_5dias.pdf",
                            6: "https://link.to/pdf/melhorar_condicionamento_mesomorfo_6dias.pdf",
                            7: "https://link.to/pdf/melhorar_condicionamento_mesomorfo_7dias.pdf",
                          }
                        }
                      };
                } else {
                    Alert.alert('Erro', 'Dados do usuário não encontrados.');
                }
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
                Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
            }
        };

        fetchUserData();
    }, [userId]);

    const webUrl = pdfLink || "https://drive.google.com/file/d/1c8Tyl9IvRW8NwkGZUhW1-cZ279fVgOuk/preview"; // Use the PDF link if available

    return (
        <View style={styles.container}>
            <Icon 
                name="arrow-back" 
                size={30} 
                color="#FFF" 
                style={styles.backIcon} 
                onPress={() => navigation.goBack()} 
            />

            <Text style={styles.text1}>Treino de hoje</Text>
            <Text style={styles.text2}>Personalizado para você</Text>

            {/* WebView */}
            <View style={styles.webViewContainer}>
                <WebView
                    source={{ uri: webUrl }}
                    style={styles.webView}
                />
            </View>

            <Text style={styles.textInfo}>Biotipo: {biotipo}</Text>
            <Text style={styles.textInfo}>Objetivo: {objetivo}</Text>

            <TouchableOpacity 
                style={styles.completeButton}
                onPress={() => navigation.goBack()}>
                <Text style={styles.completeText}>Concluir</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>Faltam X treinos para atingir o próximo nível</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#383538',
        padding: 20,
    },
    backIcon: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    text1: {
        color: '#AFD5AA',
        fontFamily: 'RussoOne_400Regular',
        fontSize: 45,
        textAlign: 'center',
        marginTop: 60,
    },
    text2: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'RussoOne_400Regular',
        textAlign: 'center',
        marginBottom: 20,
    },
    textInfo: {
        color: '#AFD5AA',
        fontSize: 16,
        fontFamily: 'RussoOne_400Regular',
        textAlign: 'center',
        marginVertical: 5,
    },
    webViewContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 8,
        overflow: 'hidden',
        marginVertical: 10,
    },
    webView: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    completeButton: {
        backgroundColor: '#AFD5AA',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
        width: '80%',
    },
    completeText: {
        color: '#383538',
        fontSize: 18,
        fontFamily: 'RussoOne_400Regular',
    },
    footerText: {
        color: '#AFD5AA',
        textAlign: 'center',
        marginTop: 10,
        fontFamily: 'RussoOne_400Regular',
    },
});
