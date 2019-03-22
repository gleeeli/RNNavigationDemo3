import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Platform,TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback,
} from 'react-native';


export default class GestureHandleScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isShowingText: true,remark:'gesture screeen remark value' };

    // // 每1000毫秒对showText状态做一次取反操作
    // setInterval(() => {
    //   this.setState(previousState => {
    //     return { isShowingText: !previousState.isShowingText };
    //   });
    // }, 1000);
  }

  componentWillUnmount() {
      if (this.props.navigation.state.params.callback) {
        this.props.navigation.state.params.callback('gesture value')
    }
  }

  _onPressButton() {
    Alert.alert('You tapped the button!')
  }
	
	_onLongPressButton() {
    Alert.alert('You long-pressed the button!')
  }

  show(text) {
    alert(text);
}

  //**********************处理手势
  render() {
		return (
      <View style={styles.container}>
        <TouchableHighlight 
        style={styles.buttonContainer} 
        onPress={this.show.bind(this, 'TouchableHighlight underlayColor')}
        activeOpacity={0}
        underlayColor="#00FF00"
        >
          <View>
            <Text style={styles.buttonText}>TouchableHighlight Opacity{this.props.name}</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
                    style={styles.buttonContainer}
                    onPress={this.show.bind(this, 'TouchableHighlight underlayColor')}
                    underlayColor="#00FF00">
                    <View >
                        <Text style={styles.font}>TouchableHighlight</Text>
                    </View>
          </TouchableHighlight>

        {/* 点击透明 */}
        <TouchableOpacity style={styles.buttonContainer} onPress={this._onPressButton}>
          <View>
            <Text style={styles.buttonText}>TouchableOpacity</Text>
          </View>
        </TouchableOpacity>

        {/* 点击涟漪，安卓的效果 */}
        <TouchableNativeFeedback
        style={styles.buttonContainer}
            onPress={this._onPressButton}
            background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
          <View>
            <Text style={styles.buttonText}>TouchableNativeFeedback</Text>
          </View>
        </TouchableNativeFeedback>

        {/* 无效果 */}
        <TouchableWithoutFeedback
        style={styles.buttonContainer}
            onPress={this._onPressButton}
            >
          <View>
            <Text style={styles.buttonText}>TouchableWithoutFeedback</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableHighlight 
        style={styles.buttonContainer} 
        onPress={this._onPressButton} 
        onLongPress={this._onLongPressButton} 
        underlayColor="blue">
          <View>
            <Text style={styles.buttonText}>Touchable with Long Press</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,//来指定某个组件扩张以撑满所有剩余的空间
      justifyContent: 'center',//justifyContent可以决定其子元素沿着主轴的排列方式flex-start、center、flex-end、space-around、space-between以及space-evenly
      alignItems: 'center',//可以决定其子元素沿着次轴的排列方式 （与主轴垂直的轴，比如若主轴方向为row，则次轴方向为column）
      backgroundColor: '#F5FCFF',
    },
    buttonContainer: {
      width: 260,
      height: 40,
      backgroundColor: '#2196F3',
      marginBottom: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      // padding: 20,
      color: 'white'
    },
  });


/*
  activeOpacity：触摸时透明度的设置
  underlayColor：点击时背景阴影效果的背景颜色
*/ 