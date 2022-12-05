import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import styles from './styles'
import { ip } from '../../../../../../infos'

import { Feather } from '@expo/vector-icons'

export default function AddReservaDateTime({ navigation, navigation: { goBack }, route }) {

    const [date, setDate] = useState(new Date());
    const [dateText, setDateText] = useState("Data");
    const [horaI, setHoraI] = useState(new Date())
    const [textHoraI, setTextHoraI] = useState("Horário de início")
    const [horaF, setHoraF] = useState(new Date())
    const [textHoraF, setTextHoraF] = useState("Horário de fim")


    const [mode, setMode] = useState("date")
    const [show, setShow] = useState(false)
    const [showTimeI, setShowTimeI] = useState(false)
    const [showTimeF, setShowTimeF] = useState(false)

    const [erro, setErro] = useState(null)


    function refatorarHorario(horario) {
        var h = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "T"
        h += horario.slice(0, 5)

        let x = Date.parse(h)
        return x
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

    const onChangeDate = (event, selectedDate) => {
        setShow(false)
        if (showTimeI) {
            const currentDate = selectedDate || horaI;

            let fTime
            if (currentDate.getHours() < 10) {
                fTime = "0" + currentDate.getHours()
            } else {
                fTime = currentDate.getHours()
            }

            if (currentDate.getMinutes() < 10) {
                fTime += ':0' + currentDate.getMinutes()
            } else {
                fTime += ':' + currentDate.getMinutes()
            }
            setTextHoraI(fTime)
            let d = refatorarHorario(fTime)
            setHoraI(d)
            setShowTimeI(false)
        } else if (showTimeF) {
            const currentDate = selectedDate || horaF;


            let fTime
            if (currentDate.getHours() < 10) {
                fTime = "0" + currentDate.getHours()
            } else {
                fTime = currentDate.getHours()
            }

            if (currentDate.getMinutes() < 10) {
                fTime += ':0' + currentDate.getMinutes()
            } else {
                fTime += ':' + currentDate.getMinutes()
            }

            setTextHoraF(fTime)
            setHoraF(new Date(refatorarHorario(fTime)))


            setShowTimeF(false)
        } else if (show) {
            const currentDate = selectedDate || date;

            let fDate = ""
            if (currentDate.getDate() < 10) {
                fDate += '0' + currentDate.getDate() + '/'
            } else {
                fDate += currentDate.getDate() + '/'
            }

            if (currentDate.getMonth() < 9) {
                fDate += "0" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear()
            } else {
                fDate = fDate + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear()
            }

            let Dateset = currentDate.getFullYear() + "-" 
            if(currentDate.getMonth() < 9){
                Dateset += "0" + (currentDate.getMonth() + 1) + "-"
            } else {
                Dateset += (currentDate.getMonth() + 1) + "-"
            }
            if(currentDate.getDate() < 10){
                Dateset += "0" + currentDate.getDate() + "T12:00:00"
            } else {
                Dateset += currentDate.getDate() + "T12:00:00"
            }
            
            setDate(new Date(Dateset))
            setDateText(fDate)

        }
    }

    const showMode = (currentMode) => {
        if(currentMode === 'date'){
            setMode("date")
        } else if (currentMode === 'timeI') {
            setMode("time")
            setShowTimeI(true)
        } else if (currentMode === 'timeF') {
            setMode("time")
            setShowTimeF(true)
        }
        setShow(true)
    }

    const saveReserva = async () => {
        if (dateText == "Data" ||
            textHoraI == "Horário de início" || textHoraF == "Horário de fim") {
            setErro("Preencha todos os campos")
        } else {
            try {
                setErro("")
                const uri = ip + '/reservaGrupal/'
                const response = await fetch(uri, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + route.params.credentials.token
                    },
                    body: JSON.stringify({
                        data: date,
                        horarioInicial: textHoraI,
                        horarioFinal: textHoraF,
                        turma: route.params.turma.id,
                        sala: route.params.sala
                    })
                });
                const res = await response.json();
                if (res.error == null) {
                    navigation.navigate("TurmaDocente", {
                        credentials: route.params.credentials,
                        turma: route.params.turma
                    })
                } else {
                    setErro(res.message)
                }

            } catch (erro) {
                console.error(erro)
            }
        }
    }

    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.container}>

                <TouchableOpacity style={styles.input}
                    onPress={() => {
                        showMode('date')
                    }
                    }
                >
                    <View style={styles.inputView}>
                        <Text style={styles.infoInputUpdate}>{dateText}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.input}
                    onPress={() => {
                        showMode('timeI')
                    }
                    }
                >
                    <View style={styles.inputView}>
                        <Text style={styles.valueInputUpdate}>{textHoraI}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.input}
                    onPress={() => {
                        showMode('timeF')
                    }
                    }
                >
                    <View style={styles.inputView}>
                        <Text style={styles.valueInputUpdate}>{textHoraF}</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.textErro}>{erro}</Text>
                <View style={styles.viewButtons}>
                    <TouchableOpacity style={styles.buttonBack}
                        onPress={() => {
                            goBack()
                        }}
                    >
                        <Feather name="chevron-left" color="#fff" size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            saveReserva()
                        }}
                    >
                        <Feather name="check" color="#fff" size={20} />
                    </TouchableOpacity>
                </View>
            </View>

            {show &&
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display='default'
                    onChange={onChangeDate}
                />
            }
        </SafeAreaView>
    )

}