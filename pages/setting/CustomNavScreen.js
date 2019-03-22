
import React from "react"; 
import { View, Text,Button,Image } from "react-native"; 

class LogoTitle extends React.Component {
    render() {
      return (
        <Image
          source={require('./../../images/fengjing.png')}
          style={{ width: 100, height: 44 }}
        />
      );
    }
  }

export default class CustomNavScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
          headerTitle: <LogoTitle />,
          headerRight: (
            <Button
            onPress={navigation.getParam('rtitle')}
              title="+1"
              color="black"
            />
          ),
          headerLeft:(
            <Button
            onPress={() => navigation.goBack()}
              title="给我返回"
              color="black"
            />
          ),
        }
        
      };

      componentDidMount() {
        this.props.navigation.setParams({ rtitle: this._increaseCount });
      }

      _increaseCount = () => {
        this.setState({ count: this.state.count + 1 });
      };

      state = {
        count: 0,
      };

    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Custom Screen</Text>
          <Text>{this.state.count}</Text>
          <Button
            title="Go to Details... again"
            onPress={() => this.props.navigation.push('Details')}
          />
        </View>
      );
    }
  }