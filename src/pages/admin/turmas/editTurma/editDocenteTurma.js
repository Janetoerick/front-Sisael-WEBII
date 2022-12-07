import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import styles from './styles'
import { ip } from '../../../../../infos'

import { Feather } from '@expo/vector-icons'

export default function EditDocenteTurma({ navigation, navigation: { goBack }, route }) {

    const [professorTurma, setProfessorTurma] = useState([])
    const [selectedProfessor, setSelectedProfessor] = useState("")

    const [erro, setErro] = useState("")

    useEffect(() => {
        findLocaisESalas()
    }, [route])

    const findLocaisESalas = async () => {
        try {
            const uri = ip + '/usuario/professor'
            const response = await fetch(uri, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + route.params.credentials.token
                }
            });
            const res = await response.json();

            res.forEach(element => {
                let temp = { key: element.login, value: element.login }
                professorTurma.push(temp)
            });


        } catch (error) {
            console.error(error)
        }
    }

    const saveTurma = async () => {
        if(selectedProfessor == "" || selectedProfessor == null){
            setErro("Preencha todos os campos!")
        }
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
                    professor: selectedProfessor,
                    alunos: route.params.turma.alunos,
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

    return (
        <SafeAreaView style={styles.page}>


            <View style={styles.container}>
                <SelectList data={professorTurma}
                    setSelected={(val) =>
                        setSelectedProfessor(val)
                    }
                    placeholder="Selecione o professor"
                    maxHeight={150}
                    boxStyles={{ width: "70%" }}
                    inputStyles={{ width: "100%" }}
                />
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

