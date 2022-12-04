import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// import HomeAdmin from './Home/home'

import { Feather } from '@expo/vector-icons'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

// function HomePages({ route }) {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen name="PrincipalAdmin" 
//             initialParams={{ credentials: route.params.credentials }} 
//             component={HomeAdmin} 
//             options={{ headerShown: false }} />
//             {/* <Stack.Screen name="TurmaDocente" 
//             component={TurmaDocente}
//             options={{ headerShown: false }}
//             /> */}
//             {/* <Stack.Screen name="Editar reserva" component={EditReserva}/> */}
//             {/* <Stack.Screen name="Adicionar reserva" component={AddReserva}/> */}
//         </Stack.Navigator>
//     )

// }

// function ConfigPages({ route }) {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen name="PrincipalConfig" 
//             initialParams={{ credentials: route.params.credentials }} 
//             component={ConfigDocente} 
//             options={{ headerShown: false }} />
//             <Stack.Screen name="Alterar senha" component={EditSenhaDocente}/>
//             {/* <Stack.Screen name="Adicionar reserva" component={AddReserva}/> */}
//         </Stack.Navigator>
//     )
// }

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
                            return <Feather name="home" color="#1985A1" size={28} />
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
            {/* <Tab.Screen
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
            /> */}
        </Tab.Navigator>
    )
}