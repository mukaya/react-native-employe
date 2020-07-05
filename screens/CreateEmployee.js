import React, {useState} from 'react';
import { View,Text,StyleSheet, Modal, Alert, KeyboardAvoidingView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import axios from "axios";

const CreateEmployee = ({navigation,route}) => {
    const getDetails = (type) => {
        if(route.params){
            switch(type){
                case "name":
                    return route.params.name;
                case "phone":
                    return route.params.phone;
                case "email":
                    return route.params.email;
                case "salary":
                    return route.params.salary;
                case "position":
                    return route.params.position;
                case "picture":
                    return route.params.picture;
                case "_id":
                    return route.params._id                
            }
        }
        return "";
    }
    const [name, setName] = useState(getDetails('name'));
    const [phone, setPhone] = useState(getDetails('phone'));
    const [email, setEmail] = useState(getDetails('email'));
    const [salary, setSalary] = useState(getDetails('salary'));
    const [picture, setPicture] = useState(getDetails('picture'))
    const [position, setPosition] = useState(getDetails('position'));
    const [modal, setModal] = useState(false);
    const [enableShift, setEnableShift] = useState(false);

    const objetPost = {
        id: getDetails('_id'),
        name: name,
        phone: phone,
        email: email,
        salary: parseFloat(salary),
        picture: picture,
        position: position
    }

    const updateDeatails = () => {
        axios.post("https://api-employe.herokuapp.com/api/employes/edit",objetPost)
        .then(res => {
           Alert.alert(`${name} is updated successfuly`);
           navigation.navigate("Home");
        })
        .catch(err => {
            console.error(err); 
        })
    }
    const submitData = () => {
        axios.post("https://api-employe.herokuapp.com/api/employes",objetPost)
        .then(res => {
           Alert.alert(`${name} is saved successfuly`);
           navigation.navigate("Home");
        })
        .catch(err => {
            console.error(err); 
        })
    }
    const pickFromGallery = async () => {
        const { granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if(granted){
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect:[1,1],
                quality:0.5
            })
            if(!data.cancelled){
                let newFile = {
                    uri: data.uri,
                    type: `test/${data.uri.split(".")[1]}`,
                    name: `test.${data.uri.split(".")[1]}`
                }
                uploadHandler(newFile);
            }
        }else{
            Alert.alert("You need to give uo permission to work")
        }
    }
    const pickFromCamera = async () => {
        const { granted} = await Permissions.askAsync(Permissions.CAMERA);
        if(granted){
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect:[1,1],
                quality:0.5
            })
            if(!data.cancelled){
                let newFile = {
                    uri: data.uri,
                    type: `test/${data.uri.split(".")[1]}`,
                    name: `test.${data.uri.split(".")[1]}`
                }
                uploadHandler(newFile);
            }

        }else{
            Alert.alert("You need to give uo permission to work")
        }
    }
    const uploadHandler = (image) =>{
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "mukaya");
        data.append("cloud_name", "dux8omdin");
        axios.post("https://api.cloudinary.com/v1_1/dux8omdin/image/upload",data)
        .then(res=>{
          setPicture(res.data.url);
          setModal(false);
      }).catch(error=>console.log(error));
    }
    return(
        <KeyboardAvoidingView behavior="position" style={styles.root} enabled={enableShift}>
        <View>
              <TextInput
                style={styles.inputStyle}
                label="Name"
                theme={theme}
                value={name}
                onFocus={()=>setEnableShift(false)}
                mode="outlined"
                onChangeText={text => setName(text)}
                />
                 <TextInput
                style={styles.inputStyle}
                label="Phone"
                theme={theme}
                value={phone}
                mode="outlined"
                onFocus={()=>setEnableShift(false)}
                keyboardType="number-pad"
                onChangeText={text => setPhone(text)}
                />
                 <TextInput
                style={styles.inputStyle}
                label="Email"
                theme={theme}
                value={email}
                onFocus={()=>setEnableShift(false)}
                mode="outlined"
                onChangeText={text => setEmail(text)}
                />
                 <TextInput
                style={styles.inputStyle}
                label="Salary"
                theme={theme}
                onFocus={()=>setEnableShift(true)}
                keyboardType="number-pad"
                value={salary.toString()}
                mode="outlined"
                onChangeText={text => setSalary(text)}
                />
                <TextInput
                style={styles.inputStyle}
                label="Position"
                theme={theme}
                value={position}
                onFocus={()=>setEnableShift(true)}
                mode="outlined"
                onChangeText={text => setPosition(text)}
                />
                <Button 
                style={styles.inputStyle}
                icon={picture===""?"upload":"check"}
                theme={theme}
                mode="contained" 
                onPress={() => setModal(true)}>
                    upload Image
                </Button>
                {
                    route.params
                    ?
                    <Button 
                style={styles.inputStyle}
                icon="content-save"
                theme={theme}
                mode="contained" 
                onPress={()=>updateDeatails()}>
                    Update Details
                </Button>
                :
                <Button 
                style={styles.inputStyle}
                icon="content-save"
                theme={theme}
                mode="contained" 
                onPress={submitData}>
                    Save
                </Button>
                }
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    theme={theme}
                    onRequestClose={()=>setModal(false)}
                >
                    <View style={styles.modalView}>
                        <View style={styles.modalButtonView}>
                            <Button 
                            icon="camera" 
                            mode="contained" 
                            theme={theme}
                            onPress={() => pickFromCamera()}>
                                Camera
                            </Button>
                            <Button 
                            icon="image-area" 
                            mode="contained" 
                            theme={theme}
                            onPress={() => pickFromGallery()}>
                                Galery
                            </Button>
                        </View>
                        <Button 
                        onPress={() => setModal(false)}>
                                Cancel
                        </Button>
                    </View>
                </Modal>
        </View>
        </KeyboardAvoidingView>
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
    inputStyle:{
        margin:10
    },
    modalButtonView:{
        flexDirection: 'row',
        justifyContent:'space-around',
        padding:10,
        backgroundColor:"white"
    },
    modalView:{
        position:'absolute',
        bottom:2,
        width:'100%'
    }
});

export default CreateEmployee;