import React, { useState } from 'react'
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import styles from './styles'
import { ip } from '../../../../../../infos'


export default function EditReserva({ navigation, route }) {

    const [date, setDate] = useState(new Date(dateInit(route.params.reserva.data)));
    const [dateText, setDateText] = useState(refatorarData(route.params.reserva.data));
    const [horaI, setHoraI] = useState(new Date(refatorarHorario(route.params.reserva.horarioInicial)))
    const [textHoraI, setTextHoraI] = useState(route.params.reserva.horarioInicial.slice(0, 5))
    const [horaF, setHoraF] = useState(new Date(refatorarHorario(route.params.reserva.horarioFinal)))
    const [textHoraF, setTextHoraF] = useState(route.params.reserva.horarioFinal.slice(0, 5))


    const [mode, setMode] = useState("date")
    const [show, setShow] = useState(false)
    const [showTimeI, setShowTimeI] = useState(false)
    const [showTimeF, setShowTimeF] = useState(false)

    const [erro, setErro] = useState(null)

    function dateInit(date) {
        let Dateset = date.slice(0, 4) + "-"
        if (date.slice(5) == "-") {
            Dateset += "0" + date.slice(5, 7) + "-"
        } else {
            Dateset += date.slice(5, 7) + "-"
        }
        if (date.slice(8) == "-") {
            Dateset += "0" + date.slice(8, 10) + "T12:00:00"
        } else {
            Dateset += date.slice(8, 10) + "T12:00:00"
        }

        return Dateset
    }

    function refatorarHorario(horario) {
        var h = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "T"
        h += horario.slice(0, 5)

        return h
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
            if (currentDate.getMonth() < 9) {
                Dateset += "0" + (currentDate.getMonth() + 1) + "-"
            } else {
                Dateset += (currentDate.getMonth() + 1) + "-"
            }
            if (currentDate.getDate() < 10) {
                Dateset += "0" + currentDate.getDate() + "T12:00:00"
            } else {
                Dateset += currentDate.getDate() + "T12:00:00"
            }

            setDate(new Date(Dateset))
            setDateText(fDate)

        }
    }

    const showMode = (currentMode) => {
        if (currentMode === 'date') {
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

    const attReserva = async () => {
        try {

            // console.log(textHoraI)
            // console.log(textHoraF)
            // console.log(data)

            const uri = ip + '/reservaGrupal/' + route.params.reserva.id
            const response = await fetch(uri, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + route.params.credentials.token
                },
                body: JSON.stringify({
                    data: date,
                    horarioInicial: textHoraI,
                    horarioFinal: textHoraF,
                })
            });
            const res = await response.json();
            if (res.error == null) {
                navigation.navigate("TurmaDocente", {
                    credentials: route.params.credentials,
                    turma: route.params.reserva.turma
                })
            } else {
                setErro(res.message)
            }
        } catch (error) {
            console.error(error)
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
                        <Text style={styles.infoInputUpdate}>Data</Text>
                        <Text style={styles.valueInputUpdate}>{dateText}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.input}
                    onPress={() => {
                        showMode('timeI')
                    }
                    }
                >
                    <View style={styles.inputView}>
                        <Text style={styles.infoInputUpdateTime}>Horário de inicio</Text>
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
                        <Text style={styles.infoInputUpdateTime}>Horário de fim</Text>
                        <Text style={styles.valueInputUpdate}>{textHoraF}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.input}>
                    <View style={styles.inputView}>
                        <Text style={styles.infoInput}>Nome da Sala</Text>
                        <Text style={styles.valueInput}>{route.params.reserva.sala.nome}</Text>
                    </View>
                </View>
                <View style={styles.input}>
                    <View style={styles.inputView}>
                        <Text style={styles.infoInput}>Andar da Sala</Text>
                        <Text style={styles.valueInput}>{route.params.reserva.sala.andar.toString()}</Text>
                    </View>
                </View>
                <View style={styles.input}>
                    <View style={styles.inputView}>
                        <Text style={styles.infoInput}>Local da Sala</Text>
                        <Text style={styles.valueInput}>{route.params.reserva.sala.local}</Text>
                    </View>
                </View>

                <Text style={styles.erroText}>{erro}</Text>
                <TouchableOpacity style={styles.button}
                    onPress={attReserva}
                >
                    <Text style={styles.buttonText}>Atualizar</Text>
                </TouchableOpacity>
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