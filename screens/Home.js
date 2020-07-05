import React, {useState, useEffect} from "react";
import {StyleSheet,Text,View, Image, FlatList, ActivityIndicator} from "react-native";
import {Card, FAB} from 'react-native-paper';
import axios from 'axios';
import { useSelector, useDispatch} from 'react-redux';

const Home = ({navigation}) => {

  // const [data, setData] = useState("");
  // const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const {data,loading} = useSelector((state)=>{
    return state;
  })
  const fetchData = () => {
    axios.get("https://api-employe.herokuapp.com/api/employes")
    .then(res => {
      // setData(res.data);
      // setLoading(false);
      dispatch({type:"ADD_DATA", payload:res.data});
      dispatch({type:"SET_LOADING", payload:false});
    })
    .catch(err => {
        console.error(err); 
    })
  }
  useEffect(()=>{
    // axios.get("https://api-employe.herokuapp.com/api/employes")
    // .then(res => {
    //   setData(res.data);
    //   setLoading(false);
    // })
    // .catch(err => {
    //     console.error(err); 
    // })
    fetchData();
  },[]);
  const renderList = (item) => {
      return(
        <Card style={styles.mycard} onPress={()=>navigation.navigate('Profile',{item})}>
        <View style={styles.cardView}>
            <Image
            style={{height:60,width:60,borderRadius:30}}
            source={{uri:item.picture}}
            />
            <View style={{ marginLeft: 10}}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{item.position}</Text>
            </View>
        </View>
       </Card>
      );
  } 
  return (
      <View style={{flex:1}}>
         {
          loading?
          <ActivityIndicator size="large" color="#0000ff" />
          :
          <FlatList
          keyExtractor={(item, index)=>item._id}
          data={data}
          renderItem={item=>{
            return renderList(item.item);
          }}
          onRefresh={()=>fetchData()}
          refreshing={loading}
          />
         }
          <FAB onPress={()=>navigation.navigate("Create")}
            style={styles.fab}
            small={false}
            icon="plus"
            theme={{colors:{accent:"#006aFF"}}}
        /> 
      </View>
    );
}

const styles = StyleSheet.create({
  mycard:{
      margin:5
  },
  cardView:{
      flexDirection:'row',
      padding: 6
  },
  text:{
      fontSize: 18,
  },
  fab:{
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
});
export default Home;