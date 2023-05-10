import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from 'firebase';

export default class CreateItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImage: 'fruits',
      dropdownHeight: 40,
      light_theme: true,
    };
  }

  async addFood() {
    if (this.state.item && this.state.exp && this.state.quantity) {
      var d = new Date();
      var foodData = {
        preview_image: this.state.previewImage,
        item: this.state.item,
        exp: this.state.exp,
        quantity: this.state.quantity,
        author: firebase.auth().currentUser.displayName,
        created_on: d.toString(),
        author_uid: firebase.auth().currentUser.uid,
      };
      console.log(foodData);
      await firebase
        .database()
        .ref("/food/" + (Math.random().toString(36).slice(2)))
        .set(foodData)
        .then(function (snapshot) {});
      this.props.setUpdateToTrue();
      this.props.navigation.navigate('Home');
    } else {
      alert(
        'Error, All fields are required!',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    }
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
    let preview_images = {
      fruits: require('../assets/fruits.jpg'),
      veggies: require('../assets/veggies.jpg'),
      meat: require('../assets/meat&poultry.jpg'),
      dairy: require('../assets/dairy.jpg'),
      grains: require('../assets/grains.jpg'),
      sweets: require('../assets/sweets.jpg'),
    };
    return (
      <View style={this.state.light_theme ? styles.containerLight : styles.container}>
        <TouchableOpacity
          style={{ paddingRight: 260 }}
          onPress={() => {
            this.props.navigation.navigate('Home');
          }}>
          <Ionicons
            name={'caret-back-outline'}
            size={RFValue(70)}
            color="orange"
          />
        </TouchableOpacity>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.appIcon}>
          <Image
            source={this.state.light_theme
                ? require('../assets/icon.png')
                : require('../assets/icon_dark.png')
            }
            style={styles.iconImage}></Image>
          <Text style={this.state.light_theme ? styles.appTitleTextLight : styles.appTitleText}>Create Item</Text>
        </View>
        <View style={styles.fieldsContainer}>
          <Image
            source={preview_images[this.state.previewImage]}
            style={styles.previewImage}></Image>
          <View style={{ height: RFValue(this.state.dropdownHeight), width:RFValue(350), marginBottom:RFValue(25) }}>
            <DropDownPicker
              items={[
                { label: 'Fruits', value: 'fruits' },
                { label: 'Veggies', value: 'veggies' },
                { label: 'Meat & Poultry', value: 'meat' },
                { label: 'Dairy', value: 'dairy' },
                { label: 'Grains', value: 'grains' },
                { label: 'Sweets', value: 'sweets' },
              ]}
              defaultValue={this.state.previewImage}
              open={this.state.dropdownHeight == 170 ? true : false}
              onOpen={() => {
                this.setState({ dropdownHeight: 170 });
              }}
              onClose={() => {
                this.setState({ dropdownHeight: 40 });
              }}
              style={{
                backgroundColor: 'white',
                borderWidth: RFValue(4),
                borderColor: '#21368b',
              }}
              placeholder='Select a picture'
              textStyle={{
                color: '#21368b',
                fontFamily: 'Bubblegum-Sans',
              }}
              onSelectItem={(item) => {
                this.setState({
                  previewImage: item.value,
                });
              }}
            />
          </View>
            <TextInput
              style={this.state.light_theme ? styles.inputFontLight : styles.inputFont}
              placeholder={'Item Name'}
              onChangeText={(item) => {
                this.setState({ item });
              }}
            />
            <TextInput
              style={this.state.light_theme ? styles.inputFontLight : styles.inputFont}
              placeholder={'Expiry Date'}
              onChangeText={(exp) => {
                this.setState({ exp });
              }}
            />
            <TextInput
              style={this.state.light_theme ? styles.inputFontLight : styles.inputFont}
              placeholder={'Quantity: 1 bag, 3 bushels, etc.'}
              onChangeText={(quantity) => {
                this.setState({ quantity });
              }}
            />
            <TouchableOpacity style={this.state.light_theme ? styles.addButtonLight : styles.addButton} onPress={()=>{this.addFood()}}>
              <Text style={this.state.light_theme ? styles.addButtonTextLight : styles.addButtonText}>Add</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    background: 'white',
    borderColor: '#21368b',
    borderWidth: RFValue(12),
    borderRadius: RFValue(10),
    alignItems: 'center',
  },
  container: {
    flex: 1,
    background: '#21368b',
    borderColor: 'white',
    borderWidth: RFValue(12),
    borderRadius: RFValue(10),
    alignItems: 'center',
  },
  fieldsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '93%',
    height: RFValue(250),
    alignSelf: 'center',
    borderRadius: RFValue(10),
    resizeMode: 'contain',
  },
  appIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: RFValue(-80),
  },
  iconImage: {
    width: RFValue(90),
    height: RFValue(90),
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
  inputFont: {
    height: RFValue(60),
    width: RFValue(350),
    justifyContent: 'center',
    marginTop: RFValue(20),
    borderColor: 'white',
    borderWidth: RFValue(4),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: 'white',
    fontFamily: 'Bubblegum-Sans',
  },
  inputFontLight: {
    height: RFValue(60),
    width: RFValue(350),
    justifyContent: 'center',
    marginTop: RFValue(20),
    borderColor: '#21368b',
    borderWidth: RFValue(4),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: '#21368b',
    fontFamily: 'Bubblegum-Sans',
  },
  addButton: {
    width: RFValue(250),
    height: RFValue(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(30),
    backgroundColor: 'white',
    marginTop: RFValue(20),
    marginBottom: RFValue(20),
    
  },
  addButtonLight: {
    width: RFValue(250),
    height: RFValue(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(30),
    backgroundColor: '#21368b',
    marginTop: RFValue(20),
    marginBottom: RFValue(20)
  },
  addButtonText: {
    fontSize: RFValue(24),
    color: '#21368b',
    fontFamily: 'Bubblegum-Sans',
  },
  addButtonTextLight: {
    fontSize: RFValue(24),
    color: 'white',
    fontFamily: 'Bubblegum-Sans',
  },
});
