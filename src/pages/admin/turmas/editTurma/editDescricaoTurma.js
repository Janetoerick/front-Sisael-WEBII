import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import styles from './styles'
import {ip} from '../../../../../infos'

import { Feather } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'

export default function EditDescricaoTurma({ navigation, route }) {


    const [descricao, setDescricao] = useState(route.params.turma.descricao)

    const [erro, setErro] = useState("")

    const saveTurma = async () => {
        if(descricao == "" || descricao == null){
            setErro("Preencha todos os campos!")
        }
        try {
            setErro("")
            const uri = ip + '/turma/' + route.params.turma.id
            const response = await fetch(uri, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + route.params.credentials.token
                },
                body: JSON.stringify({
                    id: route.params.turma.id,
                    descricao: descricao,
                    professor: route.params.turma.professor,
                    alunos: route.params.turma.alunos,
                })
            });
            const res = await response.json();
            if (res.error == null) {
                navigation.navigate("TurmasAdmin", {
                    credentials: route.params.credentials
                })
            } else {
                setErro(res.message)
            }

        } catch (erro) {
            console.error(erro)
        }
    }

    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.container}>
                <View style={styles.input}>
                    <View style={styles.inputView}>
                        <TextInput placeholder='Descrição' value={descricao} onChangeText={setDescricao} />
                    </View>
                </View>
                <Text style={styles.textErro}>{erro}</Text>
                <View style={styles.viewButtons}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            saveTurma()
                        }}
                    >
                        <Feather name="check" color="#fff" size={20} />
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>

    )
}