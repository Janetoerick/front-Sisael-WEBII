import React, { useState } from 'react'
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import styles from './styles'


export default function EditEquipamento({ navigation, route }) {


    const [codigo, setCodigo] = useState(1)
    const [descricao, setDescricao] = useState(route.params.equipamento.descricao)
    const [erro, setErro] = useState(null)


    const attEquipamento = async () => {
        try {
            const uri = 'http://192.168.1.75:8080/equipamento/' + route.params.equipamento.id
            const response = await fetch(uri, {
                method: 'PUT',
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
                    sala: route.params.sala,
                })
            } else {
                setErro(res.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.container}>
                <View style={styles.input}>
                    <View style={styles.inputView}>
                        <Text style={styles.infoInput}>Código</Text>
                        <View style={styles.valueInput}>
                            <TextInput value={codigo} onChangeText={setCodigo} />
                        </View>

                    </View>
                </View>
                <View style={styles.input}>
                    <View style={styles.inputView}>
                        <Text style={styles.infoInput}>Descrição</Text>
                        <View style={styles.valueInput}>
                            <TextInput value={descricao} onChangeText={setDescricao} />
                        </View>
                    </View>
                </View>
                <Text style={styles.erroText}>{erro}</Text>
                <TouchableOpacity style={styles.button}
                    onPress={attEquipamento}
                >
                    <Text style={styles.buttonText}>Atualizar</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}