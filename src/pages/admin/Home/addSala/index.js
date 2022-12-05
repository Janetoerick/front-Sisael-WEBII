import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AddSalaLocal from './addSalaLocal'
import AddSalaInfos from './AddSalaInfos'

const Stack = createNativeStackNavigator()

export default function AddSala({ route }) {

    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
        >
            <Stack.Screen name="findLocal" 
            initialParams={{ credentials: route.params.credentials }} 
            component={AddSalaLocal}/>
            <Stack.Screen name="findInfos" component={AddSalaInfos}/>
        </Stack.Navigator>
    )
}