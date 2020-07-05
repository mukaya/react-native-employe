import { StatusBar } from "expo-status-bar";
import React from "react";
import {StyleSheet,View} from "react-native";
import Contants from "expo-constants";
import Home from "./screens/Home";
import CreateEmployee from "./screens/CreateEmployee";
import Profile from "./screens/Profile";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator} from "@react-navigation/stack";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './reducers/reducer';

const Stack = createStackNavigator();

const store = createStore(reducer);

const myoptions = {
  title:"My Sweet Home",
  headerStyle:{
    backgroundColor:"#006aff"
  }
};
function App() {
  return (
      <View style={styles.container}>
          <Stack.Navigator>
          <Stack.Screen
          name="Home" 
          component={Home}
          options={myoptions}
          />
          <Stack.Screen 
          name="Create" 
          component={CreateEmployee}
          options={{...myoptions, title: 'Create Employee'}}
          />
          <Stack.Screen 
          name="Profile" 
          component={Profile}
          options={{...myoptions, title: "My Profile"}}
          />
        </Stack.Navigator>
      </View>
    );
}

export default ()=>{
  return(
      <Provider store={store}>
        <NavigationContainer>
          <App/>
       </NavigationContainer>
      </Provider>
  );
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#ebebeb",
    //marginTop: Contants.statusBarHeight,
  }
});