import React from "react"; 
import { View, Text,Button } from "react-native";
import {NativeModules} from 'react-native';
import AsyncStorage from 'react-native-async-storage';

export default class LinkOCScreen extends React.Component {

    constructor(props) {
        super(props);
     
        this.state = {events:['当前无点击']}
        
      }
    
    componentDidMount() {
        this.sendMsgToOC();
    }

    //给OC发送消息
    sendMsgToOC = async() => {
        const CalendarManager = NativeModules.CalendarManager;
        const value = await AsyncStorage.using('userinfo')
        const name = value.data.realName;
        CalendarManager.addEvent('Birthday Party', {userName:name},(error, events) => {
            if (error) {
              console.error(error);
            } else {
              this.setState({events: events});
            }
          });
      }


    render() {
        const CalendarManager = NativeModules.CalendarManager;
        return (
            <View style = {{flex:1, justifyContent:'flex-start',alignItems:'center'}}>
                <Text>LinkOC Screen</Text>
                <Text>Oc返回的点击结果：{this.state.events[0]}</Text>
                <Text>Oc里的常量：{CalendarManager.OCConstVariable}</Text>
            </View>
        )
    }
}