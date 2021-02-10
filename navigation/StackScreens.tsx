import { createStackNavigator, } from '@react-navigation/stack';
import { Alert} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import DescriptionScreen from '../screens/DescriptionScreen';
import FormListScreen from '../screens/FormListScreen';
import ListScreen from '../screens/ListScreen';
import { Fab, Icon } from 'native-base';
import LoginScreens from './LoginScreens';


const StackScreens = (props: any) => {
       const Stack = createStackNavigator();
       const logOut = () => {
              auth()
                     .signOut()
                     .then(() => { console.log("LogoutOK"); props.navigation.navigate("login") })
                     .catch((error: any) => {
                            Alert.alert(error.message);

                     });
       }
       return (
              <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#029F98', }, headerTintColor: 'white' }}>
                     <Stack.Screen name="List" options={{
                            title: 'Liste des tâches à faire', headerRight: () => (
                                   <Fab style={{ marginBottom: -12, backgroundColor: '#029F98', height: 40, width: 40 }}
                                          onPress={() => logOut()}>
                                          <Icon name="md-enter-outline" type='Ionicons' />
                                   </Fab>)
                     }} component={ListScreen} />
                     <Stack.Screen name="FormList" options={{
                            title: 'Formulaire', headerRight: () => (
                                   <Fab style={{ marginBottom: -12, backgroundColor: '#029F98', height: 40, width: 40 }}
                                          onPress={() => logOut()}>
                                          <Icon name="md-enter-outline" type='Ionicons' />
                                   </Fab>)
                     }} component={FormListScreen} />
                     <Stack.Screen name="Description" options={{
                            headerRight: () => (
                                   <Fab style={{ marginBottom: -12, backgroundColor: '#029F98', height: 40, width: 40 }}
                                          onPress={() => logOut()}>
                                          <Icon name="md-enter-outline" type='Ionicons' />
                                   </Fab>)
                     }} component={DescriptionScreen} />
                    <Stack.Screen name='login' options={{ title: 'SignIn' }} component={LoginScreens} />
              </Stack.Navigator>
       )
}
export default StackScreens;