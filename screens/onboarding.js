import React, { Component } from 'react';
import { Pressable, View, Alert, ImageBackground, Text, Image, StatusBar, StyleSheet } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import AsyncStorage from '@react-native-community/async-storage';
import RNExitApp from 'react-native-exit-app';
import AppIntroSlider from 'react-native-app-intro-slider';
import axios from 'axios';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/Ionicons';

export default class OnboardingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onboardingDictionary: [],
    }
    this.createAlert = this.createAlert.bind(this);
  }

  componentDidMount() {
    setTimeout(() => SplashScreen.hide(), 1000);
    this.handleRequest();
}

  async handleRequest() {
    const instance = axios.create({
      baseURL: 'http://jadookijhappi.com/pubgrub/apis/',
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
      "You must be 25 or older to enter this App.",
      [
        {
          text: "Cancel",
          onPress: () => RNExitApp.exitApp(),
          style: "cancel"
        },
        { text: "OK", onPress: () => { AsyncStorage.setItem('user_id', 'true') } }
      ],
      { cancelable: false }
    );

  _renderItem = (item, key) => {
    return (
      <ImageBackground style={{width: '100%', height: '100%'}}source={require('../res/OnboardingNew.jpg')}>
        <View style={{height: '50%'}}>
          {console.log(item)}
          <Image source={{ uri: item.item.Onboarding.image}} style={{width: '100%', height: "100%", margin: '15%', resizeMode:'stretch', alignSelf: "center"}}/>
        </View>
        <View style={{flex: 1, height: '45%'}}>
        <Text style={{marginHorizontal: "5%", marginTop: '30%', fontSize: 16}}>{item.item.Onboarding.description}</Text>
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
          color="rgba(0, 0, 0, 1)"
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
          color="rgba(0, 0, 0, 1)"
          size={24}
        />
      </View>
    );
  };

  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar />
        {this.createAlert()}
        <AppIntroSlider
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          data={this.state.onboardingDictionary}
          renderDoneButton={this._renderDoneButton}
          renderNextButton={this._renderNextButton}
          onDone={this._onDone}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(96, 51, 14, 1)",
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});