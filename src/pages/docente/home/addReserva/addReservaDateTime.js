import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import styles from './styles'

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

            let fDate = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear()
            let Dateset = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() + 1)
            setDate(new Date(Dateset))
            setDateText(fDate)

        }
    }

    const showMode = (currentMode) => {
        setShow(true)
        setMode("date")
        if (currentMode === 'timeI') {
            console.log("entrou no timeI")
            setShowTimeI(true)
            setMode("time")
        } else if (currentMode === 'timeF') {
            console.log("entrou no timeF")
            setMode("time")
            setShowTimeF(true)
        }
    }

    const saveReserva = async () => {
        try{

        }catch(erro){
            console.log(erro)
        } finally{
            navigation.navigate("Principal",{
                credentials: route.params.credentials
            })
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