import React from 'react';
import {
  ActivityIndicator,
  View, Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class LoginAuth extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('user_id');
    console.log(userToken);
    this.props.navigation.navigate(userToken ? 'Home' : 'Onboarding');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }} >
        <ActivityIndicator large />
      </View>
    );
  }
}