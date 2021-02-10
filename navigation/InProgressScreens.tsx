import { createStackNavigator, } from '@react-navigation/stack';
import React from 'react';
import { Alert } from 'react-native';
import DescriptionScreen from '../screens/DescriptionScreen';
import FormListScreen from '../screens/FormListScreen';
import InProgressScreen from '../screens/InProgressScreen';
import auth from '@react-native-firebase/auth';
import { Fab, Icon } from 'native-base';
import LoginScreens from './LoginScreens';


const InProgressScreens = (props: any) => {

  const logOut = () => {
    auth()
      .signOut()
      .then(() => { console.log("LogoutOK"); props.navigation.navigate("login") })
      .catch((error: any) => {
        Alert.alert(error.message);

      });
  }
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#029F98' }, headerTintColor: 'white' }}>
      <Stack.Screen name="InProgress" options={{
        title: 'Liste des tâches en cours', headerRight: () => (
          <Fab style={{ marginBottom: -12, backgroundColor: '#029F98', height: 40, width: 40 }}
            onPress={() => logOut()}>
            <Icon name="md-enter-outline" type='Ionicons' />
          </Fab>)
      }} component={InProgressScreen} />
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
export default InProgressScreens;

