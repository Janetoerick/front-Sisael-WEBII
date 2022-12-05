import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeAdmin from './home/home'
import AddSala from './home/addSala'
import PageSala from './home/sala/sala'
import EditEquipamento from './home/sala/editEquipamento/editEquipamento'
import AddEquipamento from './home/sala/addEquipamento/addEquipamento'
import EditSenhaAdmin from './configuracoes/editSenha'

import ConfigAdmin from './configuracoes/configuracoes'

import { Feather } from '@expo/vector-icons'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function HomePages({ route }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="PrincipalAdmin" 
            initialParams={{ credentials: route.params.credentials }} 
            component={HomeAdmin} 
            options={{ headerShown: false }} />
            <Stack.Screen name="pageSala" 
            component={PageSala}
            options={{ headerShown: false }}
            />
            <Stack.Screen name="Adicionar sala" component={AddSala}/>
            <Stack.Screen name="Editar equipamento" component={EditEquipamento}/>
            <Stack.Screen name="Adicionar equipamento" component={AddEquipamento}/>
        </Stack.Navigator>
    )

}

function ConfigPages({ route }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="PrincipalConfig" 
            initialParams={{ credentials: route.params.credentials }} 
            component={ConfigAdmin} 
            options={{ headerShown: false }} />
            <Stack.Screen name="Alterar senha" component={EditSenhaAdmin}/>
        </Stack.Navigator>
    )
}

export default function Admin({ route }) {

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
                            return <Feather name="home" color="#1985A1" size={30} />
                        }
                        return <Feather name="home" color="#000" size={26} />
                    },
                }}
            />
            {/* <Tab.Screen
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
            /> */}
            <Tab.Screen
                name="Configurações"
                component={ConfigPages}
                initialParams={{ credentials: route.params }}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Feather name="user" color="#1985A1" size={30} />
                        }
                        return <Feather name="user" color="#000" size={26} />
                    },
                }}
            />
        </Tab.Navigator>
    )
}