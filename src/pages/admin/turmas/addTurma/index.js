import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AddTurmaInfo from './addTurmaInfo'
import AddTurmaDocente from './addTurmaDocente'
import AddTurmaDiscentes from './addTurmaDiscente'

const Stack = createNativeStackNavigator()

export default function AddTurma({ route }) {

    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
        >
            <Stack.Screen name="findInfo" 
            initialParams={{ credentials: route.params.credentials }} 
            component={AddTurmaInfo}/>
            <Stack.Screen name="findDocente" component={AddTurmaDocente}/>
            <Stack.Screen name="findDiscentes" component={AddTurmaDiscentes}/>
        </Stack.Navigator>
    )
}