import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FoodCard from './foodCard';
import ExpFoodCard from './expFoodCard'
import firebase from 'firebase';

var food = require('../temp_posts.json');

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      food: [],
      light_theme: true,
    };
  }

  componentDidMount() {
    this.fetchFood();
    this.fetchUser();
  }

  fetchFood = () => {
    firebase
      .database()
      .ref('/food/')
      .on(
        'value',
        (snapshot) => {
          let food = [];
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function (key) {
              food.push({
                key: key,
                value: snapshot.val()[key],
              });
            });
          }
          this.setState({ food: food });
          this.props.setUpdateToFalse();
        },
        function (errorObject) {
          console.log('The read failed: ' + errorObject.code);
        }
      );
  };

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
  
  renderItem = ({ item: food }) => {
    return <FoodCard food={food} navigation={this.props.navigation} />;
  };

  renderExpItem = ({ item: food }) => {
    return <ExpFoodCard food={food} navigation={this.props.navigation} />;
  };

  render() {
    return (
      <View style={this.state.light_theme ? styles.containerLight : styles.container}>
        <View style={this.state.light_theme ? styles.feedContaineright : styles.feedContainer}>
          <View style={styles.feedTextContainer}>
            <Text style={this.state.light_theme ? styles.feedTextLight : styles.feedText}>What's Expiring Soon</Text>
          </View>
          <FlatList
            data={food}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderExpItem}
            horizontal={true}
          />
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.createContainer}>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => {
                this.props.navigation.navigate('CreateItem');
              }}>
              <Ionicons name={'add-outline'} size={RFValue(50)} color={'white'} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={food}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            horizontal={true}
            contentContainerStyle={{
              flexDirection: 'column',
              flexWrap: 'wrap',
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21368b',
    borderColor: 'white',
    borderWidth: RFValue(8),
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: '#21368b',
    borderWidth: RFValue(8),
  },
  cardContainer: {
    flex: 1,
  },
  feedContainer: {
    flex: 0.5,
    justifyContent: 'center',
    backgroundColor: '#21368b',
    borderColor: 'white',
  },
  feedContaineright: {
    flex: 0.5,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: '#21368b',
  },
  createContainer:{
    marginTop:RFValue(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    width: "90%",
    height: RFValue(50),
    backgroundColor: '#faa324',
    borderColor: '#faa324',
    borderWidth: RFValue(4),
    borderRadius: RFValue(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedText: {
    fontSize: RFValue(27),
    color: 'white',
    fontFamily: 'Bubblegum-Sans',
  },
  feedTextLight: {
    fontSize: RFValue(27),
    color: '#21368b',
    fontFamily: 'Bubblegum-Sans',
  },
  feedTextContainer: {
    marginTop: RFValue(5),
    alignItems: 'center',
  },
});
