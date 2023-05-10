import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase'

export default class ExpFoodCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
    };
  }

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', (snapshot) => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === 'light' });
      });
  };

  componentDidMount() {
    this.fetchUser();
  }
  render(){
    return(
      <TouchableOpacity style={styles.container} onPress={()=>{this.props.navigation.navigate('FoodScreen', {food:this.props.food})}}>
        <View style={this.state.light_theme ? styles.cardContainerLight : styles.cardContainer}>
          <View style={styles.itemContainer}>
              <Text style={this.state.light_theme ? styles.itemNameTextLight : styles.itemNameText}>{this.props.food.item}</Text>
          </View>

          <View style={styles.expContainer}>
            <Text style={styles.expText}>{this.props.food.exp}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: RFValue(200),
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#21368b",
    borderRadius: RFValue(20),
    borderColor: "white",
    borderWidth: RFValue(4),
  },
  cardContainerLight: {
    margin: RFValue(13),
    backgroundColor: "white",
    borderRadius: RFValue(20),
    borderColor: "#21368b",
    borderWidth: RFValue(4),
  },
  expContainer: {
    justifyContent: "center",
    alignItems:'center'
  },
  itemNameText: {
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
    color: "white",
  },
  itemNameTextLight: {
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
    color: "#21368b"
  },
  itemContainer: {
    fontFamily: "Bubblegum-Sans",
    color: "white",
    justifyContent: "center",
    alignItems:'center'
  },
  expText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(20),
    paddingTop: RFValue(10),
    paddingBottom: RFValue(5),
    color:'#faa324'
  },
  foodImage: {
     resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(400)
  },
});