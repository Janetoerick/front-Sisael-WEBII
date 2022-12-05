import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'

import styles from './styles'
import {ip} from '../../../../infos'

export default function HomeAdmin({ navigation, route }) {

    const [hasSalas, setHasSalas] = useState()
    const [salas, setsalas] = useState([])
    const [loadingSalas, setLoadingSalas] = useState(true)

    useEffect(() => {
        list_salas()
    }, [route]);

    const list_salas = async () => {
        try {
            setLoadingSalas(true)
            const uri = ip + '/sala'
            const response = await fetch(uri, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + route.params.credentials.token,
                },
            });
            const salas = await response.json()
            if (salas[0] == null) {
                setHasSalas(false)
            } else {
                setsalas(salas)
                setHasSalas(true)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingSalas(false)
        }
    }

    function pageSala(sala) {
        navigation.navigate("pageSala", {
            credentials: route.params.credentials,
            sala: sala
        })
    }

    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.top}>
                <Text style={styles.labelTop}>SISAEL</Text>
            </View>
            <View style={styles.moduloReservasGrupal}>
                {
                    loadingSalas
                        ?
                        <ActivityIndicator />
                        :
                        !hasSalas
                            ?
                            <View style={styles.viewReservasGrupal}>
                                <View style={{ paddingTop: 20 }}>
                                    <Text style={styles.textNaoReserva}>Não há salas no sistema</Text>
                                </View>
                            </View>
                            :
                            <View style={styles.viewReservasGrupal}>
                                <Text style={styles.labelReserva}>Salas</Text>
                                <FlatList
                                    style={styles.listReservasGrupal}
                                    showsVerticalScrollIndicator={true}
                                    data={salas}
                                    renderItem={({ item }) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => { pageSala(item) }}
                                            >
                                                <View style={styles.viewListReservas}
                                                >
                                                    <View style={styles.view2ListReservas}>
                                                        <Text>{item.local} - {item.nome}</Text>
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
            <View style={styles.moduloReservas}>

                <TouchableOpacity style={styles.button}
                    disabled={false}
                    onPress={() => {
                        navigation.navigate("Adicionar sala", {
                                credentials: route.params.credentials,
                                sala: route.params.sala
                            })
                    }}
                >
                    <Text style={styles.buttonText}>Adicionar sala</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )

}