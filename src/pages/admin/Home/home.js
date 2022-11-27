import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'

import styles from './styles'

export default function HomeAdmin(){
    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.top}>
                <Text style={styles.labelTop}>SISAEL</Text>
            </View>
            <View style={styles.body}>
                <Text>Aumentar prioridade de usuario</Text>
            </View>
        </SafeAreaView>
    )
}