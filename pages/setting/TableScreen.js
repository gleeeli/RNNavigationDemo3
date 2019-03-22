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

//屏幕信息
const dimensions = require('Dimensions');
//获取屏幕的宽度和高度
const {screen_width, screen_height} = dimensions.get('window');

export default class AwesomeProject extends Component {
  constructor(props){
    super(props);
    this.state ={page:1,isRefresh:false,isLoadMore:false,dataSource:[]}
  }

  componentDidMount(){
    // this._requestServiceData();
    }

    _requestServiceData = () => {
      
      const url = 'https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json';
      const param = null;
      HttpUtil.fetchGet(url,
        param,
        (responseObj) =>{
          
          if (this.state.page == 1){
            this.setState({isRefresh:false,dataSource: responseObj.movies,});
          }else {
            this.setState({isRefresh:false,isLoadMore: false,dataSource: this.state.dataSource.concat(responseObj.movies),});
          }
        },
        (error) =>{this.setState({isRefresh: false});console.error(error);}
        )
    }

      render(){
        return(
          <View style={{flex: 1, paddingTop:0,backgroundColor:'#D8D8D8'}}>
            <FlatList
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
            />
          </View>
        );
      }

      _createListItem(item){
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

      _createEmptyView(){
        return (
            <View style={{flex:1, alignItems:'center', justifyContent:'center',backgroundColor:'green'}}>
                <Text style={{fontSize:16}}>
                    暂无列表数据，下啦刷新
                </Text>
            </View>
        );
    }

    _createListHeader(){
        return (
          <View style={styles.headView}>
          <View style={{flex: 1,justifyContent:'center', padding: 20}}>
              {/* <ActivityIndicator/> */}
            </View>
              <Text style={{color:'white'}}>
                  头部布局
              </Text>
          </View>
      )
  }

    _createListFooter(){
      if(this.state.dataSource.length <= 0) {
        return null;
      }
      else if(this.state.page == 2) {//没有更多
        return(<View style={styles.loadingMore}>
          <Text style={styles.loadingText}>没有更多数据啦...</Text>
      </View>)
              
      }else {
        return(<ActivityIndicator style={styles.loadingMore}></ActivityIndicator>)
      }
  }

  _onRefresh = () => {
    // 不处于 下拉刷新
    if(!this.state.isRefresh){
        this.state.page = 1
        this.setState({
          isRefresh:true,
        });
        this._requestServiceData();
      }
    };

    _onLoadMore = () => {

      // 不处于正在加载更多 && 有下拉刷新过，因为没数据的时候 会触发加载
      if (!this.state.isLoadMore && this.state.dataSource.length > 0){
          this.state.page = this.state.page + 1
          
          if(this.state.page < 3){
            this.setState({
              isLoadMore:true
            })
            this._requestServiceData();
          }else {
            this.setState({
              isLoadMore:false
            })
          }
          
      }
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
