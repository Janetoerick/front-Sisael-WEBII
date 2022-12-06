import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator, Modal } from 'react-native'

import { Feather } from '@expo/vector-icons'
import styles from './styles'
import { ip } from '../../../../infos'

export default function HomeAdmin({ navigation, route }) {

    const [hasSalas, setHasSalas] = useState()
    const [salas, setsalas] = useState([])
    const [loadingSalas, setLoadingSalas] = useState(true)

    const [showModal, setShowModal] = useState(false)
    const [salaDelete, setSalaDelete] = useState(null)

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

    const deleteSala = async () => {
        try {
            const uri = ip + '/sala/' + salaDelete
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
            viewModalDelete(null)
            list_salas()
        }
    }

    function viewModalDelete(sala) {
        setSalaDelete(sala)
        setShowModal(!showModal)
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
                                            <View style={styles.viewReservaTotal}>
                                                <View style={styles.viewInfoReserva}>
                                                    <TouchableOpacity
                                                        onPress={() => { pageSala(item) }}
                                                    >


                                                        <View style={styles.view2ListReservas}
                                                        >
                                                            <Text style={styles.textReservaGrupal}>
                                                                {item.local} - {item.nome}
                                                            </Text>

                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.viewButtonsReserva}>
                                                    <TouchableOpacity style={styles.buttonEditReserva}
                                                        onPress={() => {
                                                            navigation.navigate("Editar sala",
                                                                {
                                                                    credentials: route.params.credentials,
                                                                    sala: item
                                                                })
                                                        }}
                                                    >
                                                        <Feather name="edit-2" color="#fff" size={20} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={styles.buttonRemoveReserva}
                                                        onPress={() => { viewModalDelete(item.id) }}
                                                    >
                                                        <Feather name="trash-2" color="#fff" size={20} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>


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

            <Modal
                transparent={true}
                visible={showModal}
            >
                <SafeAreaView style={styles.safeAreaModal}>
                    <View style={styles.viewModalDelete}>
                        <Text style={{ fontSize: 16, textAlign: "center" }}>
                            Tem certeza que deseja deletar a sala?
                        </Text>
                        <View style={styles.viewButtonDelete}>
                            <TouchableOpacity style={styles.buttonModalDelete}
                                onPress={() => { deleteSala() }}
                            >
                                <Text style={{ color: "white" }}>Deletar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonModalDeleteFechar}
                                onPress={() => { viewModalDelete(null) }}
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