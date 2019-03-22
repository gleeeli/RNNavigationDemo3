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

export default class NMTextInputView extends React.Component {
    render () {
        return (
            <View style ={this.props.style}>
                <TextInput style = {{flex:1}}
                    placeholder={this.props.placeholder}
                    fontSize = {this.props.fontSize}
                    secureTextEntry={this.props.secureTextEntry}
                    onChangeText= {this.props.onChangeText}
                    clearButtonMode = {this.props.clearButtonMode}
                    value = {this.props.value}
                />
                <View style ={{backgroundColor:"#D8D8D8",height:1}}></View>
            </View>
        )
    }
}

//右边带按钮
export class NMRightBtnTextInputView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {curSecond:60,isGetIngCode:false};
    }

    getCodeFromeService =() =>{
        this.setState({
            isGetIngCode:true
        });
        // 每1000毫秒对showText状态做一次取反操作
        setInterval(() => {
            //previousState 前一个状态，或理解为当前状态的值
            this.setState(previousState => {
                return { curSecond: previousState.curSecond - 1 };
              });
              if(this.state.curSecond == 0){
                this.setState({
                    isGetIngCode:false
                });
                clearInterval;
              }
        }, 1000);
      }

    render () {
        var nowRightName ='';
        if (this.state.isGetIngCode) {//正在获取验证码
            nowRightName = '倒计时'+ this.state.curSecond + '秒';
        }else {
            nowRightName = this.props.rightName;
        }
        return (
            <View style ={this.props.style}>
            <View style = {{flex:1,flexDirection:'row'}}>
                <TextInput style = {{flex:1}}
                        placeholder={this.props.placeholder}
                        placeholderTextColor = '#C5C9CD'
                        fontSize = {this.props.fontSize}
                        secureTextEntry={this.props.secureTextEntry}
                        onChangeText= {this.props.onChangeText}
                        clearButtonMode = {this.props.clearButtonMode}
                        value = {this.props.value}
                    />
                    <View style = {styles.rightBtn}>
                        <Button title = {nowRightName} 
                        color='#F7473A' 
                        fontSize={16}
                        onPress ={this.getCodeFromeService}
                        />
                    </View>
                    
            </View>
                
                <View style ={{backgroundColor:"#D8D8D8",height:1}}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rightBtn: {
        fontSize:16,
        color:'#F7473A',
        borderStyle:'solid',
        borderLeftWidth:1,
        borderLeftColor:'#D8D8D8',
        justifyContent:'center',
        // height:23,
        alignItems: 'center',
        marginTop:10,
        marginBottom:10,
        // backgroundColor:'red',
    }
});