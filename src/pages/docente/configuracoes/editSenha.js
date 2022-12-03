import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import styles from './styles'

export default function EditSenhaDocente({ navigation, route }) {

    const [senhaAtual, setSenhaAtual] = useState(null)
    const [novaSenha, setNovaSenha] = useState(null)
    const [confirmarSenha, setConfirmarSenha] = useState(null)

    const [erro, setErro] = useState(null)

    const editSenha = async () => {

        console.log("login: " + route.params.credentials.login +
            "\nsenha_atual: " + senhaAtual +
            "\nnova_senha: " + novaSenha +
            "\nconfirmar_senha: " + confirmarSenha +
            "\ntypeUser: aluno")
        try {
            const uri = 'http://192.168.1.75:8080/configUser/password'
            const response = await fetch(uri, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + route.params.credentials.token,
                },
                body: JSON.stringify({
                    login: route.params.credentials.login,
                    senha_atual: senhaAtual,
                    nova_senha: novaSenha,
                    confirmar_senha: confirmarSenha,
                    typeUser: "aluno",
                })
            });

            console.log(response)

            // const res = await response.json()
            // console.log(res)
            // if(res == null){
            //     navigation.navigate("PrincipalConfig", {
            //         credentials: route.params.credentials
            //     })
            // } else {
            //     setErro(res.message)
            // }

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <SafeAreaView style={styles.pageEdit}>
            <View style={styles.moduloEditSenha}>
                <TextInput placeholder='Senha atual' style={styles.input} secureTextEntry={true}
                    onChangeText={setSenhaAtual} value={senhaAtual} />
                <TextInput placeholder='Nova senha' style={styles.input} secureTextEntry={true}
                    onChangeText={setNovaSenha} value={novaSenha} />
                <TextInput placeholder='Confirmar senha' style={styles.input} secureTextEntry={true}
                    onChangeText={setConfirmarSenha} value={confirmarSenha} />
                {/* onChangeText={setLogin} value={login}  */}
                <Text style={styles.textErro}>{erro}</Text>
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        editSenha()
                    }}
                >
                    <Text style={styles.buttonText}>Alterar senha</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}