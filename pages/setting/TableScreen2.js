/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Image } from 'react-native';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
	TextInput,
	Button,
	Alert,
  FlatList,
  SectionList,
  ActivityIndicator,
} from 'react-native';
import HttpUtil from './../util/HttpUtil'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'

//屏幕信息
const dimensions = require('Dimensions');
//获取屏幕的宽度和高度
const {screen_width, screen_height} = dimensions.get('window');

export default class AwesomeProject extends Component {
  constructor(props){
    super(props);
    this.state ={page:1,refreshState: RefreshState.Idle,dataSource:[]}
  }

  componentDidMount(){
    this.onHeaderRefresh()
    }

    onHeaderRefresh = () => {
        this.setState({page:1, refreshState: RefreshState.HeaderRefreshing })
    
        this._requestServiceData();
      }
    
      onFooterRefresh = () => {

        this.setState({page:this.state.page + 1, refreshState: RefreshState.FooterRefreshing })
    
        this._requestServiceData();
      }

    _requestServiceData = () => {
      
      const url = 'https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json';
      const param = null;
      HttpUtil.fetchGet(url,
        param,
        (responseObj) =>{
          
          if (this.state.page == 1){
            this.setState({
                dataSource: responseObj.movies,
                refreshState: responseObj.movies.length < 1 ? RefreshState.EmptyData : RefreshState.Idle,
              })
          }else {
            this.setState({
                dataSource: this.state.dataSource.concat(responseObj.movies),
                refreshState: this.state.page == 3 ? RefreshState.NoMoreData : RefreshState.Idle,
                // refreshState: this.state.dataSource.length > 50 ? RefreshState.NoMoreData : RefreshState.Idle,
              })
          }
        },
        (error) =>{this.setState({ refreshState: RefreshState.Failure });console.error(error);}
        )
    }

      render(){
        return(
          <View style={{flex: 1, paddingTop:0,backgroundColor:'#D8D8D8'}}>

        <RefreshListView
          data={this.state.dataSource}
          keyExtractor={this.keyExtractor}
          renderItem={({item}) =>this.renderCell(item)}
          refreshState={this.state.refreshState}
          onHeaderRefresh={this.onHeaderRefresh}
          onFooterRefresh={this.onFooterRefresh}

          // 可选
          footerRefreshingText='玩命加载中 >.<'
          footerFailureText='我擦嘞，居然失败了 =.=!'
          footerNoMoreDataText='-我是有底线的-'
          footerEmptyDataText='-好像什么东西都没有-'
        />
            {/* <FlatList
              data={this.state.dataSource}
              renderItem={({item}) => this._createListItem(item)}
              keyExtractor={(item, index) => item.id}
              ListEmptyComponent = {this._createEmptyView}
              ListHeaderComponent={this._createListHeader.bind(this)}
              ListFooterComponent={this._createListFooter.bind(this)}
              onRefresh={() => this._onRefresh()}
              refreshing={this.state.isRefresh}
              onEndReached={() => this._onLoadMore()}
              onEndReachedThreshold={0.1}
            /> */}
          </View>
        );
      }

      renderCell(item){
        return (
          <View style={styles.tablecell}>
              <View style={styles.cellcontent}>
              <Image source={{ uri: item.posters.thumbnail}} style={styles.thumbnail} />
              <View style={styles.rightContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.year}>{item.year}</Text>
              </View>
              </View>
              <View style={styles.cellline}></View>
            </View>
        )
      }

      keyExtractor = (item,indexb) => {
        return indexb.toString()
      }

}

const styles = StyleSheet.create({
  tablecell: {
    flex: 1,
  },
  cellcontent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  cellline: {
    flex: 1,
    height:10,
    backgroundColor: "#D8D8D8"
  },
  rightContainer: {
    flex: 1,
  },
  thumbnail:{
    margin:10,
    width: 53,
    height: 81,
    backgroundColor: "#00FF00",
    borderRadius:3,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    marginLeft: 8,
    textAlign: 'left',
  },
  year: {
    textAlign: 'left',
    marginLeft: 8,
  },
  containerlist: {
    flex: 1,
  },
  containerSection: {
    flex: 1,
    backgroundColor:'#FFFFFF',
  },
  container: {
    flex: 1,//来指定某个组件扩张以撑满所有剩余的空间
    justifyContent: 'center',//justifyContent可以决定其子元素沿着主轴的排列方式flex-start、center、flex-end、space-around、space-between以及space-evenly
    alignItems: 'stretch',//可以决定其子元素沿着次轴的排列方式 （与主轴垂直的轴，比如若主轴方向为row，则次轴方向为column）
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
	bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
	button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  headView:{
    width:screen_width,
    height:100,
    backgroundColor:'red',
    // justifyContent:'center',
    // alignItems:'center'
},

});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
