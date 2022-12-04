import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator, Modal, Button } from 'react-native'

import styles from './styles'

import { Feather } from '@expo/vector-icons'

//'8', '2022-12-20', '05:00:00', '01:00:00', '11'

export default function HomeDocente({ navigation, route }) {

    const [hasTurmas, setHasTurmas] = useState()
    const [turmas, setTurmas] = useState([])
    const [loadingTurmas, setLoadingTurmas] = useState(true)

    useEffect(() =>{
        list_turmas()
    }, [route]);

    const list_turmas = async () => {
        try {
            setLoadingTurmas(true)
            const uri = 'http://192.168.1.75:8080/turma/professor/' + route.params.credentials.login
            const response = await fetch(uri, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + route.params.credentials.token,
                },
            });
            const turmas = await response.json()
            if (turmas[0] == null) {
                setHasTurmas(false)
            } else {
                setTurmas(turmas)
                setHasTurmas(true)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingTurmas(false)
        }
    }

    function pageTurma(turma){
        navigation.navigate("TurmaDocente", {
            credentials: route.params.credentials,
            turma: turma
        })
    }

    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.top}>
                <Text style={styles.labelTop}>SISAEL</Text>
            </View>
            <View style={styles.moduloReservasGrupal}>
                {
                    loadingTurmas
                    ?
                     <ActivityIndicator />
                    :
                    !hasTurmas
                        ?
                        <View style={styles.viewReservasGrupal}>
                            <Text style={styles.labelReserva}>Turmas</Text>
                            <View style={{ paddingTop: 20 }}>
                                <Text style={styles.textNaoReserva}>Você não está registrado em nenhuma turma no momento</Text>
                            </View>
                        </View>
                        :
                        <View style={styles.viewReservasGrupal}>
                            <Text style={styles.labelReserva}>Turmas</Text>
                            <FlatList
                                style={styles.listReservasGrupal}
                                showsVerticalScrollIndicator={true}
                                data={turmas}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => { pageTurma(item) }}
                                        >
                                            <View style={styles.viewListReservas}
                                            >
                                                <View style={styles.view2ListReservas}>
                                                    <Text>{item.descricao}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                    )
                                }}
                                key={(item) => {
                                    return (item.id)
                                }}

                            />

                        </View>

                }
            </View>
        </SafeAreaView>
    )

}