import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator, Modal } from 'react-native'

import { Feather } from '@expo/vector-icons'
import styles from './styles'
import { ip } from '../../../../../infos'

export default function PageSala({ navigation, route }) {

    const [hasEquipamentos, setHasEquipamentos] = useState()
    const [Equipamentos, setEquipamentos] = useState([])
    const [loadingEquipamentos, setLoadingEquipamentos] = useState(true)

    const [showModal, setShowModal] = useState(false)
    const [equipamentoDelete, setEquipamentoDelete] = useState(null)

    useEffect(() => {
        list_Equipamentos()
    }, [route]);

    const list_Equipamentos = async () => {
        try {
            setLoadingEquipamentos(true)
            const uri = ip + '/sala/' + route.params.sala.id
            const response = await fetch(uri, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + route.params.credentials.token,
                },
            });
            const sala = await response.json()
            if (sala.equipamentos[0] == null) {
                setHasEquipamentos(false)
            } else {
                setEquipamentos(sala.equipamentos)
                setHasEquipamentos(true)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingEquipamentos(false)
        }
    }

    const deleteEquipamento = async () => {
        try {
            const uri = ip + '/equipamento/' + equipamentoDelete
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
            list_Equipamentos()
        }
    }

    function viewModalDelete(equipamento) {
        setEquipamentoDelete(equipamento)
        setShowModal(!showModal)
    }


    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.subPage}>
                <View style={styles.top}>
                    <View style={styles.viewButtonTop}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("PrincipalAdmin", {
                                    credentials: route.params.credentials
                                })
                            }}
                        >
                            <Feather name="arrow-left" color="#000" size={24} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewLabelTop}>
                        <Text style={styles.labelTop}>{route.params.sala.local} - {route.params.sala.nome}</Text>
                    </View>
                </View>
                <View style={styles.moduloReservasGrupal}>
                    {
                        loadingEquipamentos
                            ?
                            <ActivityIndicator />
                            :
                            !hasEquipamentos
                                ?
                                <View style={styles.viewReservasGrupal}>
                                    <View style={{ paddingTop: 20 }}>
                                        <Text style={styles.textNaoReserva}>Não há Equipamentos na sala</Text>
                                    </View>
                                </View>
                                :
                                <View style={styles.viewReservasGrupal}>
                                    <Text style={styles.labelReserva}>Equipamentos</Text>
                                    <FlatList
                                        style={styles.listReservasGrupal}
                                        showsVerticalScrollIndicator={true}
                                        data={Equipamentos}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={styles.viewReservaTotal}>
                                                    <View style={styles.viewInfoReserva}>

                                                        <View style={styles.view2ListReservas}
                                                        >
                                                            <Text style={styles.textReservaGrupal}>
                                                                {"[ " + item.codigo + " ] - " + item.descricao}
                                                            </Text>
                                                        </View>

                                                    </View>
                                                    <View style={styles.viewButtonsReserva}>
                                                        <TouchableOpacity style={styles.buttonEditReserva}
                                                            onPress={() => {
                                                                navigation.navigate("Editar equipamento",
                                                                    {
                                                                        credentials: route.params.credentials,
                                                                        equipamento: item,
                                                                        sala: route.params.sala
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
                            navigation.navigate("Adicionar equipamento", {
                                credentials: route.params.credentials,
                                sala: route.params.sala
                            })
                        }}
                    >
                        <Text style={styles.buttonText}>Adicionar equipamento</Text>
                    </TouchableOpacity>

                </View>
            </View>

            <Modal
                transparent={true}
                visible={showModal}
            >
                <SafeAreaView style={styles.safeAreaModal}>
                    <View style={styles.viewModalDelete}>
                        <Text style={{ fontSize: 16, textAlign: "center" }}>
                            Tem certeza que deseja deletar o equipamento?
                        </Text>
                        <View style={styles.viewButtonDelete}>
                            <TouchableOpacity style={styles.buttonModalDelete}
                                onPress={() => { deleteEquipamento() }}
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