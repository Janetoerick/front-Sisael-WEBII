import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from './src/pages/init/login'
import Cadastro from './src/pages/init/cadastro'

import Admin from './src/pages/admin'
import Docente from './src/pages/docente'
import Discente from './src/pages/discente'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" backBehavior="none">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastrar usuário" component={Cadastro} />
        <Stack.Screen name="Admin" component={Admin} options={{ headerShown: false }} />
        <Stack.Screen name="Discente" component={Discente} options={{ headerShown: false }} />
        <Stack.Screen name="Docente" component={Docente} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}