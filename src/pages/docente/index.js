import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import HomeDocente from './home/home'
import ReservasDocente from './reservas/reservas'
import TurmaDocente from './home/turma/turma'
import EditReserva from './home/turma/editReserva/editReserva'
import AddReserva from './home/turma/addReserva'
import ConfigDocente from './configuracoes/configuracoes'
import EditSenhaDocente from './configuracoes/editSenha'

import { Feather } from '@expo/vector-icons'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function HomePages({ route }) {
    return (
        <Stack.Navigator
            initialRouteName='PrincipalDocente'
        >
            <Stack.Screen name="PrincipalDocente"
                initialParams={{ credentials: route.params.credentials }}
                component={HomeDocente}
                options={{ headerShown: false }} />
            <Stack.Screen name="Editar reserva" component={EditReserva} />
            <Stack.Screen name="Adicionar reserva" component={AddReserva} />
            <Stack.Screen name="TurmaDocente" component={TurmaDocente} options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )

}

function ConfigPages({ route }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="PrincipalConfig"
                initialParams={{ credentials: route.params.credentials }}
                component={ConfigDocente}
                options={{ headerShown: false }} />
            <Stack.Screen name="Alterar senha" component={EditSenhaDocente} />
            {/* <Stack.Screen name="Adicionar reserva" component={AddReserva}/> */}
        </Stack.Navigator>
    )
}

export default function Docente({ route }) {

    return (
        <Tab.Navigator
            tabBarStyle={{ backgroundColor: '#fff' }}
            screenOptions={{
                tabBarShowLabel: false,
                unmountOnBlur: true,
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
                            return <Feather name="home" color="#1985A1" size={28} />
                        }
                        return <Feather name="home" color="#000" size={26} />
                    },
                }}
            />
            <Tab.Screen
                name="Reservas"
                component={ReservasDocente}
                initialParams={{ credentials: route.params }}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Feather name="list" color="#1985A1" size={28} />
                        }
                        return <Feather name="list" color="#000" size={26} />
                    },
                }}
            />
            <Tab.Screen
                name="Configurações"
                component={ConfigPages}
                initialParams={{ credentials: route.params }}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Feather name="settings" color="#1985A1" size={28} />
                        }
                        return <Feather name="settings" color="#000" size={26} />
                    },
                }}
            />
        </Tab.Navigator>
    )
}