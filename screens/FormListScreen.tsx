import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Button, Container, Item, Input, Label, Textarea, Text, Card } from 'native-base';

import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import {Picker} from '@react-native-community/picker';
import { firebase } from '@react-native-firebase/auth';


//enumeration statut list 
enum EnumStatus {
  toDo = 'toDo',
  inProgress = 'inProgress',
  Done = 'Done'
}

//List interface
interface List {

  demandeur: string,
  beneficiaire: string,
  dateDemande: Date,
  dateButoire: Date,
  description: string,
  status: EnumStatus,
  titre:string,
  author: any,
}


export default function FormListScreen(props: any) {


  //Objet List
  const [newList, setNewList] = useState<List>({

    demandeur: '',
    beneficiaire: '',
    dateDemande: new Date(),
    dateButoire: new Date(),
    description: '',
    status: EnumStatus.toDo,
    titre:'',
    author: "some_auth_id",

  });

  //hook d'effet edit Formulaire
  useEffect(() => {


    editFormList();


  }, [])
  const [todo, setTodo] = useState('');
  //affichage texte
  const [showText, setShowText] = useState(false);
  const [showText1, setShowText1] = useState(false);
  //BDD firestore collection liste
  const ref = firestore().collection('liste');

  //limiter accès données
  const user = firebase.auth().currentUser;
  //fonction pour editer formulaire lors d'un update
  async function editFormList() {
    const id = props.route.params.id

    if (id != "") {
     
      await ref.doc(props.route.params.id).get()
        .then(function (doc) {
          if (doc.exists) {
            var list = doc.data();

            if (list) {
              console.log("list", list.demandeur)
              setNewList({

                demandeur: list.demandeur,
                beneficiaire: list.beneficiaire,
                dateDemande: new Date(list.dateDemande),
                dateButoire: new Date(list.dateButoire),
                description: list.description,
                status: list.status,
                titre:list.titre,
                author : user?.uid
              })
              setShowText(true);
              setShowText1(true)
              
            }
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        }).catch(function (error) {
          console.log("Error getting document:", error);
        });
    }

  }

  //fonction ajouter ou update liste BDD firestore
  async function addTodo() {
    const id = props.route.params.id
    console.log("id", id)
    if (id === "") {
      await ref.add({

        demandeur: newList.demandeur,
        beneficiaire: newList.beneficiaire,
        dateDemande: String(newList.dateDemande),
        dateButoire: String(newList.dateButoire),
        description: newList.description,
        status: newList.status,
        titre:newList.titre,
        author : user?.uid

      }).then(function (docRef) {

        console.log("Document written with ID: ", docRef.id);

      })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });

      setTodo('');
      props.navigation.goBack()

    }
    else {
      await ref.doc(props.route.params.id).update({
        demandeur: newList.demandeur,
        beneficiaire: newList.beneficiaire,
        dateDemande: String(newList.dateDemande),
        dateButoire: String(newList.dateButoire),
        description: newList.description,
        status: newList.status,
        titre:newList.titre,
        author : user?.uid

      }).then(function () {
        console.log("Document successfully updated!");
      })
        .catch(function (error) {
          console.error("Error updating document: ", error);
        });
      setTodo('');
      props.navigation.popToTop()

    }
  }

  //DatePickers configuration
  const [show, setShow] = useState<any>(false); //apparition input datePickers
  const [show1, setShow1] = useState<any>(false); //apparition input datePickers

  const [mode, setMode] = useState<any>('date');
  const [mode1, setMode1] = useState<any>('date');
  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };
  const showMode1 = (currentMode: string) => {
    setShow1(true);
    setMode1(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };
  const showDatepicker1 = () => {
    showMode1('date');
  };

  //Picker Select status
  const SelectStatus = (): any => {
    return (

      <Picker
      accessibilityLabel={'statut'}
        selectedValue={newList.status}
        style={{ height: 50, width: 150}}
        onValueChange={(itemValue: any, itemIndex) => setNewList({ ...newList, status: itemValue })}
      >
        <Picker.Item label="ToDo" value={EnumStatus.toDo} />
        <Picker.Item label="InProgress" value={EnumStatus.inProgress} />
        <Picker.Item label="Done" value={EnumStatus.Done} />
      </Picker>)
  }


  return (
    <>
      
        <Container>
<ScrollView>
          

          
            <Card>
            <Label style={{ marginLeft:5, color: 'black', fontWeight: "bold", fontSize: 20}}>Demandeur</Label>
              <Input value={newList.demandeur} style={{color:'grey',fontSize: 17,}} onChangeText={(value)  => { setNewList({ ...newList, demandeur: value }) }} />
            

          

          <View style={{ marginTop: 5 }}>
          
           
            <Label style={{ marginLeft:5, color: 'black', fontWeight: "bold", fontSize: 20}}>Responsable</Label>
              <Input value={newList.beneficiaire}  style={{color:'grey',fontSize: 17,}} onChangeText={value => { setNewList({ ...newList, beneficiaire: value }) }} />
            
            </View>
            </Card>
          


          <Card style={{marginTop:10,marginBottom:10}}>
            <Item>
            <View>
              <Button style={styles.button} onPress={showDatepicker}>
                <Text style={{textAlign:'center',marginRight:'auto',marginLeft:'auto',color:'white',fontWeight: "bold"}}>Sélection date de demande </Text></Button>
              {show && (<DateTimePicker
                accessibilityLabel={'dateDemande'}
                onChange={(event: any, selectedDate: any) =>{ if(event.type=='set'){const currentDate = selectedDate || newList.dateDemande;setShow(Platform.OS === 'ios');  setNewList({ ...newList, dateDemande: selectedDate }); setShowText(true)}else{setShow(Platform.OS === 'ios');} }}
                value={newList.dateDemande}
                mode={mode}
                locale="fr"
                is24Hour={true}
                display="default"

              />)}

            </View>

            <View>
              {showText && <Text  style={{color:'grey',fontSize: 17,}}>{moment(newList.dateDemande).format('DD/MM/YYYY')}</Text>}
            </View>

            </Item>

          <Item style={{marginTop:10,marginBottom:10}}>

            <View>
              <Button  style={styles.button} onPress={showDatepicker1}>
                <Text style={{textAlign:'center',marginRight:'auto',marginLeft:'auto',color:'white',fontWeight: "bold"}}>Sélection date butoir</Text>
                </Button>
              {show1 && (<DateTimePicker
              accessibilityLabel={'dateButoire'}
              onChange={(event: any, selectedDate: any) =>{ if(event.type=='set'){const currentDate = selectedDate || newList.dateButoire;setShow1(Platform.OS === 'ios');  setNewList({ ...newList, dateButoire: selectedDate }); setShowText1(true)}else{setShow1(Platform.OS === 'ios');} }}
                value={newList.dateButoire}
                mode={mode1}
                locale="fr"
                is24Hour={true}
                display="default"
                textColor="black"
              />)}
            </View>

            <View>
              {showText1 && <Text  style={{color:'grey',fontSize: 17,}}>{moment(newList.dateButoire).format('DD/MM/YYYY')}</Text>}
            </View>

          </Item>
          </Card>
         <Card> 
<View style={{ marginTop: 20 }}>
<Label style={{ marginLeft:5, color: 'black', fontWeight: "bold", fontSize: 20}}>Titre</Label>
<Item style={{ marginTop: -5 }}>

 
  <Input value={newList.titre}  style={{color:'grey',fontSize: 17,}} onChangeText={(value) => { setNewList({ ...newList, titre: value }) }} />
</Item>
</View>          
</Card>
<Card> 
<Label  style={{marginTop:15,marginLeft:5, color: 'black', fontWeight: "bold", fontSize: 20}}>Description</Label>
          <Item>
               
              
              
              <Textarea style={{marginTop:10,width:350,marginLeft:'auto',marginRight:'auto',marginBottom:10,color:'grey',fontSize:17}} bordered value={newList.description} rowSpan={5} placeholder="Description de la tâche" onChangeText={text => { setNewList({ ...newList, description: text }); }} />
            

          </Item>
          </Card>
          <Card> 
          <Item>
          <Label style={{marginLeft:5, color: 'black', fontWeight: "bold", fontSize: 20}}>Statut</Label> 
             <SelectStatus />
          </Item>
          </Card>
          <Card> 
          <Item style={{marginLeft:'auto',marginRight:'auto', marginTop:20,marginBottom:20}}>
          <Button style={styles.button1} onPress={() => { addTodo(); }}>
            <Text style={{textAlign:'center',marginRight:'auto',marginLeft:'auto',color:'white',fontWeight: "bold"}}>valider</Text>
            </Button>
           
          <Button style={styles.button1} onPress={() => { props.navigation.goBack() }}>
            <Text style={{ textAlign: 'center', marginRight: 'auto', marginLeft: 'auto', color: 'white', fontWeight: "bold" }}>annuler</Text>
            </Button>
            </Item>
            </Card>
            </ScrollView>
        </Container>

      
    </>
  );
}
const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: "grey",
    borderWidth: 1,
    padding: 5
  },
  textArea: {
    borderColor: "grey",
    borderWidth: 1,
    padding: 5,
    height: 150,
    justifyContent: "flex-start"
  },
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  },
  button: {
    height: 40,
    width:240,
    marginRight:7,
    marginLeft:2,
    backgroundColor:'#029F98'

  },
  button1: {
    height: 40,
    width:120,
    marginRight:10,
    marginLeft:2,
    backgroundColor:'#029F98'
    

  },
})