import React from 'react';
import { View, StyleSheet, Image, Text, Linking, Platform, Alert } from 'react-native';
import {Title, Card, Button } from 'react-native-paper';
import { LinearGradient} from 'expo-linear-gradient';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import axios from 'axios';

const Profile = (props) => {
    const {_id, name, email, salary, picture, phone, position} = props.route.params.item;
    const objectPost = {
        id: _id
    }
    const deleteEmploye = () => {
        axios.post("https://api-employe.herokuapp.com/api/employes/delete",objectPost)
        .then(res => {
           Alert.alert(`deleted`);
        })
        .catch(err => {
            console.error(err); 
        })
    }
    const openDial = () => {
        if(Platform.OS === "android"){
            Linking.openURL(`tel:${phone}`);
        }else{
            Linking.openURL(`telprompt:${phone}`);
        }
    }
    return (
       <View style={styles.root}>
           <LinearGradient
            colors={["#0033ff","#6bc1ff"]}
            style={{height:"20%"}}
           />
          <View style={{alignItems:'center'}}>
            <Image
                style={{width:140,height:140,borderRadius:140/2,marginTop:-50}}
                source={{uri:picture}}
            />
          </View>
          <View style={{alignItems:'center', margin:15}}>
              <Title>{name}</Title>
              <Text style={styles.mytext}>{position}</Text>
          </View>
          <Card style={styles.mycard} onPress={()=>{
              Linking.openURL(`mailto:${email}`)
          }}>
            <View style={styles.cardContent}>
                <MaterialIcons name="email" size={32} color="#006aff" />
                <Text style={styles.mytext}>{email}</Text>
            </View>
          </Card>
          <Card style={styles.mycard} onPress={openDial}>
            <View style={styles.cardContent}>
                <MaterialIcons name="phone" size={32} color="#006aff" />
                <Text style={styles.mytext}>{phone}</Text>
            </View>
          </Card>
          <Card style={styles.mycard}>
            <View style={styles.cardContent}>
                <MaterialIcons name="attach-money" size={32} color="#006aff" />
                <Text style={styles.mytext}>{salary} $</Text>
            </View>
          </Card>
          <View style={{flexDirection:'row', justifyContent:'space-around', padding:10}}>
                <Button 
                icon="account-edit"
                theme={theme}
                mode="contained" 
                onPress={() => {
                    props.navigation.navigate('Create',{
                    _id,name,email,salary,picture,phone,position   
                    })
                }}>
                    Edit
                </Button>
                <Button 
                icon="delete"
                theme={theme}
                mode="contained" 
                onPress={() => deleteEmploye()}>
                    Fire Employee
                </Button>
          </View>
       </View>
    )
}
const theme = {
    colors:{
        primary: "#006aff"
    }
}
const styles = StyleSheet.create({
    root:{
        flex: 1
    },
    mycard:{
        margin:3
    },
    mytext:{
        fontSize:18,
        marginLeft: 5,
        marginTop: 3
    },
    cardContent:{
        flexDirection: 'row',
        padding: 8
    }
});

export default Profile
