import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AddReservaLocal from './addReservaLocal'
import AddReservaSala from './addReservaSala'
import AddReservaDateTime from './addReservaDateTime'

const Stack = createNativeStackNavigator()

export default function AddReserva({ route }) {

    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
        >
            <Stack.Screen name="findLocalReservaDocente" 
            initialParams={{ 
                credentials: route.params.credentials,
                turma: route.params.turma
            }} 
            component={AddReservaLocal}/>
            <Stack.Screen name="findSalaReservaDocente" component={AddReservaSala}/>
            <Stack.Screen name="findDateTime" component={AddReservaDateTime}/>
        </Stack.Navigator>
    )
}