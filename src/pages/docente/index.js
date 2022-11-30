import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeDocente from './home/home'
import ConfigDocente from './configuracoes/configuracoes'
import EditReserva from './home/editReserva/editReserva'

import { Feather } from '@expo/vector-icons'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function HomePages({ route }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Principal" 
            initialParams={{ credentials: route.params.credentials }} 
            component={HomeDocente} 
            options={{ headerShown: false }} />
            <Stack.Screen name="Editar reserva" component={EditReserva}/>
        </Stack.Navigator>
    )

}

export default function Docente({ route }) {

    return (
        <Tab.Navigator
            tabBarStyle={{ backgroundColor: '#fff' }}
            screenOptions={{
                tabBarShowLabel: false,
                unmountOnBlur:true,
                headerShown: false,
                tabBarStyle: { borderTopColor: "#1985A1", backgroundColor: "#ffffff" },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomePages}
                initialParams={{ credentials: route.params }}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Feather name="home" color="#1985A1" size={size} />
                        }
                        return <Feather name="home" color="#000" size={26} />
                    },
                }}
            />
            <Tab.Screen
                name="Configurações"
                component={ConfigDocente}
                initialParams={{ credentials: route.params }}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Feather name="settings" color="#1985A1" size={size} />
                        }
                        return <Feather name="settings" color="#000" size={size} />
                    },
                }}
            />
        </Tab.Navigator>
    )
}