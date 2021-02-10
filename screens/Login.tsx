
import { firebase } from '@react-native-firebase/auth';
import React, { useState } from 'react'
import { Alert } from 'react-native';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StyleSheet } from 'react-native';
import { HelperText } from 'react-native-paper';


const Login = (props: any) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errorText, setErrorText] = useState(false);

    const controlInput = () => {
        if (email == '' || password === '') {
            setErrorText(true);
        }
    }
    const onFooterLinkPress = () => {
        props.navigation.navigate('signUp')
    }

    const onLoginPress = () => {
        if (password !== '' && email !== '') {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((response) => {
                    const uid = response.user.uid
                    const usersRef = firebase.firestore().collection('users')
                    usersRef
                        .doc(uid)
                        .get()
                        .then(firestoreDocument => {
                            if (!firestoreDocument.exists) {
                                Alert.alert("User or Password not found")
                                return;
                            }

                            const user = firestoreDocument.data()
                            props.navigation.navigate('home', { user })
                        })
                        .catch(error => {
                            Alert.alert("User or Password not found")
                        });
                })
                .catch(error => {
                    Alert.alert("User or Password not found")
                })
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Image
                    style={styles.logo}
                    source={require('../assets/toDoList.png')}
                />
                <TextInput


                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"

                />
                <HelperText style={styles.helperText} type="error" visible={errorText}>
                    Email address or Password is invalid!
                     </HelperText>
                <TextInput

                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { onLoginPress(); controlInput() }}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </ScrollView>
        </View>
    )



}
export default Login
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {

    },
    logo: {
        flex: 1,
        height: 140,
        left: 15,
        width: 150,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 1,
        marginBottom: 1,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    helperText: {

        borderRadius: 5,
        overflow: 'hidden',

        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#029F98',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#029F98",
        fontWeight: "bold",
        fontSize: 16
    }
})