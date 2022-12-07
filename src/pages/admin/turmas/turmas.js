import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator, Modal } from 'react-native'

import { Feather } from '@expo/vector-icons'
import styles from './styles'
import { ip } from '../../../../infos'
import { TextInput } from 'react-native-gesture-handler'

export default function TurmasAdmin({ navigation, route }) {

    const [hasTurmas, setHasTurmas] = useState()
    const [turmas, setTurma] = useState([])   // <<
    const [loadingTurmas, setLoadingTurmas] = useState(true)
    const [loadingSearch, setLoadingSearch] = useState(false)

    const [search, setSearch] = useState([])
    const [turmasSearch, setTurmasSearch] = useState([])

    const [showModal, setShowModal] = useState(false)
    const [viewInfo, setViewInfo] = useState(false)
    const [viewEdit, setViewEdit] = useState(false)
    const [turmaDelete, setTurmaDelete] = useState(null)
    const [turmaInfo, setTurmaInfo] = useState(null)

    useEffect(() => {
        list_turmas()
    }, [route]);

    useEffect(() => {
        turmasSearch
    }, [search]);

    const list_turmas = async () => {
        try {
            setLoadingTurmas(true)
            const uri = ip + '/turma'
            const response = await fetch(uri, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + route.params.credentials.token,
                },
            });
            const s = await response.json()
            if (s[0] == null) {
                setHasTurmas(false)
            } else {
                setTurma(s)
                setHasTurmas(true)
                setTurmasSearch(s)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingTurmas(false)
        }
    }

    const deleteTurma = async () => {
        try {
            const uri = ip + '/turma/' + turmaDelete
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
            list_turmas()
        }
    }

    function viewModalDelete(turma) {
        setTurmaDelete(turma)
        setViewInfo(false)
        setShowModal(!showModal)
    }

    function viewModalInfo(turma) {
        if (turma == null) {
            let temp = { "descricao": "null", "professor": "null", "alunos": [] }
            setTurmaInfo(temp)
        } else {
            setTurmaInfo(turma)
        }

        setViewInfo(true)
        setShowModal(!showModal)
    }

    function viewModalEdit(turma) {
        setViewEdit(!viewEdit)
        setTurmaDelete(turma)
        setViewInfo(false)
        setShowModal(!showModal)
    }

    function searchTable() {
        setLoadingSearch(true)

        var list = []
        turmas.map(item => {
            if ((item.professor.toLowerCase().includes(search.toLowerCase()) ||
                item.descricao.toLowerCase().includes(search.toLowerCase()))) {
                list.push(item)
            }
        })
        setTurmasSearch(list)
        setLoadingSearch(false)
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
                                <View style={{ paddingTop: 20 }}>
                                    <Text style={styles.textNaoReserva}>Não há turmas no sistema</Text>
                                </View>
                            </View>
                            :
                            <View style={styles.viewReservasGrupal}>
                                <Text style={styles.labelReserva}>Turmas</Text>
                                <View style={styles.viewSearch}>
                                    <TextInput placeholder='Pesquisar' value={search}
                                        onChangeText={setSearch} style={styles.inputSearch} />
                                    <TouchableOpacity style={styles.buttonSearch}
                                        onPress={() => { searchTable() }}
                                    >
                                        <Feather name="search" color="#fff" size={20} />
                                    </TouchableOpacity>
                                </View>
                                {loadingSearch
                                    ?
                                    <ActivityIndicator />
                                    :
                                    <FlatList
                                        style={styles.listReservasGrupal}
                                        showsVerticalScrollIndicator={true}
                                        data={turmasSearch}
                                        renderItem={({ item }) => {
                                            return (

                                                <View style={styles.viewReservaTotal}>
                                                    <View style={styles.viewInfoReserva}>
                                                        <TouchableOpacity
                                                            onPress={() => { viewModalInfo(item) }}
                                                        >


                                                            <View style={styles.view2ListReservas}
                                                            >
                                                                <Text style={styles.textReservaGrupal}>
                                                                    {item.descricao}
                                                                </Text>
                                                                <Text>
                                                                    {item.professor}
                                                                </Text>

                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={styles.viewButtonsReserva}>
                                                        <TouchableOpacity style={styles.buttonEditReserva}
                                                            onPress={() => {
                                                                viewModalEdit(item)
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
                                            return item.id
                                        }
                                        }

                                    />

                                }

                            </View>

                }
            </View>
            <View style={styles.moduloReservas}>

                <TouchableOpacity style={styles.button}
                    disabled={false}
                    onPress={() => {
                        navigation.navigate("Adicionar turma", {
                            credentials: route.params.credentials,
                            sala: route.params.sala
                        })
                    }}
                >
                    <Text style={styles.buttonText}>Adicionar turma</Text>
                </TouchableOpacity>

            </View>

            <Modal
                transparent={true}
                visible={showModal}
            >
                <SafeAreaView style={styles.safeAreaModal}>
                    {viewInfo
                        ?
                        <View style={styles.viewModalDelete}>
                            <Text style={styles.labelModal}>{turmaInfo.descricao}</Text>
                            <View style={styles.tabelaModal}>
                                <View style={styles.tabelaProfessorModal}>
                                    <Text style={styles.textModalProfessor}>Professor</Text>
                                    <Text style={styles.infoModalProfessor}> {turmaInfo.professor}</Text>
                                </View>
                                <View style={styles.tabelaAlunosModal}>
                                    <Text style={styles.textModalAluno}>Alunos</Text>
                                    <View style={styles.infoModalAluno}>
                                        <FlatList
                                            style={styles.listReservasGrupal}
                                            showsVerticalScrollIndicator={true}
                                            data={turmaInfo.alunos}
                                            renderItem={({ item }) => {
                                                return (

                                                    <Text>{item}</Text>
                                                )
                                            }}
                                            key={(item) => {
                                                return item
                                            }
                                            }

                                        />
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.buttonModalDeleteFechar}
                                onPress={() => { viewModalInfo(null) }}
                            >
                                <Text style={{ color: "white" }}>Voltar</Text>
                            </TouchableOpacity>
                        </View>
                        : viewEdit
                            ?
                            <View style={styles.viewModalEdit}>
                                <Text style={styles.labelModal}>Opções de edição</Text>
                                <TouchableOpacity style={styles.buttonModalDeleteFechar}
                                    onPress={() => {
                                        setShowModal(!showModal)
                                        setViewEdit(!viewEdit)
                                        setViewInfo(false)
                                        navigation.navigate("Editar descrição", {
                                            credentials: route.params.credentials,
                                            turma: turmaDelete
                                        })
                                    }}
                                >
                                    <Text style={{ color: "white" }}>Atualizar descrição da sala</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonModalDeleteFechar}
                                    onPress={() => {
                                        setShowModal(!showModal)
                                        setViewEdit(!viewEdit)
                                        setViewInfo(false)
                                        navigation.navigate("Editar docente", {
                                            credentials: route.params.credentials,
                                            turma: turmaDelete
                                        })
                                    }}
                                >
                                    <Text style={{ color: "white" }}>Atualizar docente</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonModalDeleteFechar}
                                    onPress={() => {
                                        setShowModal(!showModal)
                                        setViewEdit(!viewEdit)
                                        setViewInfo(false)
                                        navigation.navigate("Editar discentes", {
                                            credentials: route.params.credentials,
                                            turma: turmaDelete
                                        })
                                    }}
                                >
                                    <Text style={{ color: "white" }}>Adicionar discente</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.buttonModalVoltar}
                                    onPress={() => { viewModalEdit(null) }}
                                >
                                    <Text style={{ color: "white" }}>Voltar</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={styles.viewModalDelete}>
                                <Text style={{ fontSize: 16, textAlign: "center" }}>
                                    Tem certeza que deseja deletar a sala?
                                </Text>
                                <View style={styles.viewButtonDelete}>
                                    <TouchableOpacity style={styles.buttonModalDelete}
                                        onPress={() => { deleteTurma() }}
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
                    }


                </SafeAreaView>
            </Modal >
        </SafeAreaView>
    )

}