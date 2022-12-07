import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import styles from './styles'
import {ip} from '../../../../../infos'

import { Feather } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'

export default function AddTurmaInfo({ navigation, route }) {


    const [descricao, setDescricao] = useState(null)

    const [erro, setErro] = useState("")

    function navigate(){
        if(descricao == null){
            setErro("Preencha todos os campos!")
        } else {
            setErro(null)
            navigation.navigate("findDocente",{
                credentials: route.params.credentials,
                descricao: descricao
            })
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
                            navigate()
                        }}
                    >
                        <Feather name="chevron-right" color="#fff" size={20} />
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>

    )
}