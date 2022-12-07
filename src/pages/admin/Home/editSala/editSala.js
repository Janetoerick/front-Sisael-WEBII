import React, { useState } from 'react'
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import styles from './styles'
import { ip } from '../../../../../infos'


export default function EditSala({ navigation, route }) {


    const [nome, setNome] = useState(route.params.sala.nome)
    const [andar, setAndar] = useState(route.params.sala.andar)
    const [descricao, setDescricao] = useState(route.params.sala.descricao)
    const [local, setLocal] = useState(route.params.sala.local)

    const [erro, setErro] = useState(null)


    const attSala = async () => {
        try {
            const uri = ip + '/sala/' + route.params.sala.id
            const response = await fetch(uri, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + route.params.credentials.token
                },
                body: JSON.stringify({
                    nome: nome,
                    andar: andar,
                    descricao: descricao,
                    local: local
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
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.container}>
                <View style={styles.input}>
                    <View style={styles.inputView}>
                        <Text style={styles.infoInput}>Nome</Text>
                        <View style={styles.valueInput}>
                            <TextInput value={nome} onChangeText={setNome} />
                        </View>

                    </View>
                </View>
                <View style={styles.input}>
                    <View style={styles.inputView}>
                        <Text style={styles.infoInput}>Andar</Text>
                        <View style={styles.valueInput}>
                            <TextInput value={andar.toString()} onChangeText={setAndar} />
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
                <View style={styles.input}>
                    <View style={styles.inputView}>
                        <Text style={styles.infoInputDisable}>Local</Text>
                        <View style={styles.valueInput}>
                            <Text style={styles.valueInputDisable}>{local}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.erroText}>{erro}</Text>
                <TouchableOpacity style={styles.button}
                    onPress={attSala}
                >
                    <Text style={styles.buttonText}>Atualizar</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}