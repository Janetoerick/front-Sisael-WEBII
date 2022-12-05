import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import styles from './styles'
import { ip } from '../../../../../../infos'

import { Feather } from '@expo/vector-icons'

export default function AddEquipamento({ navigation, route }) {

    const [codigo, setCodigo] = useState(null)
    const [descricao, setDescricao] = useState(null)
    
    const [erro, setErro] = useState("")

    const saveEquipamento = async () => {
        if (codigo == null || descricao == null) {
            setErro("Preencha todos os campos")
        } else {
            try {
                setErro("")
                const uri = ip + '/equipamento/'
                const response = await fetch(uri, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + route.params.credentials.token
                    },
                    body: JSON.stringify({
                        codigo: codigo,
                        descricao: descricao,
                        sala: route.params.sala.id
                    })
                });
                const res = await response.json();
                if (res.error == null) {
                    navigation.navigate("pageSala", {
                        credentials: route.params.credentials,
                        sala: route.params.sala
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
                        <TextInput placeholder='Código' value={codigo} onChangeText={setCodigo} />
                    </View>
                </View>
                <View style={styles.input}>
                    <View style={styles.inputView}>
                        <TextInput placeholder='Descrição' value={descricao} onChangeText={setDescricao} />
                    </View>
                </View>
                <Text style={styles.textErro}>{erro}</Text>

                <View style={styles.viewButtons}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            saveEquipamento()
                        }}
                    >
                        <Feather name="check" color="#fff" size={20} />
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>

    )

}

