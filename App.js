import React from "react";
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/login";
import RegisterScreen from "./screens/register";
import CreateItem from './screens/createItem'
import FoodScreen from './screens/foodScreen'

import DrawerNavigator from "./navigation/drawer";

import firebase from "firebase";
import { firebaseConfig } from "./config";

global.__reanimatedWorkletInit=()=>{}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const Stack = createStackNavigator();

const StackNav = () => {
  return(
  <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    <Stack.Screen name="Dashboard" component={DrawerNavigator} />
    <Stack.Screen name="CreateItem" component={CreateItem}/>
    <Stack.Screen name= 'FoodScreen' component={FoodScreen}/>
  </Stack.Navigator>)
}

export default function App() {
  return (
    <NavigationContainer>
      <StackNav/>
    </NavigationContainer>)

}
