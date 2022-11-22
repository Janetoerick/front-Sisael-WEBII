import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Login';
import Cadastro from './cadastro';

const Stack = createNativeStackNavigator();

export default function AppLogin() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Cadastrar usuário" component={Cadastro}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}