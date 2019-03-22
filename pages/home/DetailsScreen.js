
import React from "react"; 
import { View, Text,Button,ScrollView } from "react-native";
import CodeUtil from './../util/CodeUtil'

export default class DetailsScreen extends React.Component {

    static navigationOptions = ({ navigation, navigationOptions }) => {
        // const { params } = navigation.state;
    
        return {
          title: '详情页',
          /* These values are used instead of the shared configuration! */
          headerStyle: {
            backgroundColor: navigationOptions.headerTintColor,
          },
          headerTintColor: navigationOptions.headerStyle.backgroundColor,
        };
      };

      

    render() {

      const md5Str = CodeUtil.getMd5('123456');

      return (
        <View style={{ flex: 1}}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Text>Md5加密测试：{md5Str}</Text>
            <Button
              title="Go to Details... again"
              onPress={() => this.props.navigation.push('Details')}/>
        </View>
        <ScrollView style={{ flex: 1,paddingLeft:10}}>
        <Button
              title="react-native调OC的原生方法"
              onPress={() => this.props.navigation.push('LinkOCS')}/>
        </ScrollView>
        </View>
      );
    }
  }