import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import styles from './styles'
import {ip} from '../../../../../infos'

import { Feather } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'

export default function AddSalaInfos({ navigation, navigation: {goBack}, route }) {

    const [nome, setNome] = useState(null)
    const [andar, setAndar] = useState(null)
    const [descricao, setDescricao] = useState(null)

    const [erro, setErro] = useState("")

    const saveSala = async () => {
        if (nome == null || andar == null ||
            descricao == null) {
            setErro("Preencha todos os campos")
        } else {
            try {
                setErro("")
                const uri = ip + '/sala/'
                const response = await fetch(uri, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + route.params.credentials.token
                    },
                    body: JSON.stringify({
                        nome: nome,
                        local: route.params.local,
                        andar: andar,
                        descricao: descricao,
                    })
                });
                const res = await response.json();
                if (res.error == null) {
                    navigation.navigate("PrincipalAdmin", {
                        credentials: route.params.credentials
                    })
                } else {
                    setErro(res.message)
                }

            } catch (erro) {
                console.error(erro)
            }
        }
    }

    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.container}>
                <View style={styles.input}>
                    <View style={styles.inputView}>
                        <TextInput placeholder='Nome' value={nome} onChangeText={setNome} />
                    </View>
                </View>
                <View style={styles.input}>
                    <View style={styles.inputView}>
                        <TextInput placeholder='Andar' value={andar} onChangeText={setAndar} />
                    </View>
                </View>
                <View style={styles.inputDescricao}>
                    <View style={styles.inputView}>
                        <TextInput placeholder='Descrição' value={descricao} onChangeText={setDescricao}
                            multiline={true} />
                    </View>
                </View>
                <Text style={styles.textErro}>{erro}</Text>
                <View style={styles.viewButtons}>
                    <TouchableOpacity style={styles.buttonBack}
                        onPress={() => {
                            goBack()
                        }}
                    >
                        <Feather name="chevron-left" color="#fff" size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            saveSala()
                        }}
                    >
                        <Feather name="check" color="#fff" size={20} />
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>

    )
}