/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { View} from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import LoginScreens from './navigation/LoginScreens';



const App = (props: any) => {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  console.log(user)
  //const userCurrent = firebase.auth().currentUser;
  useEffect(() => {
    
    
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData : any = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
   
  }, []);

  if (loading) {	
    return (	
      <></>	
    )	
  }

  
  // const LoginScreens = () => {
  //   const Stack = createStackNavigator();
  //   return (
  //     <Stack.Navigator headerMode="none" screenOptions={{ headerStyle: { backgroundColor: '#334BFF', }, headerTintColor: 'white'}}>
  //       { user ? (<Stack.Screen name="home" component={BottomNavigator}  />
  //       ) : (
  //         <>
  //     <Stack.Screen name="login" options={{ title: 'SignIn'}} component={Login}/>
  //     <Stack.Screen name="signUp" options={{ title: 'SignUp' }} component={SignUp} />
      
  //     </>
  //       )}
  //   </Stack.Navigator>
  //   )
  // }

  return (
    <>
      {/* <HeaderMenu/> */}
      
      <NavigationContainer>
      <View style={{ flex: 1 }}>
      {{user}&&<LoginScreens user={user}/>}
      </View>
      </NavigationContainer>
      
    </>
  );
}
export default App;
