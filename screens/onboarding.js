import React, { Component } from 'react';
import { Pressable, View, Alert, ImageBackground, Text, Image, StatusBar, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RNExitApp from 'react-native-exit-app';
import AppIntroSlider from 'react-native-app-intro-slider';
import axios from 'axios';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DeviceInfo from 'react-native-device-info';

export default class OnboardingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onboardingDictionary: [],
    }
    // this.createAlert = this.createAlert.bind(this);
  }

  componentDidMount() {
    let uniqueId = DeviceInfo.getUniqueId();
    console.log(uniqueId);
    this.handleDeviceId(uniqueId);
    this.createAlert();
    this.handleRequest();
}

  async handleDeviceId(data) {
    AsyncStorage.setItem('device_token', data);
    const instance = axios.create({
      baseURL: 'https://jadookijhappi.com/pubgrub/apis/',
      timeout: 5000,
    });
    const payload = new FormData();
    payload.append("device_token", data)
    await instance
      .post('userCreate', payload)
      .then(response => {
        this.setState({ device_id : response.data.user_id });
        console.log(this.state.device_id);
        AsyncStorage.setItem('device_id', JSON.stringify(this.state.device_id));
      })
      .catch(error => {
        console.log(error);
        if (error.response) {
          console.log("error data" + error.response.data);
          console.log("error status" + error.response.status);
          console.log("error header" + error.response.headers);
        } else if (error.request) {
            console.log("error request" + error.request);
          this.refs.toast.show('Network Error');
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }

  async handleRequest() {
    const instance = axios.create({
      baseURL: 'https://jadookijhappi.com/pubgrub/apis/',
      timeout: 5000,
    });
    await instance
      .post('onboarding')
      .then(response => {
        this.setState({ onboardingDictionary : response.data });
        
        console.log(this.state.onboardingDictionary);
      })
      .catch(error => {
        console.log(error);
        if (error.response) {
          console.log("error data" + error.response.data);
          console.log("error status" + error.response.status);
          console.log("error header" + error.response.headers);
        } else if (error.request) {
            console.log("error request" + error.request);
          this.refs.toast.show('Network Error');
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }

  createAlert = () =>
    Alert.alert(
      "Welcome!",
      "You must be of the legal drinking age to proceed further.",
      [
        {
          text: "Cancel",
          onPress: () => RNExitApp.exitApp(),
          style: "cancel"
        },
        { text: "OK", onPress: () => { AsyncStorage.setItem('user_id', 'true'); SplashScreen.hide() } }
      ],
      { cancelable: false }
    );

  _renderItem = (item, key) => {
    return (
      <ImageBackground style={{width: '100%', height: '100%'}}source={require('../res/OnboardingNew.jpg')}>
        <View style={{height: hp('60%')}}>
          {console.log(item)}
          <Image source={{ uri: item.item.Onboarding.image}} style={{width: '90%', height: "100%", margin: '5%',marginTop: '10%', resizeMode:'stretch', borderRadius:25}}/>
        </View>
        <View style={{flex: 1, height: hp('25%')}}>
        <Text style={{marginHorizontal: "5%", marginTop: '25%', fontSize: 16}}>{item.item.Onboarding.description}</Text>
        </View>
      </ImageBackground>
    );
  };

  _keyExtractor = (item) => item.text;

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-arrow-forward"
          backgroundColor="#f7941d"
          color="#FFFFFF"
          size={24}
        />
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-checkmark"
          backgroundColor="#f7941d"
          color="#FFFFFF"
          size={24}
        />
      </View>
    );
  };

  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.props.navigation.replace('Home')
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <StatusBar />
        {this.createAlert()}
        <AppIntroSlider
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          data={this.state.onboardingDictionary}
          renderDoneButton={this._renderDoneButton}
          renderNextButton={this._renderNextButton}
          onDone={this._onDone}
          dotStyle={{backgroundColor: 'rgba(0, 0, 0, 0)'}}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: "#f7941d",
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});