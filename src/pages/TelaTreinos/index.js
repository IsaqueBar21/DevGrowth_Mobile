import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../connections/firebaseConnection'; // Ajuste o caminho se necessário

export default function Treinos() {
    const navigation = useNavigation();
    const [biotipo, setBiotipo] = useState(null);
    const [objetivo, setObjetivo] = useState(null);
    const [disponibilidade, setDisponibilidade] = useState(null);
    const [webUrl, setWebUrl] = useState(null);
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
                console.log('Dados do usuário:', userData); // Log dos dados retornados
                setBiotipo(userData.biotype || null);
                setObjetivo(userData.objetivos ? userData.objetivos[0] : null);
                setDisponibilidade(userData.disponibilidade || null);
            } else {
                console.error('Documento não encontrado para o userId:', userId);
                Alert.alert('Erro', 'Dados do usuário não encontrados.');
            }
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
            Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
        }
    };
    

        fetchUserData();
    }, [userId]);

    useEffect(() => {
        if (objetivo && biotipo && disponibilidade !== null) {
            const disponibilidadeNumber = Number(disponibilidade); // Garante que a disponibilidade é um número
           const pdfLinks = {
            "Ganhar Peso (Massa Muscular)": {
              Ectomorfo: {
                1: "https://drive.google.com/file/d/1WkKHgBk-Ucyyip_n56uPMk1cHFCUdlTD/preview",
                2: "https://drive.google.com/file/d/1M0kk009fEdMJZJyHu8bfCTiVGSjaDCia/preview",
                3: "https://drive.google.com/file/d/1AMFlCwuJDuo9AX4H_Vlg5m1ZVgNb7CZd/preview",
                4: "https://drive.google.com/file/d/1ahHK3fCZ7QIVOxubQHujibmFJhVXumHw/preview",
                5: "https://drive.google.com/file/d/1O1ZWWigIwFWsSQY58czq9uXHAFt0HZP0/preview",
                6: "https://drive.google.com/file/d/1KA_B-9G6wyow6cuTLXDvokRxLtkDsCc1/preview",
                7: "https://drive.google.com/file/d/1HBSHeT_Yd9lX9BTrh8FFP4WcPY6CWfh6/preview",
              },
              Endomorfo: {
                1: "https://drive.google.com/file/d/1BU8JIkkbQy69uKl1v72cfqlHXgPSBBHX/preview",
                2: "https://drive.google.com/file/d/1m1TRRwCQJd3W3GS0OatvgyA2jjkgxwaz/preview",
                3: "https://drive.google.com/file/d/1H9JyeVmCp8MYMvfaAKYCVS1pUAmvR3lV/preview",
                4: "https://drive.google.com/file/d/1Ir_F-gkSkOti6EDqQkNQK4KU_Bd3rtgr/preview",
                5: "https://drive.google.com/file/d/1bhSoW-nwzXIWc30Wc6yW8hY6Wr7dmunq/preview",
                6: "https://drive.google.com/file/d/1wXQKorbWevQ88XIHs9HzanouIQ3lw045/preview",
                7: "https://drive.google.com/file/d/1yT34YjJPIEpuLAvDSnsjDhLefOk0Q_5H/preview ",
              },
             "Mesomorfo": {
                1: "https://drive.google.com/file/d/1yeHW5YYTX85CSJUJoInXMvJDvNoXHUA-/preview",
                2: "https://drive.google.com/file/d/1s19-3GvRCCReAeoFMzqnHqSROaLq_QEJ/preview",
                3: "https://drive.google.com/file/d/1gUIV3ZrnDZGMEGfeSmX3aN3z_SfOZyvn/preview",
                4: "https://drive.google.com/file/d/1nY4kzYT2-Wdko8Gj5iu1mOAiLNz_Jivb/preview",
                5: "https://drive.google.com/file/d/1mMZQsOiYt9YWR4q_KR4wdcrSwrDLZcKA/preview",
                6: "https://drive.google.com/file/d/1U8pHmAkk3PZYZ2N_ELpY9gvEm1QnfjET/preview",
                7: "https://drive.google.com/file/d/1V7WrzkhA1-WQVBXSpVDD13rgiGq5GxZ-/preview",
              }
            },
            "Perder Peso": {
              Ectomorfo: {
                1: "https://drive.google.com/file/d/1uwVcWKvHtBAU61YPUWhS8USeLMNhHY_e/preview",
                2: "https://drive.google.com/file/d/1YbpEAvlpxI4MTtm5KSoV_TSy0G3_SFQQ/preview",
                3: "https://drive.google.com/file/d/11mb3yBdh7aZwfiYjo0Dg_SwrrOG1_KJP/preview",
                4: "https://drive.google.com/file/d/1CZvP6cN87r81OHQcpLHSGoE-ruiwhYgQ/preview",
                5: "https://drive.google.com/file/d/1EQVi1AcP4dqIDwqLMYq76dX2KkQAS-n9/preview",
                6: "https://drive.google.com/file/d/13maldPsyFBaCNuiGS5QhyPGCpx62hjla/preview",
                7: "https://drive.google.com/file/d/1V2c_ZSFlX5Qc5RFkNr9FlhXRCRZ2c9dB/preview",
              },
              Endomorfo: {
                1: "https://drive.google.com/file/d/1bvHjuL5YkKZ1iq91jXijgriMsVKRsYTj/preview",
                2: "https://drive.google.com/file/d/1lMoxMwMefwWxooO--1wcidhtWARMynwN/preview",
                3: "https://drive.google.com/file/d/1Ly1oDKJYkigYuJ-RjikXAKU0Xw8nReRE/preview",
                4: "https://drive.google.com/file/d/1SCvv3l-oB_FN2ZaA5xnCsVHJGUMuLJER/preview",
                5: "https://drive.google.com/file/d/1l_UVAevVt2AHkwA7NVCcNZJX1AmqSAVK/preview",
                6: "https://drive.google.com/file/d/1M7eO9M-psUJw65XVavkiZDVQUctORuc6/preview",
                7: "https://drive.google.com/file/d/1uP8EZASvu_2vlglHfkZXyPa0g3uecUqj/preview",
              },
             "Mesomorfo": {
                1: "https://drive.google.com/file/d/1yeHW5YYTX85CSJUJoInXMvJDvNoXHUA-/preview",
                2: "https://drive.google.com/file/d/1s19-3GvRCCReAeoFMzqnHqSROaLq_QEJ/preview",
                3: "https://drive.google.com/file/d/1gUIV3ZrnDZGMEGfeSmX3aN3z_SfOZyvn/preview",
                4: "https://drive.google.com/file/d/1nY4kzYT2-Wdko8Gj5iu1mOAiLNz_Jivb/preview",
                5: "https://drive.google.com/file/d/1mMZQsOiYt9YWR4q_KR4wdcrSwrDLZcKA/preview",
                6: "https://drive.google.com/file/d/1U8pHmAkk3PZYZ2N_ELpY9gvEm1QnfjET/preview",
                7: "https://drive.google.com/file/d/1V7WrzkhA1-WQVBXSpVDD13rgiGq5GxZ-/preview",
              }
            },
            "Definição Muscular": {
              Ectomorfo: {
                1: "https://drive.google.com/file/d/1hnhLlOARyEJxB6eLDLvWAVCur_fNcJM8/preview",
                2: "https://drive.google.com/file/d/1JH96JswloKnT4PriQ0JJcv0b0QNx6QTk/preview",
                3: "https://drive.google.com/file/d/1n7nJXHXfkO9sq2yJd_EzYhAYm2bqJlIY/preview",
                4: "https://drive.google.com/file/d/1sL97YzkWQ2L6JNJ0PgYLeyq2vhCJdbwd/preview",
                5: "https://drive.google.com/file/d/1Z3aVfsPdjTPvh7Llhy8ji6aXzhkAu34c/preview",
                6: "https://drive.google.com/file/d/1zhsfHXGYvF1pH2eS5doO5OsfTOyWV6Lc/preview",
                7: "https://drive.google.com/file/d/16fqlCzss5u3wM8e2c9a1nHUdYAkygUW-/preview",
              },
              Endomorfo: {
                1: "https://drive.google.com/file/d/1bvHjuL5YkKZ1iq91jXijgriMsVKRsYTj/preview",
                2: "https://drive.google.com/file/d/1lMoxMwMefwWxooO--1wcidhtWARMynwN/preview",
                3: "https://drive.google.com/file/d/1Ly1oDKJYkigYuJ-RjikXAKU0Xw8nReRE/preview",
                4: "https://drive.google.com/file/d/1SCvv3l-oB_FN2ZaA5xnCsVHJGUMuLJER/preview",
                5: "https://drive.google.com/file/d/1l_UVAevVt2AHkwA7NVCcNZJX1AmqSAVK/preview",
                6: "https://drive.google.com/file/d/1M7eO9M-psUJw65XVavkiZDVQUctORuc6/preview",
                7: "https://drive.google.com/file/d/1uP8EZASvu_2vlglHfkZXyPa0g3uecUqj/preview",
              },
             "Mesomorfo": {
                1: "https://drive.google.com/file/d/1yeHW5YYTX85CSJUJoInXMvJDvNoXHUA-/preview",
                2: "https://drive.google.com/file/d/1s19-3GvRCCReAeoFMzqnHqSROaLq_QEJ/preview",
                3: "https://drive.google.com/file/d/1gUIV3ZrnDZGMEGfeSmX3aN3z_SfOZyvn/preview",
                4: "https://drive.google.com/file/d/1nY4kzYT2-Wdko8Gj5iu1mOAiLNz_Jivb/preview",
                5: "https://drive.google.com/file/d/1mMZQsOiYt9YWR4q_KR4wdcrSwrDLZcKA/preview",
                6: "https://drive.google.com/file/d/1U8pHmAkk3PZYZ2N_ELpY9gvEm1QnfjET/preview",
                7: "https://drive.google.com/file/d/1V7WrzkhA1-WQVBXSpVDD13rgiGq5GxZ-/preview",
              }
            },
            "Melhorar Condicionamento Físico": {
              Ectomorfo: {
                1: "https://drive.google.com/file/d/1ViAbhFLBe9I60IGDB8Hl2YeGzZmNKCjn/preview",
                2: "https://drive.google.com/file/d/1GxnRFQ0sAKTpOlUdPHC1wuEx8FP4Sqqo/preview",
                3: "https://drive.google.com/file/d/143dRQEvA8Z7IiyGf10Ijwoni2ZygOl4L/preview",
                4: "https://drive.google.com/file/d/1uWnpodR9REQjTpSXyM6TJLpBtBiv9sMO/preview",
                5: "https://drive.google.com/file/d/1Tbc7kppOcjUOeH_K_Mwko9e3cnbqw-x2/preview",
                6: "https://drive.google.com/file/d/1hdqmzyVgBJx7lo5CGOphjckhYLXMLI_e/preview",
                7: "https://drive.google.com/file/d/1vk2JK1y4w6bwqTpmmSaHsLD5watYVn9e/preview",
              },
              Endomorfo: {
                 1: "https://drive.google.com/file/d/1BU8JIkkbQy69uKl1v72cfqlHXgPSBBHX/preview",
                2: "https://drive.google.com/file/d/1m1TRRwCQJd3W3GS0OatvgyA2jjkgxwaz/preview",
                3: "https://drive.google.com/file/d/1H9JyeVmCp8MYMvfaAKYCVS1pUAmvR3lV/preview",
                4: "https://drive.google.com/file/d/1Ir_F-gkSkOti6EDqQkNQK4KU_Bd3rtgr/preview",
                5: "https://drive.google.com/file/d/1bhSoW-nwzXIWc30Wc6yW8hY6Wr7dmunq/preview",
                6: "https://drive.google.com/file/d/1wXQKorbWevQ88XIHs9HzanouIQ3lw045/preview",
                7: "https://drive.google.com/file/d/1yT34YjJPIEpuLAvDSnsjDhLefOk0Q_5H/preview ",
              },
             "Mesomorfo": {
                1: "https://drive.google.com/file/d/1yeHW5YYTX85CSJUJoInXMvJDvNoXHUA-/preview",
                2: "https://drive.google.com/file/d/1s19-3GvRCCReAeoFMzqnHqSROaLq_QEJ/preview",
                3: "https://drive.google.com/file/d/1gUIV3ZrnDZGMEGfeSmX3aN3z_SfOZyvn/preview",
                4: "https://drive.google.com/file/d/1nY4kzYT2-Wdko8Gj5iu1mOAiLNz_Jivb/preview",
                5: "https://drive.google.com/file/d/1mMZQsOiYt9YWR4q_KR4wdcrSwrDLZcKA/preview",
                6: "https://drive.google.com/file/d/1U8pHmAkk3PZYZ2N_ELpY9gvEm1QnfjET/preview",
                7: "https://drive.google.com/file/d/1V7WrzkhA1-WQVBXSpVDD13rgiGq5GxZ-/preview",
              }
            }
          };

          console.log('UserId:', userId);
          console.log('Objetivo:', objetivo);
          console.log('Biotipo:', biotipo);
          console.log('Disponibilidade:', disponibilidade);
          

          if (
            pdfLinks[objetivo] &&
            pdfLinks[objetivo][biotipo] &&
            pdfLinks[objetivo][biotipo][disponibilidadeNumber]
        ) {
            const link = pdfLinks[objetivo][biotipo][disponibilidadeNumber];
            setWebUrl(link);
        } else {
            Alert.alert(
                'Erro',
                `Não foi possível determinar o link para o treino. Verifique os valores: 
                Objetivo: ${objetivo}, Biotipo: ${biotipo}, Disponibilidade: ${disponibilidadeNumber}`
            );
        }
        
        }
    }, [objetivo, biotipo, disponibilidade]);

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
            {webUrl ? (
                <View style={styles.webViewContainer}>
                    <WebView
                        source={{ uri: webUrl }}
                        style={styles.webView}
                    />
                </View>
            ) : (
                <Text style={styles.textInfo}>Carregando treino...</Text>
            )}

            <Text style={styles.textInfo}>Biotipo: {biotipo}</Text> 

            <TouchableOpacity 
                style={styles.completeButton}
                onPress={() => navigation.goBack()} >
                <Text style={styles.completeText}>Concluir</Text>
            </TouchableOpacity>
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
});
