import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, RussoOne_400Regular } from "@expo-google-fonts/russo-one";
import Icon from 'react-native-vector-icons/Ionicons';

export default function Receitas() {
    const navigation = useNavigation();
    const [isAppReady, setIsAppReady] = useState(false);

    const [fontsLoaded] = useFonts({
        RussoOne_400Regular,
    });

    useEffect(() => {
        const prepare = async () => {
            try {
                await SplashScreen.preventAutoHideAsync();
                if (fontsLoaded) {
                    await SplashScreen.hideAsync();
                    setIsAppReady(true);
                }
            } catch (e) {
                console.warn(e);
            }
        };
        prepare();
    }, [fontsLoaded]);

    if (!isAppReady) {
        return null;
    }

    return (
        <View style={styles.container}>
            {/* Botão Voltar Tela */}
            <Icon 
                name="arrow-back" 
                size={30} 
                color="#FFF" 
                style={styles.backIcon} 
                onPress={() => navigation.goBack()} 
            />
            <View style={styles.conteudo}>
                {/* Título da Tela */}
                <View style={{ alignItems: 'baseline', justifyContent: 'center', flexDirection: 'row', paddingTop: 25 }}>
                    <Text style={styles.textNome}>Categorias</Text>
                </View>

                {/* Botões de navegação */}
                <TouchableOpacity onPress={ () => navigation.navigate('Doces') }>
                    <Text style={[styles.text, { paddingLeft: 80, paddingRight: 80 }]}>Doces</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.text, { paddingLeft: 40, paddingRight: 40 }]}>Salgados</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.text, { paddingLeft: 55, paddingRight: 55 }]}>Saladas</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.text, { paddingLeft: 70, paddingRight: 70 }]}>Pratos</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#AFD5AA',
    },
    text: {    
        fontSize: 50,
        marginTop: 55,
        backgroundColor: "#383538",
        color: "#FFFF",
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#218380',
        textAlign: 'center',
        fontFamily: 'RussoOne_400Regular',  // Aplica a fonte
    },
    textNome: { 
        color: "#383538",
        fontSize: 33,
        textAlign: 'center',
        alignItems: 'center',
        fontFamily: 'RussoOne_400Regular', // Aplica a fonte
    },
    conteudo: {
        marginTop: -80,
        alignItems: 'center'
    },
    backIcon: {
        position: 'absolute',
        top: 40,
        color: "#383538",
        left: 20,
    },
});
