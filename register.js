import React from "react";
import {View, StyleSheet, SafeAreaView, Platform, StatusBar, Image, TextInput, TouchableOpacity, Text} from "react-native";

import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

const appIcon = require("../assets/icon.png");


export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name:"",
      last_name:"",
      email: "",
      password: "",
      confirmPassword: "",
      fontsLoaded: false,
      light_theme: true
    };
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }
 
 registerUser = (email, password,confirmPassword,first_name,last_name) => {
  if(password==confirmPassword){
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert("User registered!!");
        console.log(userCredential.user.uid)
        this.props.navigation.replace("Login");
        firebase.database().ref("/users/" + userCredential.user.uid)
                .set({
                  email: userCredential.user.email,
                  first_name: first_name,
                  last_name: last_name,
                  current_theme: "dark"
                })
      })
      .catch(error => {
        alert(error.message);
      });
    }else{
      alert("Passwords don't match!");
    }
  }; 

  render() {
      const { email, password, confirmPassword, first_name, last_name } = this.state;     
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
            <Text style={styles.appTitleText}>Register</Text>
        
            <TextInput
              style={styles.textinput}
              onChangeText={text => this.setState({ first_name: text })}
              placeholder={"First name"}
              placeholderTextColor={"#21368b"}
            />
            <TextInput
              style={styles.textinput}
              onChangeText={text => this.setState({ last_name: text })}
              placeholder={"Last name"}
              placeholderTextColor={"#21368b"}
            />
            <TextInput
              style={styles.textinput}
              onChangeText={text => this.setState({ email: text })}
              placeholder={"Enter Email"}
              placeholderTextColor={"#21368b"}
            />
            <TextInput
              style={styles.textinput}
              onChangeText={text => this.setState({ password: text })}
              placeholder={"Enter Password"}
              placeholderTextColor={"#21368b"}
              secureTextEntry
            />
            <TextInput
              style={styles.textinput}
              onChangeText={text => this.setState({ confirmPassword: text })}
              placeholder={"Re-enter Password"}
              placeholderTextColor={"#21368b"}
              secureTextEntry
            />
            <TouchableOpacity
              style={[styles.button, { marginTop: 20 }]}
              onPress={() => this.registerUser(email, password, confirmPassword,first_name,last_name)}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>    
            <TouchableOpacity
              onPress={()=>this.props.navigation.replace("Login")}
            >
              <Text style={styles.buttonTextNewUser}>Already have an account?</Text>
            </TouchableOpacity>         
        </View>
      );
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems:"center",
    justifyContent:"center",
    borderColor: "#21368b",
    borderWidth: RFValue(12),
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitleText: {
    color: "#21368b",
    textAlign: "center",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
    marginBottom:RFValue(20)
  },
  textinput: {
    width:  RFValue(250),
    height: RFValue(50),
    padding: RFValue(10),
    marginTop:RFValue(15),
    borderColor: "#21368b",
    borderWidth: RFValue(4),
    borderRadius: RFValue(10),
    fontSize: RFValue(20),
    color: "#21368b",
    backgroundColor: "white",
    fontFamily: "Bubblegum-Sans"
  },
  button: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: RFValue(30),
    backgroundColor: "#faa324",
    marginBottom:RFValue(20)
  },
  buttonText: {
    fontSize: RFValue(24),
    color: "white",
    fontFamily: "Bubblegum-Sans"
  },
  buttonTextNewUser: {
    fontSize: RFValue(18),
    color: "#21368b",
    fontFamily: "Bubblegum-Sans",
  }
});