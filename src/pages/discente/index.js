import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeDiscente from './home/home'
import ConfigDiscente from './configuracoes/configuracoes'
import EditReserva from './home/editReserva/editReserva'
import AddReserva from './home/addReserva'
import EditSenhaDiscente from './configuracoes/editSenha'

import { Feather } from '@expo/vector-icons'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function HomePages({ route }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Principal" 
            initialParams={{ credentials: route.params.credentials }} 
            component={HomeDiscente} 
            options={{ headerShown: false }} />
            <Stack.Screen name="Editar reserva" component={EditReserva}/>
            <Stack.Screen name="Adicionar reserva" component={AddReserva}/>
        </Stack.Navigator>
    )

}

function ConfigPages({ route }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="PrincipalConfig" 
            initialParams={{ credentials: route.params.credentials }} 
            component={ConfigDiscente} 
            options={{ headerShown: false }} />
            <Stack.Screen name="Alterar senha" component={EditSenhaDiscente}/>
            {/* <Stack.Screen name="Adicionar reserva" component={AddReserva}/> */}
        </Stack.Navigator>
    )

}

export default function Discente({ route }) {

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
                            return <Feather name="home" color="#1985A1" size={28} />
                        }
                        return <Feather name="home" color="#000" size={26} />
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
                            return <Feather name="user" color="#1985A1" size={28} />
                        }
                        return <Feather name="user" color="#000" size={26} />
                    },
                }}
            />
        </Tab.Navigator>
    )
}