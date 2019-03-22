import React from "react"; 
import { View, Text,Button } from "react-native"; 

export default  class ProfileScreen extends React.Component {
    // componentDidMount() {
    //     global.console.log('*********componentDidMount');
    // }

    // static navigationOptions = {
    //     title: 'gleeeli标题',
    //   };

    static navigationOptions = ({ navigation }) => {
        return {
          title: JSON.stringify(navigation.getParam('index', 'A Nested Details Screen')),
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        };
      };

    render() {

        const { navigation } = this.props;
        const index = navigation.getParam('index', 'NO-ID');
         const name = navigation.getParam('name', 'some default value');

        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Profile Screen</Text>
            <Text>index: {JSON.stringify(index)}</Text>
            <Text>name: {JSON.stringify(name)}</Text>
            <Button
              title="Go to Profile...again"
              onPress={() => this.props.navigation.push('Profile',{index:(index + 1),name:"参数二"})}
              />
              <Button
    title="Update the title"
    onPress={() => this.props.navigation.setParams({index: 'Updated!'})}
  />
              <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
          </View>
        );
      }
  }