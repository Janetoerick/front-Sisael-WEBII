import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import styles from './styles'
import { ip } from '../../../../../../infos'

import { Feather } from '@expo/vector-icons'

export default function AddReservaLocal({ navigation, route }) {

    // return (
    //     <View>
    //         <Text>123</Text>
    //     </View>
    // )
    const [local, setLocal] = useState()
    const [localSala, setLocalSala] = useState([])
    const [selectedLocal, setSelectedLocal] = useState("")

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
        //console.log(selectedLocal)
        setErro("")
        if (selectedLocal != "") {
            navigation.navigate("findSalaReservaDocente", {
                credentials: route.params.credentials,
                turma: route.params.turma,
                local: selectedLocal
            })
        } else {
            setErro("Preencha o local que deseja fazer uma reserva")
        }

    }

    return (
        <SafeAreaView style={styles.page}>
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

