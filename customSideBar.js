import React from "react";
import {View, StyleSheet, Image} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";
import firebase from "firebase";

import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";

export default class CustomSidebarMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true
    };
  }

  componentDidMount() {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", function(snapshot) {
        theme = snapshot.val().current_theme;
      });
    this.setState({ light_theme: theme === "light"});
  }

  render() {
    let props = this.props;
    return (
      <View style={{flex: 1, backgroundColor:"white"}}>
        <Image
          source={require("../assets/icon.png")}
          style={styles.sideMenuProfileIcon}
        ></Image>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: RFValue(240),
    height: RFValue(240),
    borderRadius: RFValue(70),
    alignSelf: "center",
  }
});
