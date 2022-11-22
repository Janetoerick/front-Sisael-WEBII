import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Pressable, Keyboard } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import styles from "./styles"

export default function Login({ navigation }) {

    const [login, setLogin] = useState(null)
    const [senha, setSenha] = useState(null)
    const [erro, setErro] = useState(null)

    function authSystem() {
        if (login == null || senha == null || login == "" || senha == "") {
            setErro("Preencha os campos login e senha!");
        } else {
            setErro("");
        }
    }

    return (
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
                    onPress={() => {
                        authSystem()
                    }}>
                    <Text>Entrar</Text>
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
                        > Castastrar</Text>
                    </Text>
                </View>
        </Pressable >
    )
}