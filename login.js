import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Text
} from "react-native";

import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

const appIcon = require("../assets/icon.png");


export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      light_theme: true,
      fontsLoaded: false,
      userSignedIn: false
    };
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  signIn = async (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.replace("Dashboard");
      })
      .catch(error => {
        alert(error.message);
      });
  };


  render() {
      const { email, password } = this.state;
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />

          <Text style={styles.appTitleText}>ExpirTrack</Text>
          <Image source={appIcon} style={styles.appIcon}/>

          <TextInput
            style={styles.textinput}
            onChangeText={text => this.setState({ email: text })}
            placeholder={"Enter Email"}
            placeholderTextColor={"#21368b"}
            autoFocus
          />
          <TextInput
            style={[styles.textinput, { marginTop: 20 }]}
            onChangeText={text => this.setState({ password: text })}
            placeholder={"Enter Password"}
            placeholderTextColor={"#21368b"}
            secureTextEntry
          />
          <TouchableOpacity
            style={[styles.button, { marginTop: 20 }]}
            onPress={() => this.signIn(email, password)}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("RegisterScreen")}
          >
            <Text style={styles.buttonTextNewUser}>New User?</Text>
          </TouchableOpacity>
        </View>
      );
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#21368b",
    borderWidth: RFValue(12),
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appIcon: {
    width: RFValue(250),
    height: RFValue(250),
  },
  appTitleText: {
    color: "#21368b",
    textAlign: "center",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
  },
  textinput: {
    width: RFValue(250),
    height: RFValue(50),
    padding: RFValue(10),
    borderColor: "#21368b",
    borderWidth: RFValue(4),
    borderRadius: RFValue(10),
    fontSize: RFValue(20),
    backgroundColor: "#white",
    color: "#21368b",
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
    marginBottom: RFValue(20)
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
