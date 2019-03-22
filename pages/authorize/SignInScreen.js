import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Image,
} from 'react-native';
import AsyncStorage from 'react-native-async-storage';
import { SafeAreaView } from 'react-navigation';
import NMTextInputView,{NMRightBtnTextInputView} from './cell/NMTextInputView'
import CodeUtil from './../util/CodeUtil'

export default class SignInScreen extends React.Component {
    static navigationOptions = {
      title: 'Please sign in',
    };

    constructor(props) {
      super(props);
      this.state = { userName: '18207550198',password:'123456',isLoading: false,result:''};
    }
  
    render() {
      if(this.state.isLoading){
        return(
          <View style={{flex: 1,justifyContent:'center', padding: 20}}>
            <ActivityIndicator 
            // style={{backgroundColor:'black'}}
            size="large"
            />
          </View>
        )
      }

      return (
          <SafeAreaView style={styles.mysafeContainerView} 
        //   forceInset={{ bottom: 'never' }}//底部除去安全区域
          >
          <View style={{justifyContent:'center',alignItems:'center',marginTop:49}}>
          <Image source={require('./../../images/logo.png')} style={{ width: 80, height: 80 }}/>
          </View>
          
          <NMTextInputView 
            style={[styles.inputView,{marginTop:42}]}
            placeholder="输入用户名"
            value = {this.state.userName}
            clearButtonMode = 'while-editing'
            fontSize = {19}
            onChangeText={(text) => this.setState({userName:text})}
          />
          <NMRightBtnTextInputView
            style={styles.inputView} 
            placeholder="输入验证码"
            value = {this.state.password}
            secureTextEntry={true}
            rightName = '输入验证码'
            fontSize = {19}
            onChangeText={(text) => this.setState({password:text})}
          />
            <View 
            style={{justifyContent:'center',
            alignItems:'center',
            backgroundColor:'yellow',
            borderRadius:10,
            height:47,
            marginTop:73,marginLeft:28,marginRight:28}}>
                <Button
                onPress={this._signInAsync}
                title="登录"
                color="#222222"
                fontSize = {18}
                accessibilityLabel="Learn more about this purple button"
                />
            </View>
            <Text>返回结果:{this.state.result}</Text>
            <View style = {styles.bottomView}>

            </View>
            
            {/* <Text style={styles.bottomText}>
            no safe bottom 
            </Text> */}
          </SafeAreaView>
      );
    }
  
    _signInAsync = () => {
      // await AsyncStorage.save('userToken','abc');
      // this.props.navigation.navigate('App');

      this.setState({
        isLoading:true
      });

      //请求数据
      let URL_main = 'http://121.199.24.124:3200/';
      let URL_user_login = 'signIn';
      let password = CodeUtil.getMd5(this.state.password)
      console.log('用户名:'+ this.state.userName + '密码:'+ password)

      return fetch(URL_main + URL_user_login, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: this.state.userName,
          password: password,
          // password: '12346',
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          // dataSource: responseJson,
          result:JSON.stringify(responseJson.retobj),
        }, function(){

        });
        console.log(responseJson.retobj);
        if (responseJson.errcode == 0){//登录成功
         AsyncStorage.save('userinfo',responseJson.retobj)
         
         .then((value)=>{
            this.props.navigation.navigate('App');
         })
          
        }else {
          alert(responseJson.errmsg);
        }
        
      })
      .catch((error) =>{
        console.error(error);
        alert(error);
      });

      //请求数据 end
    };
  }

  const styles = StyleSheet.create({
    mysafeContainerView:{
        flex:1,
        // justifyContent: 'flex-end',//主轴
        alignItems:'stretch',//侧轴
        backgroundColor:'white',
      },
      bottomView: {
        flex:1,
        backgroundColor:'blue',
      },
       bottomText: {
        width:'100%',
        height:64,
        lineHeight:64,
        textAlign:'center',
        // justifyContent: 'center',
        // flexDirection:'column',
        // alignSelf:'stretch',//flex-end center flex-start 单独侧轴
        backgroundColor:'green',
        position:'absolute',
        bottom:0,
        color:'white',
        },
        inputView: {
          height: 57,
          // backgroundColor:'#F5FCFF',
          marginLeft:28,
          marginTop:10,
          marginRight:28,
        }
  });


  /*
  flex-start：与父组件的顶部对齐。
flex-end：与父组件的底部对齐。
center：处于父容器的中间位置。
stretch：竖直上填充整个容器。

clientType = 3;
    password = e10adc3949ba59abbe56e057f20f883e;
    userName = 18207550198;
  */