import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeDocente from './home/home'
import ConfigDocente from './configuracoes/configuracoes'

import { Feather } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

export default function Docente({route}) {

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle:{
                    position: 'absolute',
                }
            }}
        >
            <Tab.Screen 
            name="Home"
            component={HomeDocente}
            initialParams={{credentials: route.params}}
            options={{
                tabBarStyle: { borderTopColor:"#1985A1"},
                tabBarLabelStyle: {color: "#fff"},
                tabBarIcon: ({color, size, focused }) => {
                    if(focused){
                        return <Feather name="home" color="#1985A1" size={size}/>
                    }
                  return <Feather name="home" color="#000" size={26}/>
                },
            }}
            />
            <Tab.Screen 
            name="Configurações" 
            component={ConfigDocente}
            initialParams={{credentials: route.params}}
            options={{
                tabBarStyle: {borderTopColor: "#1985A1"},
                tabBarLabelStyle: {color: "#fff"},
                tabBarIcon: ({color, size, focused }) => {
                    if(focused){
                        return <Feather name="settings" color="#1985A1" size={size}/>      
                    }
                  return <Feather name="settings" color="#000" size={size}/>
                },
            }}
            />
        </Tab.Navigator>
    )
}