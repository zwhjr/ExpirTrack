import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Switch,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: false,
      light_theme: true,
      profile_image: '',
      name: '',
    };
  }

  toggleSwitch() {
    const previous_state = this.state.isEnabled;
    const theme = !this.state.isEnabled ? 'dark' : 'light';
    var updates = {};
    updates['/users/' + firebase.auth().currentUser.uid + '/current_theme'] =
      theme;
    firebase.database().ref().update(updates);
    this.setState({ isEnabled: !previous_state, light_theme: previous_state });
  }

  componentDidMount() {
    this.fetchUser();
  }

  async fetchUser() {
    let theme, name, image;
    await firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', function (snapshot) {
        theme = snapshot.val().current_theme;
        name = `${snapshot.val().first_name} ${snapshot.val().last_name}`;
        image = snapshot.val().profile_picture;
      });
    this.setState({
      light_theme: theme === 'light' ? true : false,
      isEnabled: theme === 'light' ? false : true,
      name: name,
      profile_image: image,
    });
  }

  render() {
    SplashScreen.hideAsync();
    return (
      <View
        style={
          this.state.light_theme ? styles.containerLight : styles.container
        }>
        <SafeAreaView style={styles.droidSafeArea} />

        <View style={styles.appIcon}>
          <Image
            source={
              this.state.light_theme
                ? require('../assets/icon.png')
                : require('../assets/icon_dark.png')
            }
            style={styles.iconImage}></Image>
          <Text
            style={
              this.state.light_theme
                ? styles.appTitleTextLight
                : styles.appTitleText
            }>
            ExpirTrack
          </Text>
        </View>

        <View style={styles.screenContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('../assets/profile.jpg')}
              style={styles.profileImage}></Image>
            <Text
              style={
                this.state.light_theme ? styles.nameTextLight : styles.nameText
              }>
              {this.state.name}
            </Text>
          </View>
          <View style={styles.themeContainer}>
            <Text
              style={
                this.state.light_theme
                  ? styles.themeTextLight
                  : styles.themeText
              }>
              Dark Theme
            </Text>

            <Switch
              style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
              trackColor={{
                false: '#767577',
                true: this.state.light_theme ? '#eee' : 'white',
              }}
              thumbColor={this.state.isEnabled ? '#ee8249' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => this.toggleSwitch()}
              value={this.state.isEnabled}
            />
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
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: 'row',
  },
  appIcon: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: RFValue(30),
  },
  iconImage: {
    width: RFValue(100),
    height: RFValue(100),
    resizeMode: 'contain',
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(35),
    fontFamily: 'Bubblegum-Sans',
  },
  appTitleTextLight: {
    color: '#21368b',
    fontSize: RFValue(35),
    fontFamily: 'Bubblegum-Sans',
  },
  screenContainer: {
    flex: 0.85,
  },
  profileImageContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RFValue(60),
  },
  profileImage: {
    width: RFValue(140),
    height: RFValue(140),
    borderRadius: RFValue(70),
  },

  nameText: {
    color: 'white',
    fontSize: RFValue(40),
    fontFamily: 'Bubblegum-Sans',
    marginTop: RFValue(10),
  },
  nameTextLight: {
    color: '#21368b',
    fontSize: RFValue(40),
    fontFamily: 'Bubblegum-Sans',
    marginTop: RFValue(10),
  },
  themeContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: RFValue(220),
  },
  themeText: {
    color: 'white',
    fontSize: RFValue(30),
    fontFamily: 'Bubblegum-Sans',
    marginRight: RFValue(15),
  },
  themeTextLight: {
    color: '#21368b',
    fontSize: RFValue(30),
    fontFamily: 'Bubblegum-Sans',
    marginRight: RFValue(15),
  },
});
