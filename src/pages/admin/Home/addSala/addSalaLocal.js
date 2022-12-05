import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import styles from './styles'
import {ip} from '../../../../../infos'

import { Feather } from '@expo/vector-icons'

export default function AddSalaLocal({ navigation, route }) {

    const [local, setLocal] = useState("")
    const [localSala, setLocalSala] = useState([])
    const [selectedLocal, setSelectedLocal] = useState("")
    const [localExiste, setLocalExiste] = useState(true)

    const [erro, setErro] = useState("")

    useEffect(() => {
        findLocaisESalas()
    })

    const findLocaisESalas = async () => {
        try {
            const uri = ip + '/sala/'
            const response = await fetch(uri, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + route.params.credentials.token
                }
            });
            const res = await response.json();

            let list = localSala
            let locais = []
            if (list.length == 0) {
                res.forEach(element => {
                    let temp = { key: element.local, value: element.local }
                    if (!(locais.includes(temp.value))) {
                        list.push(temp)
                        locais.push(temp.value)
                        setLocalSala(list)
                    }
                });
                list = localSala
            }

        } catch (error) {
            console.error(error)
        }
    }

    const navigate = () => {
        setErro("")
        if (selectedLocal != "" && localExiste) {
            navigation.navigate("findInfos", {
                credentials: route.params.credentials,
                local: selectedLocal
            })
        } else if (local != "" && !localExiste){
            navigation.navigate("findInfos", {
                credentials: route.params.credentials,
                local: local
            })
        } else {
            setErro("Preencha o local que deseja fazer uma reserva")
        }

    }

    const toogleSwitch = () => {
        setErro("")
        setLocalExiste(!localExiste)
    }

    return (
        <SafeAreaView style={styles.page}>


            {localExiste
                ?
                <View style={styles.container}>
                    <SelectList data={localSala}
                        setSelected={(val) =>
                            setSelectedLocal(val)
                        }
                        placeholder="Selecione o local"
                        maxHeight={150}
                        boxStyles={{ width: "70%" }}
                        inputStyles={{ width: "100%" }}
                    />
                    <Text style={styles.textErro}>{erro}</Text>

                    <View style={styles.modalPergunta}>
                        <Text>O local não está na lista?
                        </Text>
                        <TouchableOpacity
                            onPress={toogleSwitch}
                        >
                            <Text style={styles.notText}> Clique aqui</Text>
                        </TouchableOpacity>
                    </View>
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
                :
                <View style={styles.container}>
                    <View style={styles.input}>
                        <View style={styles.inputView}>
                            <TextInput placeholder='Local' value={local} onChangeText={setLocal}/>
                        </View>
                    </View>
                    <Text style={styles.textErro}>{erro}</Text>

                    <View style={styles.modalPergunta}>
                        <Text>Deseja voltar a lista de locais?
                        </Text>
                        <TouchableOpacity
                            onPress={toogleSwitch}
                        >
                            <Text style={styles.notText}> Clique aqui</Text>
                        </TouchableOpacity>
                    </View>

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
            }

        </SafeAreaView>

    )

}

