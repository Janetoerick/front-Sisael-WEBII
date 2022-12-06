import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Pressable, Keyboard, SafeAreaView, ActivityIndicator } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import styles from "./styles"
import { ip } from '../../../infos'

export default function Login({ navigation }) {

    const [isLoading, setLoading] = useState(false)

    const [login, setLogin] = useState(null)
    const [senha, setSenha] = useState(null)
    const [erro, setErro] = useState(null)

    const authUser = async () => {
        try {
            setLoading(true)
            if (login == null || senha == null || login == "" || senha == "") {
                setErro("Preencha os campos login e senha!");
                return
            }
            const uri = ip + '/usuario/auth'
            const response = await fetch(uri, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: login,
                    senha: senha
                })
            });
            const credentials = await response.json();

            setSenha(null)
            if (response.status != 200) {
                setErro("Login ou senha inválido!")
            }
            if (credentials.error == null) {
                console.log("User Autenticado: " + credentials.login)
                setErro(null)
                setLogin(null)
                if (credentials.typeUser == "admin") {
                    navigation.navigate('Admin', {
                        login: credentials.login,
                        token: credentials.token,
                        typeUser: credentials.typeUser });
                } else if (credentials.typeUser == "aluno") {
                    navigation.navigate('Discente', {
                        login: credentials.login,
                        token: credentials.token,
                        typeUser: credentials.typeUser });
                } else if (credentials.typeUser == "professor") {
                    navigation.navigate('Docente', {
                        login: credentials.login,
                        token: credentials.token,
                        typeUser: credentials.typeUser });
                }

            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={styles.formContext}>
            { isLoading 
            ? <ActivityIndicator />
            :
            <Pressable
                style={styles.formContext}
                onPress={Keyboard.dismiss}
            >
                <View
                    style={styles.form}>
                    <Text style={styles.labelForm}>Sisael</Text>
                    <TextInput placeholder='Login' style={styles.input}
                        onChangeText={setLogin} value={login} />
                    <TextInput placeholder='Senha' style={styles.input}
                        secureTextEntry={true} onChangeText={setSenha} value={senha} />
                    <Text style={styles.textErro}>{erro}</Text>
                    <TouchableOpacity style={styles.buttonEntrar}
                        onPress={authUser}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewCadastro}>
                    <Text style={styles.textCadastro}>
                        Ainda não tem uma conta?
                        <Text style={styles.linkCadastro}
                            onPress={() => {
                                setErro("")
                                navigation.navigate('Cadastrar usuário')
                            }}
                        > Castastrar </Text>
                    </Text>
                </View>
            </Pressable >
            }
            
        </SafeAreaView>

    )
}