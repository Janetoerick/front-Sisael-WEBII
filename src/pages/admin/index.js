import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeAdmin from './Home/home'
import SalasAdmin from './Sala/salas'
import ReservasAdmin from './Reserva/reservas'

import { Feather } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

export default function Admin() {
    return (
        <Tab.Navigator
            inactiveColor="rgba(255, 255, 255, 0.5)"
            activeColor="#000"
        >
            <Tab.Screen 
            name="Home"
            component={HomeAdmin}
            options={{
                tabBarStyle: {backgroundColor: "#171738"},
                tabBarIcon: () => {
                  return <Feather name="home" color="#fff" size={26}/>
                },
                headerShown: false
            }}
            />
            <Tab.Screen 
            name="Reservas"
            component={ReservasAdmin} 
            options={{
                tabBarStyle: {backgroundColor: "#171738"},
                tabBarIcon: () => {
                  return <Feather name="list" color="#fff" size={26}/>
                },
                headerShown: false
            }}
            />
            <Tab.Screen 
            name="Configurações" 
            component={SalasAdmin} 
            options={{
                tabBarStyle: {backgroundColor: "#171738"},
                tabBarIcon: () => {
                  return <Feather name="settings" color="#fff" size={26}/>
                },
                headerShown: false
            }}
            />
        </Tab.Navigator>
    )
}