import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import styles from './styles'
import { ip } from '../../../../../../infos'

import { Feather } from '@expo/vector-icons'

export default function AddReservaSala({ navigation, navigation: {goBack}, route }) {

    const [salas, setSalas] = useState([])
    const [selectedSala, setSelectedSala] = useState("")

    const [erro, setErro] = useState("")

    useEffect(() => {
        findLocaisESalas()
    })

    const findLocaisESalas = async () => {
        try {
            const uri = ip + '/sala/local/' + route.params.local
            const response = await fetch(uri, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + route.params.credentials.token
                }
            });
            const res = await response.json();

            // console.log(res)
            let list = salas
            if (list.length == 0) {
                res.forEach(element => {
                    let temp = { key: element.id.toString(), value: element.nome }
                    list.push(temp)
                    setSalas(list)
                });
                list = salas
            }

        } catch (error) {
            console.error(error)
        }
    }

    const navigate = () => {
        //console.log(selectedSala)
        setErro("")
        if (selectedSala != "") {
            navigation.navigate("findDateTime", {
                credentials: route.params.credentials,
                turma: route.params.turma,
                sala: selectedSala
            })
        } else {
            setErro("Preencha a sala que deseja fazer uma reserva")
        }

    }

    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.container}>
                <SelectList data={salas}
                    setSelected={(val) =>
                        setSelectedSala(val)
                    }
                    placeholder="Selecione a sala"
                    maxHeight={150}
                    boxStyles={{ width: "70%" }}
                    inputStyles={{ width: "100%" }}
                />
                <Text style={styles.textErro}>{erro}</Text>
                <View style={styles.viewButtons}>
                    <TouchableOpacity style={styles.buttonBack}
                        onPress={() => goBack()}
                    >
                        <Feather name="chevron-left" color="#fff" size={20} />
                    </TouchableOpacity>
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