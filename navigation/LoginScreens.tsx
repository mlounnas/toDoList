import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import BottomNavigator from './BottomNavigator';

interface LoginScreens {
    user : any;
}
const LoginScreens = (props : any) => {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator headerMode="none" screenOptions={{ headerStyle: { backgroundColor: '#334BFF', }, headerTintColor: 'white'}}>
        { props.user ? (<Stack.Screen name="home" component={BottomNavigator}  />
        ) : (
          <>
      <Stack.Screen name="login" options={{ title: 'SignIn'}} component={Login}/>
      <Stack.Screen name="signUp" options={{ title: 'SignUp' }} component={SignUp} />
      
      </>
        )}
    </Stack.Navigator>
    )
}
export default LoginScreens