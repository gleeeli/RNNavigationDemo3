import React from "react"; 
import { View, Text,Button,StatusBar,Platform } from "react-native"; 
import AsyncStorage from 'react-native-async-storage';

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: '设置',
      };

      static navigationOptions = ({ navigation }) => {
        return {
          title: '设置',
          headerRight: (
            <Button
            onPress={() => {AsyncStorage.save('userinfo',null);navigation.navigate('Auth');}
            // navigation.navigate('Auth');???
          }
              title="退出登录"
              color="black"
            />
          ),
        }
        
      };

      //一般来说，你需要在 constructor 中初始化state
      constructor(props) {
        super(props);
        this.state = { isShowingText: true,remark:'setting screeen remark value' };
      }

      componentDidMount() {

        const isAndroid = Platform.OS === 'android';
        this._navListener = this.props.navigation.addListener('didFocus', () => {
          // StatusBar.setBarStyle('light-content');
          // isAndroid && StatusBar.setBackgroundColor('#6a51ae');
          StatusBar.setBarStyle('dark-content');
          isAndroid && StatusBar.setBackgroundColor('#ecf0f1');
        });
      }

    receiveBackData() {

    }

    render() {
      
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Settings Screen</Text>
          <Text>当前state值：{this.state.remark}</Text>
          <Button
            title="Go to Profile 导航栏样式，以及按钮传参到当前页"
            onPress={() => this.props.navigation.navigate('Profile',{index:1,name:"参数二"})}//navigate只有在堆栈上没有一个新路由时才会推送该路由。
          />
          <Button
            title="Go to Custom 自定义导航栏"
            onPress={() => this.props.navigation.navigate('Custom',{index:1,name:"参数二"})}//navigate只有在堆栈上没有一个新路由时才会推送该路由。
          />
          <Button
          title="Go to Table 列表页，自定义上拉下拉刷新"
          onPress={() => this.props.navigation.navigate('Table')}
        />
        <Button
          title="Go to Table2 列表页 第三方刷新控件"
          onPress={() => this.props.navigation.navigate('Table2')}
        />
          <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go to Gesture 手势"
          onPress={() => this.props.navigation.navigate('Gesture',{info: 'setting value',
            callback: ((info) => { //回调函数
                this.setState({
                  remark: info
               })
               alert(info);
           }
      )})}
        />
        </View>
      );
    }
  }