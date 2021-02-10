import React, { useEffect, useState } from 'react';
import { DataTable } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { Card, Container, Fab, Icon, } from 'native-base';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import { firebase } from '@react-native-firebase/auth';


const ListScreen = (props: any) => {

    const ref = firestore().collection('liste');
    const [variab, setVar] = useState<any[]>([]); //tableau des listes
    const user = firebase.auth().currentUser;



    useEffect(() => {
        let isMounted = true;

        const getListToDo = async () => {
            if (user?.uid) {
                await ref.where("status", "==", "toDo")
                    .where("author", "==", user.uid)
                    .get()
                    .then((data: any) => {
                        if (isMounted) { setVar(data.docs) }
                    })
                    .catch(function (error: any) {
                        console.log("Error getting documents: ", error);
                    });
            }
        }


        getListToDo()

        return () => { isMounted = false }

    }, [variab])



    return (
        <>
            <Container>
                <ScrollView>
                    <Card>
                        <DataTable style={{ borderTopColor: "grey", backgroundColor: "white" }}>
                            <DataTable.Header style={{ borderTopColor: "grey", backgroundColor: '#0FA8FE' }}>
                                <DataTable.Title style={{ flex: 1.5 }}><Text style={{ color: 'white', fontWeight: "bold", fontSize: 18, }}>Titre</Text></DataTable.Title>
                                <DataTable.Title style={{ flex: 1 }}><Text style={{ color: 'white', fontWeight: "bold", fontSize: 18, }}>Responsable</Text></DataTable.Title>
                                <DataTable.Title style={{ flex: 0.5 }}><Text style={{ color: 'white', fontWeight: "bold", fontSize: 18, }}>Date</Text></DataTable.Title>


                            </DataTable.Header>

                            {variab.map((row, index: any) => (
                                <Card key={index} style={{ backgroundColor: '#E3EAE8', marginEnd: 10 }}>
                                    <DataTable.Row key={index} onPress={() => { props.navigation.navigate('Description', { data: variab[index]._data, id: variab[index]._ref.id }); }}>

                                        <DataTable.Cell style={{ flex: 1.5 }}><Text style={{ color: 'grey', fontSize: 17, }}>{row._data.titre}</Text></DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 1 }}><Text style={{ color: 'grey', fontSize: 17, }}>{row._data.beneficiaire}</Text></DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 0.5 }}><Text style={{ color: 'black', fontSize: 17, }}>{moment(Date.parse(row._data.dateButoire)).format('DD/MM')}</Text></DataTable.Cell>

                                    </DataTable.Row>
                                </Card>
                            ))}
                        </DataTable>
                    </Card>
                </ScrollView>
                <Fab position="bottomRight" style={{ backgroundColor: '#029F98' }} onPress={() => { props.navigation.navigate('FormList', { id: "" }) }}>
                    <Icon name="add" type='Ionicons' />
                </Fab>
            </Container>
        </>
    )
}
export default ListScreen;