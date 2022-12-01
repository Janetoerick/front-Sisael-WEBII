import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator, Modal, Button } from 'react-native'

import styles from './styles'

import { Feather } from '@expo/vector-icons'

//'8', '2022-12-20', '05:00:00', '01:00:00', '11'

export default function HomeDocente({ navigation, route }) {


    const [loadingIndividual, setLoadingIndividual] = useState(true)
    const [loadingGrupal, setLoadingGrupal] = useState(true)
    const [reservaIndividual, setReservaIndividual] = useState({})
    const [reservasGrupais, setReservasGrupais] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [modalIndividual, setModalIndividual] = useState(null)
    const [modalDelete, setModalDelete] = useState(false)

    const [qntReservaIndividial, setQntReservaIndividial] = useState(false)
    const [qntReservaGrupal, setQntReservaGrupal] = useState(false)


    const [data, setData] = useState(null)
    const [horaI, setHoraI] = useState(null)
    const [horaF, setHoraF] = useState(null)
    const [andarSala, setAndarSala] = useState(null)
    const [nomeSala, setNomeSala] = useState(null)
    const [localSala, setLocalSala] = useState(null)
    const [nomeTurma, setNomeTurma] = useState(null)
    const [equipamentos, setEquipamentos] = useState(null)

    const [teste, setTeste] = useState(null)


    useEffect(() => {
        list_reservas_grupal()
        reserva_individual()

        loadingGrupal
        loadingIndividual
        modalDelete


    });

    const list_reservas_grupal = async () => {
        try {
            const uri = 'http://192.168.1.75:8080/reservaGrupal/aluno/' + route.params.credentials.login
            const response = await fetch(uri, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + route.params.credentials.token,
                },
            });
            const reservas = await response.json()
            if (reservas[0] == null) {
                setQntReservaGrupal(true)
            } else {
                setReservasGrupais(reservas)
                setQntReservaGrupal(false)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingGrupal(false)
        }
    }

    const reserva_individual = async () => {
        try {
            const uri = 'http://192.168.1.75:8080/reservaIndividual/aluno/login/' + route.params.credentials.login
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
                setQntReservaIndividial(true)
            } else {
                setReservaIndividual(reserva)
                setQntReservaIndividial(false)
            }


        } catch (error) {
            console.error(error)
        } finally {
            setLoadingIndividual(false)
        }
    }


    const deleteReserva = async () => {
        try {
            const uri = 'http://192.168.1.75:8080/reservaIndividual/' + reservaIndividual[0].id
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
        }
    }

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

    function visibleModal(reserva) {
        if (reserva.sala != null) {
            setModalIndividual(false)
            setData(refatorarData(reserva.data))
            setHoraI(reserva.horarioInicial.slice(0, 5))
            setHoraF(reserva.horarioFinal.slice(0, 5))
            setAndarSala(reserva.sala.andar)
            setNomeSala(reserva.sala.nome)
            setLocalSala(reserva.sala.local)
            setNomeTurma(reserva.turma.descricao)
        } else {
            setModalIndividual(true)
            setData(refatorarData(reserva.data))
            setHoraI(reserva.horarioInicial.slice(0, 5))
            setHoraF(reserva.horarioFinal.slice(0, 5))
            setAndarSala(reserva.andar_sala)
            setNomeSala(reserva.nome_sala)
            setLocalSala(reserva.local_sala)
            reserva.equipamentos.forEach(element => {
                if (equipamentos === null) {
                    setEquipamentos(element.id)
                } else {
                    setEquipamentos(equipamentos + ", " + element.id)
                }
            });
        }

        setShowModal(!showModal)
    }

    function invisibleModal() {
        setEquipamentos(null)
        setShowModal(!showModal)
    }

    function viewModalDelete() {
        setModalDelete(!modalDelete)
        setShowModal(!showModal)
    }

    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.top}>
                <Text style={styles.labelTop}>SISAEL</Text>
            </View>
            <View style={styles.moduloReservas}>
                <Text style={styles.labelAgendar}>Agende um equipamento</Text>
                <Text style={styles.textModulo}>Agende equipamentos em um laboratório de maneira rápida
                    e fácil.</Text>
                {qntReservaIndividial
                    ?
                    <TouchableOpacity style={styles.button}
                    disabled={false}
                        onPress={() => {
                            navigation.navigate("Adicionar reserva",
                                {
                                    credentials: route.params.credentials
                                })
                        }}
                    >
                        <Text style={styles.buttonText}>Agendar</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.button}
                    disabled={true}
                    >
                        <Text style={styles.buttonTextDisable}>Agendar</Text>
                    </TouchableOpacity>
                }

            </View>
            <View style={styles.moduloVisualizar}>
                <View style={styles.textVisualizar}>
                    <Text style={styles.labelReserva}>Reservas ativas de computadores</Text>
                </View>
                <View style={styles.viewVisualizarReserva}>
                    {loadingIndividual
                        ? <ActivityIndicator />
                        : qntReservaIndividial
                            ? <View>
                                <Text style={styles.textNaoReserva}>Não há reservas de computadores</Text>
                            </View>
                            : <View style={styles.viewReservaTotal}>
                                <View style={styles.viewInfoReserva}>
                                    <TouchableOpacity
                                        onPress={() => { visibleModal(reservaIndividual[0]) }}
                                    >
                                        <View style={styles.view2ListReservas}
                                        >
                                            <Text style={styles.textReservaGrupal}>
                                                <Text style={{ fontWeight: "bold" }}>Data: </Text>
                                                {
                                                    refatorarData(reservaIndividual[0].data)
                                                }
                                            </Text>
                                            <Text style={styles.textReservaGrupal}>
                                                <Text style={{ fontWeight: "bold" }}>Horário: </Text>
                                                {reservaIndividual[0].horarioInicial.slice(0, 5)}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                                <View style={styles.viewButtonsReserva}>
                                    <TouchableOpacity style={styles.buttonEditReserva}
                                        onPress={() => {
                                            navigation.navigate("Editar reserva",
                                                {
                                                    credentials: route.params.credentials,
                                                    reserva: reservaIndividual[0]
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
            <View style={styles.moduloReservasGrupal}>
                {
                    qntReservaGrupal
                        ?
                        <View style={styles.viewReservasGrupal}>
                            <Text style={styles.labelReserva}>Reservas ativas de turmas</Text>
                            <View style={{ paddingTop: 20 }}>
                                <Text style={styles.textNaoReserva}>Não há reservas no momento</Text>
                            </View>
                        </View>
                        :
                        <View style={styles.viewReservasGrupal}>
                            <Text style={styles.labelReserva}>Reservas ativas de turmas</Text>
                            <FlatList
                                style={styles.listReservasGrupal}
                                showsVerticalScrollIndicator={true}
                                data={reservasGrupais}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => { visibleModal(item) }}
                                        >
                                            <View style={styles.viewListReservas}
                                            >
                                                <View style={styles.view2ListReservas}>
                                                    <Text style={styles.textReservaGrupal}>
                                                        <Text style={{ fontWeight: "bold" }}>Data:</Text>
                                                        {
                                                            refatorarData(item.data)
                                                        }
                                                    </Text>
                                                    <Text style={styles.textReservaGrupal}>
                                                        <Text style={{ fontWeight: "bold" }}>Horário:</Text>
                                                        {item.horarioInicial.slice(0, 5)}
                                                    </Text>
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
            <Modal
                transparent={true}
                visible={showModal}
            >
                <SafeAreaView style={styles.safeAreaModal}>
                    {modalDelete
                        ?
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

                        : modalIndividual
                            ?
                            <View style={styles.viewModal}>
                                <Text style={styles.labelModal}>Reserva</Text>
                                <View style={styles.tabelaModal}>
                                    <View style={styles.tabelaEsqModal}>
                                        <Text style={styles.textModal}>Data</Text>
                                        <Text style={styles.textModal}>Horario inicial</Text>
                                        <Text style={styles.textModal}>Horario final</Text>
                                        <Text style={styles.textModal}>Nome da sala</Text>
                                        <Text style={styles.textModal}>Local da sala</Text>
                                        <Text style={styles.textModal}>Andar da sala</Text>
                                        <Text style={styles.textModal}>Computador(es)</Text>
                                    </View>
                                    <View style={styles.tabelaDirModal}>
                                        <Text style={styles.infoModal}>{data}</Text>
                                        <Text style={styles.infoModal}>{horaI}</Text>
                                        <Text style={styles.infoModal}>{horaF}</Text>
                                        <Text style={styles.infoModal}>{nomeSala}</Text>
                                        <Text style={styles.infoModal}>{localSala}</Text>
                                        <Text style={styles.infoModal}>{andarSala}</Text>
                                        <Text style={styles.infoModal}>{equipamentos}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.buttonModal}
                                    onPress={invisibleModal}
                                >
                                    <Text style={{ color: "white" }}>Fechar</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={styles.viewModal}>
                                <Text style={styles.labelModal}>Reserva</Text>
                                <View style={styles.tabelaModal}>
                                    <View style={styles.tabelaEsqModal}>
                                        <Text style={styles.textModal}>Turma</Text>
                                        <Text style={styles.textModal}>Data</Text>
                                        <Text style={styles.textModal}>Horario inicial</Text>
                                        <Text style={styles.textModal}>Horario final</Text>
                                        <Text style={styles.textModal}>Nome da sala</Text>
                                        <Text style={styles.textModal}>Local da sala</Text>
                                        <Text style={styles.textModal}>Andar da sala</Text>
                                    </View>
                                    <View style={styles.tabelaDirModal}>
                                        <Text style={styles.infoModal}>{nomeTurma}</Text>
                                        <Text style={styles.infoModal}>{data}</Text>
                                        <Text style={styles.infoModal}>{horaI}</Text>
                                        <Text style={styles.infoModal}>{horaF}</Text>
                                        <Text style={styles.infoModal}>{nomeSala}</Text>
                                        <Text style={styles.infoModal}>{localSala}</Text>
                                        <Text style={styles.infoModal}>{andarSala}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.buttonModal}
                                    onPress={invisibleModal}
                                >
                                    <Text style={{ color: "white" }}>Fechar</Text>
                                </TouchableOpacity>
                            </View>

                    }


                </SafeAreaView>
            </Modal >
        </SafeAreaView >


    )
}