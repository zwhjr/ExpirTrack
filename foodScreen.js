import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';

export default class FoodScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      light_theme: true,
      fontsLoaded: false,
      userSignedIn: false,
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

  render() {
    return (
      <View
        style={
          this.state.light_theme ? styles.containerLight : styles.container
        }>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Home');
          }}>
          <Ionicons
            name={'caret-back-outline'}
            size={RFValue(70)}
            color="orange"
          />
        </TouchableOpacity>

        <View style={styles.appIcon}>
          <Image
            style={styles.iconImage}
            source={
              this.state.light_theme
                ? require('../assets/icon.png')
                : require('../assets/icon_dark.png')
            }
          />
          <Text
            style={
              this.state.light_theme
                ? styles.appTitleTextLight
                : styles.appTitleText
            }>
            ExpirTrack
          </Text>
        </View>

        <View
          style={
            this.state.light_theme ? styles.foodCardLight : styles.foodCard
          }>
          <Image
            source={require('../assets/fruits.jpg')}
            style={styles.image}></Image>
          <View style={this.state.light_theme ? styles.infoLight : styles.info}>
            <Text
              style={
                this.state.light_theme
                  ? styles.foodTitleTextLight
                  : styles.foodTitleText
              }>
              Item: {this.props.route.params.food.item}
            </Text>
            <Text
              style={
                this.state.light_theme
                  ? styles.foodTitleTextLight
                  : styles.foodTitleText
              }>
              Quantity: {this.props.route.params.food.quantity}
            </Text>
            <Text
              style={
                this.state.light_theme
                  ? styles.foodTitleTextLight
                  : styles.foodTitleText
              }>
              Expiry Date: {this.props.route.params.food.exp}
            </Text>
          </View>
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.trashButton}>
              <Ionicons
                name={'trash-sharp'}
                size={RFValue(30)}
                color={'white'}
              />
            </TouchableOpacity>
          </View>
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
    borderWidth: RFValue(12),
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: '#21368b',
    borderWidth: RFValue(12),
  },
  info: {
    flex: 1,
    width:RFValue(340),
    backgroundColor: '#21368b',
    borderColor: 'white',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: RFValue(10),
  },
  infoLight: {
    flex: 1,
    width:RFValue(340),
    backgroundColor: 'white',
    borderColor: 'white',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: RFValue(10),
  },
  appIcon: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: RFValue(-60),
  },
  iconImage: {
    width: RFValue(100),
    height: RFValue(100),
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(28),
    fontFamily: 'Bubblegum-Sans',
  },
  appTitleTextLight: {
    color: '#21368b',
    fontSize: RFValue(28),
    fontFamily: 'Bubblegum-Sans',
  },
  image: {
    width: '90%',
    alignSelf: 'center',
    height: '50%',
    borderRadius: RFValue(10),
    marginBottom: RFValue(20),
    marginTop:RFValue(20),
  },
  foodCard: {
    flex: 1,
    margin: RFValue(20),
    backgroundColor: 'white',
    borderRadius: RFValue(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodCardLight: {
    flex: 1,
    margin: RFValue(20),
    backgroundColor: '#21368b',
    borderRadius: RFValue(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodTitleText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(25),
    color: 'white',
    marginBottom: RFValue(20),
  },
  foodTitleTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(25),
    color: '#21368b',
    marginBottom: RFValue(20),
  },
  actionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: RFValue(10),
  },
  trashButton: {
    width: RFValue(100),
    height: RFValue(50),
    backgroundColor: '#eb3948',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(30),
  },
});
