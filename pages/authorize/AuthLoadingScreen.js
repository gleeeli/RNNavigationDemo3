import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import AsyncStorage from 'react-native-async-storage';


export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userinfo = await AsyncStorage.using('userinfo');
    console.log('用户token:'+ userinfo.data.token + "全部信息:" + userinfo.data);
    // 这里决定跳转登录还是登录成功
    this.props.navigation.navigate(userinfo.data.token ? 'App' : 'Auth');
    // this.props.navigation.navigate('Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}