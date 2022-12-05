import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator, Modal, Button } from 'react-native'


import { Feather } from '@expo/vector-icons'
import styles from './style'

export default function TurmaDocente({ navigation, route }) {

    const [loadingReserva, setLoadingReserva] = useState(true)
    const [hasReserva, setHasReserva] = useState(false)
    const [reserva, setReserva] = useState(false)
    
    const [reservaDelete, setReservaDelete] = useState(null)
    const [modalDelete, setModalDelete] = useState(false)

    useEffect(() => {
        reserva_turma()
    }, [route])

    function refatorarData(data) {
        let r = ""
        r = data.slice(8, 10)
        r += "/"
        r += data.slice(5, 7)
        r += "/"
        r += data.slice(0, 4)
        r += " "
        return r
    }

    const reserva_turma = async () => {
        try {
            const uri = 'http://192.168.1.75:8080/reservaGrupal/turma/' + route.params.turma.id
            const response = await fetch(uri, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + route.params.credentials.token,
                },
            });
            const reserva = await response.json()
            if (reserva[0] == null) {
                setHasReserva(false)
            } else {
                setReserva(reserva)
                setHasReserva(true)
            }


        } catch (error) {
            console.error(error)
        } finally {
            setLoadingReserva(false)
        }
    }

    const deleteReserva = async () => {
        try {
            const uri = 'http://192.168.1.75:8080/reservaGrupal/' + reserva[0].id
            const response = await fetch(uri, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + route.params.credentials.token,
                },
            });

        } catch (error) {
            console.error(error)
        } finally {
            viewModalDelete()
            reserva_turma()
        }
    }

    function viewModalDelete(){
        console.log(reserva[0].id)
        setModalDelete(!modalDelete)
    }

    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.top}>
                <View style={styles.viewButtonTop}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("PrincipalDocente", {
                                credentials: route.params.credentials
                            })
                        }}
                    >
                        <Feather name="arrow-left" color="#000" size={24} />
                    </TouchableOpacity>
                </View>
                <View style={styles.viewLabelTop}>
                    <Text style={styles.labelTop}>{route.params.turma.descricao}</Text>
                </View>
            </View>
            <View style={styles.moduloReservas}>
                <Text style={styles.labelAgendar}>Reservar uma sala</Text>
                <Text style={styles.textModulo}>Reserve uma sala de maneira rápida
                    e fácil para esta turma.</Text>
                    {!hasReserva
                    ?
                    <TouchableOpacity style={styles.button}
                    disabled={false}
                        onPress={() => {
                            navigation.navigate("Adicionar reserva",
                                {
                                    credentials: route.params.credentials,
                                    turma: route.params.turma
                                })
                        }}
                    >
                        <Text style={styles.buttonText}>Reservar</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.button}
                    disabled={true}
                    >
                        <Text style={styles.buttonTextDisable}>Reservar</Text>
                    </TouchableOpacity>
                }
            </View>
            <View style={styles.moduloVisualizar}>
                <View style={styles.textVisualizar}>
                    <Text style={styles.labelReserva}>Reserva ativa da turma</Text>
                </View>
                <View style={styles.viewVisualizarReserva}>
                    {loadingReserva
                        ? <ActivityIndicator />
                        : !hasReserva
                            ? <View>
                                <Text style={styles.textNaoReserva}>Não há reserva de sala marcada nesta turma</Text>
                            </View>
                            : <View style={styles.viewReservaTotal}>
                                <View style={styles.viewInfoReserva}>
                                    <View style={styles.tabelaModal}>
                                        <View style={styles.tabelaEsqModal}>
                                            <Text style={styles.textModal}>Data</Text>
                                            <Text style={styles.textModal}>Horario inicial</Text>
                                            <Text style={styles.textModal}>Horario final</Text>
                                            <Text style={styles.textModal}>Nome da sala</Text>
                                            <Text style={styles.textModal}>Local da sala</Text>
                                            <Text style={styles.textModal}>Andar da sala</Text>
                                        </View>
                                        <View style={styles.tabelaDirModal}>
                                            <Text style={styles.infoModal}>
                                                {refatorarData(reserva[0].data)}
                                                </Text>
                                            <Text style={styles.infoModal}>
                                                {reserva[0].horarioInicial.slice(0, 5)}
                                                </Text>
                                            <Text style={styles.infoModal}>
                                                {reserva[0].horarioFinal.slice(0, 5)}
                                                </Text>
                                            <Text style={styles.infoModal}>
                                                {reserva[0].sala.nome}</Text>
                                            <Text style={styles.infoModal}>{reserva[0].sala.local}
                                            </Text>
                                            <Text style={styles.infoModal}>
                                                {reserva[0].sala.andar.toString()}
                                                </Text>
                                        </View>
                                    </View>

                                </View>
                                <View style={styles.viewButtonsReserva}>
                                    <TouchableOpacity style={styles.buttonEditReserva}
                                        onPress={() => {
                                            navigation.navigate("Editar reserva",
                                                {
                                                    credentials: route.params.credentials,
                                                    reserva: reserva[0]
                                                })
                                        }}
                                    >
                                        <Feather name="edit-2" color="#fff" size={20} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonRemoveReserva}
                                        onPress={() => { viewModalDelete() }}
                                    >
                                        <Feather name="trash-2" color="#fff" size={20} />
                                    </TouchableOpacity>
                                </View>
                            </View>}
                </View>
            </View>
            <Modal
                transparent={true}
                visible={modalDelete}
            >
                <SafeAreaView style={styles.safeAreaModal}>
                    
                        <View style={styles.viewModalDelete}>
                            <Text style={{ fontSize: 16, textAlign: "center" }}>
                                Tem certeza que deseja deletar a reserva?
                            </Text>
                            <View style={styles.viewButtonDelete}>
                                <TouchableOpacity style={styles.buttonModalDelete}
                                    onPress={() => { deleteReserva() }}
                                >
                                    <Text style={{ color: "white" }}>Deletar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonModalDeleteFechar}
                                    onPress={() => { viewModalDelete() }}
                                >
                                    <Text style={{ color: "white" }}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                </SafeAreaView>
            </Modal >
        </SafeAreaView>
    )

}