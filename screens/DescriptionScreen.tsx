import React from 'react';
import { Text } from 'react-native';
import { Container, Item, Button, Body, Card, CardItem, Content } from 'native-base';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';



export default function DescriptionScreen(props: any) {

  const ref = firestore().collection('liste');
  var dateDemande=moment(Date.parse(props.route.params.data.dateDemande)).format('DD/MM/YYYY');
  var dateButoire=moment(Date.parse(props.route.params.data.dateButoire)).format('DD/MM/YYYY');
 
  const onUpdate = () => {
    props.navigation.navigate("FormList", { id: props.route.params.id });

  }
  const onRemove = () => {
    ref.doc(props.route.params.id).delete().then(function () {
      console.log("Document successfully deleted!");
      props.navigation.goBack();
    }).catch(function (error:any) {
      console.error("Error removing document: ", error);
    });
  }
  return (

    <Container>
      <ScrollView>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text style={{ color: 'black', fontWeight: "bold", fontSize: 20, }}>Titre : <Text style={{color:'grey'}}>{props.route.params.data.titre}</Text></Text>

            </CardItem>
          </Card>
          <Card style={{ height: 150 }}>
            <CardItem header bordered>
              <Text style={{ fontWeight: "bold", fontSize: 20, }}>Description :</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={{ color: "grey", fontSize: 17, }}>
                  {props.route.params.data.description}
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
              <Text style={{ color: 'black', fontWeight: "bold", fontSize: 20, }}>Date de demande : <Text style={{color:'grey',fontWeight:'normal',fontSize: 17}}>{dateDemande}</Text></Text>

            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
              <Text style={{ color: 'black', fontWeight: "bold", fontSize: 20, }}>Date butoir : <Text style={{color:'grey',fontWeight:'normal',fontSize: 17}}>{dateButoire}</Text></Text>

            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
              <Text style={{ color: 'black', fontWeight: "bold", fontSize: 20, }}>Demandeur : <Text style={{color:'grey',fontWeight:'normal',fontSize: 17}}>{props.route.params.data.demandeur}</Text></Text>

            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>

              <Text style={{ color: 'black', fontWeight: "bold", fontSize: 20, }}>Responsable : <Text style={{color:'grey',fontWeight:'normal',fontSize: 17}}>{props.route.params.data.beneficiaire}</Text></Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
              <Item style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                <Button style={styles.button1} onPress={() => { onUpdate(); }}>
                  <Text style={{ textAlign: 'center', marginRight: 'auto', marginLeft: 'auto', color: 'white', fontWeight: "bold" }}>Modifier</Text>
                </Button>

                <Button style={styles.button1} onPress={() => { onRemove(); }}>
                  <Text style={{ textAlign: 'center', marginRight: 'auto', marginLeft: 'auto', color: 'white', fontWeight: "bold" }}>Supprimer</Text>
                </Button>
              </Item>
            </CardItem>
          </Card>
        </Content>




      </ScrollView>
    </Container>
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
    width: 265,
    marginRight: 7,
    marginLeft: 2,
    backgroundColor:'#029F98'

  },
  button1: {
    height: 40,
    width: 135,
    marginRight: 10,
    marginLeft: 2,
    backgroundColor:'#029F98'

  },
})

