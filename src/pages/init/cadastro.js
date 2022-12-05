import React, { useState } from 'react'
import { View, Text, Pressable, TextInput, Keyboard, TouchableOpacity } from 'react-native'
import styles from './styles'
import { ip } from '../../../infos'

export default function Cadastro({ navigation }){

    const [login, setLogin] = useState(null)
    const [email, setEmail] = useState(null)
    const [senha, setSenha] = useState(null)
    const [confirmarSenha, setConfirmarSenha] = useState(null)
    const [erro, setErro] = useState(null)

    const cadastroUser = async () => {
        try{
            if(login == null || login == "" || email == null || email == "" ||
            senha == null || senha == "" || confirmarSenha == null || confirmarSenha == ""){
               setErro("Preencha todos os campos!")
               return
           }
    
           if(senha != confirmarSenha){
               setErro("Senhas diferentes!")
               return
           }

            const uri = ip + '/usuario'
            const response = await fetch(uri, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: login,
                    senha: senha,
                    email: email,
                    role: 2
                })
            });
            const credentials = await response.json();
            setErro(null)
            if(credentials.error == null){
                navigation.navigate('Login', { login: credentials.login });
            } else {
                setErro(credentials.message)
            } 
        } catch (error) {
            console.error(error)
        }
        
    }

    return(
        <Pressable
            style={styles.formContextCadastro}
            onPress={Keyboard.dismiss}
        >
            <View
            style={styles.formCadastro}>
                    <TextInput placeholder='Login' style={styles.input}
                    onChangeText={setLogin} value={login}/>
                    <TextInput placeholder='Email' style={styles.input}
                    onChangeText={setEmail} value={email}/>
                    <TextInput secureTextEntry={true} placeholder='Senha' style={styles.input}
                    onChangeText={setSenha} value={senha}/>
                    <TextInput secureTextEntry={true} placeholder='Confirmar senha' style={styles.input}
                    onChangeText={setConfirmarSenha} value={confirmarSenha}/>
                    <Text style={styles.textErro}>{erro}</Text>
                    <TouchableOpacity style={styles.buttonEntrar}
                    onPress={cadastroUser}
                    >
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableOpacity>
            </View>

        </Pressable >
    )
}