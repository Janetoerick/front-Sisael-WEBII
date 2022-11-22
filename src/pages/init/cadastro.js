import React from 'react'
import { View, Text, Pressable, TextInput, Keyboard, TouchableOpacity } from 'react-native'
import styles from './styles'

export default function Cadastro(){
    return(
        <Pressable
            style={styles.formContextCadastro}
            onPress={Keyboard.dismiss}
        >
            <View
            style={styles.form}>
                <View>
                    <TextInput placeholder='Login' style={styles.input}/>
                    <TextInput placeholder='Email' style={styles.input}/>
                    <TextInput secureTextEntry={true} placeholder='Senha' style={styles.input}/>
                    <TextInput secureTextEntry={true} placeholder='Confirmar senha' style={styles.input}/>
                    <Text></Text>
                    <TouchableOpacity style={styles.buttonEntrar}>
                        <Text>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Pressable >
    )
}