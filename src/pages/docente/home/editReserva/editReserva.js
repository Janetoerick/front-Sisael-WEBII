import React, { useState } from 'react'
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import styles from './styles'


export default function EditReserva({ navigation, route }) {

    const [date, setDate] = useState(new Date(route.params.reserva.data));
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

    function refatorarHorario(horario) {
        var h = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "T"
        //console.log("-----------------------------------")
        //console.log("h---> " + h)
        h += horario.slice(0, 5)
        //console.log("h---> " + h)

        let x = Date.parse(h)
        //console.log("x---> " + x)
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

    function equipamentosReserva() {
        let equipamentos = ""
        route.params.reserva.equipamentos.forEach(element => {
            if(equipamentos !== ""){
                equipamentos += ", "
            }
            equipamentos += element.id.toString()
        });
        return equipamentos
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
            //console.log(fTime)
            setTextHoraI(fTime)
            //console.log(horaI)
            let d = refatorarHorario(fTime)
            //console.log("d=> " + d)
            setHoraI(d)
            setShowTimeI(false)
        } else if (showTimeF) {
            const currentDate = selectedDate || horaF;

            //console.log(currentDate)

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


            //console.log(fTime)
            setShowTimeF(false)
        } else if (show) {
            const currentDate = selectedDate || date;

            let fDate = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear()
            let Dateset = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() + 1)
            setDate(new Date(Dateset))
            setDateText(fDate)

            //console.log(Dateset)
        }
    }

    const attReserva = async () => {
        try {
            let data = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
            
            console.log(textHoraI)
            console.log(textHoraF)
            console.log(data)
            
            const uri = 'http://192.168.1.75:8080/reservaIndividual/' + route.params.reserva.id
            const response = await fetch(uri, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ route.params.credentials.token
                },
                body: JSON.stringify({
                    data: data,
                    horarioInicial: textHoraI,
                    horarioFinal: textHoraF,
                })
            });
            const res = await response.json();
            if (res.error == null) {
                navigation.navigate("Principal", {
                    credentials: route.params.credentials
                })
            } else {
                setErro(res.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const showMode = (currentMode) => {
        setShow(true)
        setMode("date")
        if (currentMode === 'timeI') {
            setShowTimeI(true)
            setMode("time")
        } else if (currentMode === 'timeF') {
            setMode("time")
            setShowTimeF(true)
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
                        <Text style={styles.valueInput}>{route.params.reserva.nome_sala}</Text>
                    </View>
                </View>
                <View style={styles.input}>
                    <View style={styles.inputView}>
                        <Text style={styles.infoInput}>Andar da Sala</Text>
                        <Text style={styles.valueInput}>{route.params.reserva.andar_sala.toString()}</Text>
                    </View>
                </View>
                <View style={styles.input}>
                    <View style={styles.inputView}>
                        <Text style={styles.infoInput}>Local da Sala</Text>
                        <Text style={styles.valueInput}>{route.params.reserva.local_sala}</Text>
                    </View>
                </View>
                <View style={styles.input}>
                    <View style={styles.inputView}>
                        <Text style={styles.infoInputEquipamentos}>Cod. Equipamentos</Text>
                        <Text style={styles.valueInput}>{equipamentosReserva()}</Text>
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