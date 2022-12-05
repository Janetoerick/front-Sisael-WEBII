import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator, Modal, Button } from 'react-native'

import styles from './styles'
import { ip } from '../../../../infos'


export default function ReservasDocente({ navigation, route }) {

    const [reservasGrupais, setReservasGrupais] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const [qntReservaGrupal, setQntReservaGrupal] = useState(false)


    const [data, setData] = useState(null)
    const [horaI, setHoraI] = useState(null)
    const [horaF, setHoraF] = useState(null)
    const [andarSala, setAndarSala] = useState(null)
    const [nomeSala, setNomeSala] = useState(null)
    const [localSala, setLocalSala] = useState(null)
    const [nomeTurma, setNomeTurma] = useState(null)


    useEffect(() => {
        list_reservas_grupal()
    }, [route]);


    const list_reservas_grupal = async () => {
        try {
            const uri = ip + '/reservaGrupal/professor/' + route.params.credentials.login
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
        }
    }


    const deleteReserva = async () => {
        try {
            const uri = ip + '/reservaGrupal/'
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
            list_reservas_grupal()
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
        setNomeTurma(reserva.turma.descricao)
        setData(refatorarData(reserva.data))
        setHoraI(reserva.horarioInicial.slice(0, 5))
        setHoraF(reserva.horarioFinal.slice(0, 5))
        setAndarSala(reserva.sala.andar)
        setNomeSala(reserva.sala.nome)
        setLocalSala(reserva.sala.local)


        setShowModal(!showModal)
    }

    function invisibleModal() {
        setShowModal(!showModal)
    }

    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.moduloReservasGrupal}>
                {
                    qntReservaGrupal
                        ?
                        <View style={styles.viewReservasGrupal}>
                            <Text style={styles.labelReserva}>Reservas ativas</Text>
                            <View style={{ paddingTop: 20 }}>
                                <Text style={styles.textNaoReserva}>Não há reservas no momento</Text>
                            </View>
                        </View>
                        :
                        <View style={styles.viewReservasGrupal}>
                            <Text style={styles.labelReserva}>Reservas ativas</Text>
                            <FlatList
                                style={styles.listReservasGrupal}
                                showsVerticalScrollIndicator={true}
                                data={reservasGrupais}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={styles.viewListReservas}
                                        >
                                            <TouchableOpacity
                                                onPress={() => { visibleModal(item) }}
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
                                            </TouchableOpacity>

                                            {/* <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate("Home", {
                                                        screen: "PrincipalDocente",
                                                        params: {
                                                            credentials: route.params.credentials,
                                                            turma: item.turma
                                                        }
                                                    })
                                                }}
                                            >
                                                <View style={styles.viewButtonReservas}>
                                                    <Feather name="chevron-right" color="#fff" size={26} />
                                                </View>
                                            </TouchableOpacity> */}

                                        </View>

                                    )
                                }}
                                key={(item) => {
                                    return (item.id)
                                }}

                            />

                        </View>

                }
            </View >
            <Modal
                transparent={true}
                visible={showModal}
            >
                <SafeAreaView style={styles.safeAreaModal}>

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
                </SafeAreaView>
            </Modal >
        </SafeAreaView >


    )
}