import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, TextInput } from 'react-native'
import styles from './styles'
import { ip } from '../../../../../infos'

import { Feather } from '@expo/vector-icons'

export default function EditDiscentesTurma({ navigation, navigation: { goBack }, route }) {

    const [discenteTurma, setDiscenteTurma] = useState([])
    const [discenteTurmaSearch, setDiscenteTurmaSearch] = useState([])
    const [search, setSearch] = useState("")
    const [qntDiscentes, setQntDiscentes] = useState(route.params.turma.alunos.length)

    const [discentes, setDiscentes] = useState(route.params.turma.alunos)

    const [erro, setErro] = useState("")

    useEffect(() => {
        findLocaisESalas()
    }, [route])

    const findLocaisESalas = async () => {
        try {
            const uri = ip + '/usuario/aluno'
            const response = await fetch(uri, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + route.params.credentials.token
                }
            });
            const res = await response.json();

            let list = []
            res.forEach(element => {
                if(!discentes.includes(element.login)){
                    list.push(element.login)
                }
                
            });
            setDiscenteTurma(list)
            setDiscenteTurmaSearch(list)


        } catch (error) {
            console.error(error)
        }
    }

    const saveTurma = async () => {

        try {
            setErro("")
            const uri = ip + '/turma/' + route.params.turma.id
            const response = await fetch(uri, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + route.params.credentials.token
                },
                body: JSON.stringify({
                    id: route.params.turma.id,
                    descricao: route.params.turma.descricao,
                    professor: route.params.turma.professor,
                    alunos: discentes,
                })
            });
            const res = await response.json();
            if (res.error == null) {
                navigation.navigate("TurmasAdmin", {
                    credentials: route.params.credentials
                })
            } else {
                setErro(res.message)
            }

        } catch (erro) {
            console.error(erro)
        }
    }

    function setDiscente(discente) {

        let list_nao_selecionados = []

        if (discenteTurma.length > 1) {
            discenteTurma.map(element => {
                if (!(element === discente)) {
                    list_nao_selecionados.push(element)
                }
            })
        }
        setDiscenteTurma(list_nao_selecionados)

        setDiscenteTurmaSearch(list_nao_selecionados)
        setQntDiscentes(qntDiscentes + 1)
        let list = discentes
        list.push(discente)

        setDiscentes(list)
        setSearch("")
    }

    function setAddDiscenteTurma(discente) {


        let list_nao_selecionados = []

        if (discentes.length > 1) {
            discentes.map(element => {
                if (!(element === discente)) {
                    list_nao_selecionados.push(element)
                }
            })
            setDiscentes(list_nao_selecionados)
        } else {
            setDiscentes(list_nao_selecionados)
        }

        setQntDiscentes(qntDiscentes - 1)
        let list = discenteTurma
        list.push(discente)

        setDiscenteTurma(list)
        setDiscenteTurmaSearch(list)

    }

    function searchTable() {

        var list = []
        discenteTurma.map(item => {
            if (item.toLowerCase().includes(search.toLowerCase()) || search == "") {
                list.push(item)
            }
        })
        setDiscenteTurmaSearch(list)
    }

    

    return (
        <SafeAreaView style={styles.page}>


            <View style={styles.container}>
            <View style={styles.viewSearch}>
                    <TextInput placeholder='Pesquisar' value={search}
                        onChangeText={setSearch} style={styles.inputSearch} />
                    <TouchableOpacity style={styles.buttonSearch}
                        onPress={() => { searchTable() }}
                    >
                        <Feather name="search" color="#fff" size={20} />
                    </TouchableOpacity>
                </View>
                <View style={styles.viewDiscentesNotIn}>
                    <View style={styles.viewListDiscentes}>
                        <FlatList
                            style={styles.listReservasGrupal}
                            showsVerticalScrollIndicator={true}
                            data={discenteTurmaSearch}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setDiscente(item)
                                        }}
                                    >
                                        <Text>{item}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                            key={(item) => {
                                return item.id
                            }
                            }

                        />
                    </View>
                </View>

                <Feather name="chevrons-down" color="#000" size={26} style={{ paddingTop: 15 }} />

                <View style={styles.viewDiscentes}>
                    <View style={styles.viewListDiscentes}>
                        <FlatList
                            style={styles.listReservasGrupal}
                            showsVerticalScrollIndicator={true}
                            data={discentes}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setAddDiscenteTurma(item)
                                        }}
                                    >
                                        <Text>{item}</Text>
                                    </TouchableOpacity>

                                )
                            }}
                            key={(item) => {
                                return item.id
                            }
                            }

                        />
                    </View>
                    <View style={styles.viewQntDiscentes}>
                        <Text>{qntDiscentes}</Text>
                    </View>
                </View>

                <Text style={styles.textErro}>{erro}</Text>


                <View style={styles.viewButtons}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            saveTurma()
                        }}
                    >
                        <Feather name="check" color="#fff" size={20} />
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>

    )

}

