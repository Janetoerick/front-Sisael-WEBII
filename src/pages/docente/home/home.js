import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'

import styles from './styles'

import { Feather } from '@expo/vector-icons'

export default function HomeDocente({ route }) {

    const [loading, setLoading] = useState(true)
    const [reservasGrupais, setReservasGrupais] = useState(null)

    const Item = (props) => {
        return (

            <View>
                <Text>{props.id}</Text>
            </View>
        )
    }

    const list_reservas_grupal = async () => {
        try {
            const uri = 'http://192.168.1.68:8080/reservaGrupal/aluno/' + route.params.credentials.login
            const response = await fetch(uri, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + route.params.credentials.token,
                },
            });
            const reservas = await response.json()
            setReservasGrupais(reservas)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        list_reservas_grupal();

    }, []);



    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.top}>
                <Text style={styles.labelTop}>SISAEL</Text>
            </View>
            <View style={styles.moduloReservas}>
                <Text style={styles.labelAgendar}>Agende um equipamento</Text>
                <Text style={styles.textModulo}>Agende equipamentos em um laboratório de maneira rápida
                    e fácil.</Text>
                <TouchableOpacity style={styles.button}
                >
                    <Text style={styles.buttonText}>Agendar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.moduloVisualizar}>
                <View style={styles.textVisualizar}>
                    <Text style={styles.labelAgendar}>Visualize suas reservas</Text>
                    <Text>Edite ou delete reservas que você já cadastrou.</Text>
                </View>
                <View style={styles.viewButtonVisualizar}>
                    <TouchableOpacity style={styles.button}
                    >
                        <Feather name="chevron-right" color="#fff" size={26} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.moduloReservasGrupal}>
                {loading
                    ? <ActivityIndicator />
                    :
                    <View style={styles.viewReservasGrupal}>
                        <Text style={styles.labelReservaGrupal}>Reservas ativas de turmas</Text>
                        <FlatList
                            style={styles.listReservasGrupal}
                            showsVerticalScrollIndicator={false}
                            data={reservasGrupais}
                            renderItem={({ item }) => {
                                return (
                                    <Text style={styles.textReservaGrupal}>
                                        Data: {item.data} | horario: {item.horarioInicial} - {item.horarioFinal}
                                    </Text>


                                )
                            }}
                            keyExtractor={(item) => {
                                item.id
                            }}

                        />

                    </View>

                }
            </View>


        </SafeAreaView>

    )
}