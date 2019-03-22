/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';
// import { createStackNavigator, createAppContainer } from "react-navigation";

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React Native!孔斤斤计较</Text>
//         <Text style={styles.instructions}>To get started, edit App.js</Text>
//         <Text style={styles.instructions}>{instructions}</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

import React from "react"; 
import { View, Text,Button } from "react-native"; 
import { createStackNavigator, createAppContainer,createBottomTabNavigator,createSwitchNavigator } from "react-navigation"; 
import ProfileScreen from './pages/setting/ProfileScreen';
import SettingsScreen from './pages/setting/SettingsScreen';
import TableScreen from './pages/setting/TableScreen';
import TableScreen2 from './pages/setting/TableScreen2';
import CustomNavScreen from './pages/setting/CustomNavScreen';
import HomeScreen from './pages/home/HomeScreen';
import DetailsScreen from './pages/home/DetailsScreen';
import ModalScreen from './pages/home/ModalScreen';
import LinkOCScreen from './pages/home/LinkOCScreen';

import AuthLoadingScreen from './pages/authorize/AuthLoadingScreen';
import SignInScreen from './pages/authorize/SignInScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconwithBadge from './pages/icons/IconwithBadge';
import GestureHandleScreen from './pages/basefunc/GestureHandleScreen';
      
// const AppNavigator = createStackNavigator({ Home: { screen: HomeScreen } }); 
// const AppNavigator = createStackNavigator({
//   Home: HomeScreen
// });
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    LinkOCS: LinkOCScreen
  },{
    initialRouteName: 'Home',//指定初始页面
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
    headerStyle: {
    backgroundColor: 'green',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
    fontWeight: 'bold',
    }
  }
}
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: HomeStack,//将home堆栈 放入根堆栈
    },
    MyModal: {
      screen: ModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

//设置的堆栈
const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  Profile: ProfileScreen,
  Custom: CustomNavScreen,
  Gesture: GestureHandleScreen,
  Table:TableScreen,
  Table2:TableScreen2,
});

RootStack.navigationOptions = {
  tabBarLabel: '首页',
};

SettingsStack.navigationOptions = {
  tabBarLabel: '设置',
};

//权限堆栈
const AuthStack = createStackNavigator({
   SignIn: SignInScreen 
  }
  , 
  {
    headerMode: 'none',//隐藏导航栏
  }
  );

// export default createAppContainer(AppNavigator);
const TabNavigator = createBottomTabNavigator(
  {
    Home: RootStack,
    Settings: SettingsStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          // Sometimes we want to add badges to some icons. 
          // You can check the implementation below.
          IconComponent = HomeIconWithBadge; 
        } else if (routeName === 'Settings') {
          // iconName = `ios-options${focused ? '' : '-outline'}`;
          iconName = focused ?'ios-aperture':'ios-attach';
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

const HomeIconWithBadge = props => {
  // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
  return <IconwithBadge {...props} badgeCount={10} />;
};

const switchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: TabNavigator,//登录成功后的堆栈
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

const AppContainer = createAppContainer(switchNavigator);



export default class App extends React.Component {

  someEvent() {
    // call navigate for AppNavigator here:
    this.navigator &&
      this.navigator.dispatch(
        NavigationActions.navigate({ routeName: someRouteName })
      );
  }

  render() {
    return <AppContainer ref={nav => {
          this.navigator = nav;
        }}/>;
  }
}