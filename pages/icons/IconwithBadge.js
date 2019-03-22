
import React from "react"; 
import { View, Text } from "react-native"; 
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class IconWithBadge extends React.Component {
    render() {
      //取出所有属性
      const { name, badgeCount, color, size } = this.props;
      const countStr = badgeCount > 99? '99+':JSON.stringify(badgeCount);
      return (
        <View style={{ width: 24, height: 24, margin: 5}}>
          <Ionicons name={name} size={size} color={color} />
          { badgeCount > 0 && (
            <View style={{
              position: 'absolute',
              left: 20,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 7.5,
              minWidth: 12,
              height: 15,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>{countStr}</Text>
            </View>
          )}
        </View>
      );
    }
  }