
import React from "react"; 
import { View, Text,Button,StatusBar,Platform,ScrollView,Image } from "react-native"; 
import DetailsScreen from './DetailsScreen'
import AsyncStorage from 'react-native-async-storage';

export default class HomeScreen extends React.Component {
 constructor(props) {
   super(props);

   this.state = {userinfo:{realName:'test'}}

   this.initvalue();
   
 }

  initvalue = async() => {
    const value = await AsyncStorage.using('userinfo')
    this.setState({
      userinfo:value.data
    });
    // this.state = {userinfo:value.data}
    console.log('gl的值:'+JSON.stringify(value.data));
  }

  componentDidMount() {
    const isAndroid = Platform.OS === 'android';
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      isAndroid && StatusBar.setBackgroundColor('#6a51ae');
      // StatusBar.setBarStyle('dark-content');
      // isAndroid && StatusBar.setBackgroundColor('#ecf0f1');
    });
  }

      static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
    
        return {
          title: '首页',
          headerLeft: (
            <Button
              onPress={() => navigation.navigate('MyModal')}
              title="Info"
              color="#fff"
            />
          ),
          /* the rest of this config is unchanged */
        };
    }

    render() {

      console.log('渲染时的值:'+JSON.stringify(this.state.userinfo));
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Home Screen</Text>
          <Button
            title="Go to Details"
            onPress={() => this.props.navigation.navigate('Details')}
          />
          <Button
            title="Go to Custom"
            onPress={() => this.props.navigation.navigate('Custom')}
          />
          <Button
          onPress={() => this.props.navigation.navigate('MyModal')}
          title="Modal"
          color="steelblue"
        />
        <View style={{justifyContent: 'center', alignItems: 'center' }}>
        <Button
          title="Go to Settings"
          onPress={() => this.props.navigation.navigate('Settings')}
        />
      </View>
      <Image source={{uri:this.state.userinfo.headImgUrl}} style={{width: 50, height: 50,borderRadius:25,marginTop:10,backgroundColor:'lightgray'}} />
      <Text style ={{marginTop:10}}>欢迎你：{this.state.userinfo.realName}老师</Text>
      <Text style ={{marginTop:5}}>来自学校：{this.state.userinfo.schoolName}</Text>
        <Text style ={{marginTop:20}}>如果我们将 DetailsScreen渲染为HomeScreen的子项，那么DetailsScreen将不会拥有navigation，下面的跳转将报错</Text>
        <DetailsScreen />
        </View>
      );
    }
  }