import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import styles from './styles'

import { Feather } from '@expo/vector-icons'

export default function ConfigAdmin({ navigation, route }) {
    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.modulo}>
                <View style={styles.moduloPerfil}>
                    <Feather name="user" size={30} />
                    <Text style={styles.textLogin}>{route.params.credentials.login}</Text>
                </View>
                <View style={styles.moduloButtons}>


                    {/* <TouchableOpacity style={styles.button} 
                    disabled={true}
                    onPress={() => {
                        navigation.navigate("Alterar senha", {
                            credentials: route.params.credentials
                        })
                    }}
                    >
                        <Text style={styles.buttonText}>Alterar senha</Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity style={styles.button}
                    onPress={() => {
                        navigation.navigate("Login")
                    }}
                    >
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}