import React, {Component, useState} from 'react';
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import BackButton from '../components/BackButton'

import NCMB, { NCMBUser, NCMBObject, NCMBQuery, 
  NCMBFile, NCMBAcl, NCMBRole, 
  NCMBRequest, NCMBRelation, NCMBGeoPoint, 
  NCMBInstallation, NCMBPush } from 'ncmb-react-native';

import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
} from 'react-native';

import RNCheckboxCard from "react-native-checkbox-card";

class Dashboard extends Component {

  state = {
    count: 0,
    data: [],
    categories: [],
    isLoading: true,
    total: 0,
  }
  onPress = (objectId) => {
    this.getItem(objectId);
  }
  onLogout = () => {
    try {
      NCMBUser.logout();
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'StartScreen' }],
      })
    } catch(err) {
      alert(JSON.stringify(err));
    }
  }
  async componentDidMount() {
     this.getCategory();
     this.getItemInit();
  }
  async getCategory () {
    const obj = new NCMBObject('Category');
    await obj.fetch();
    setTimeout(() => {
      this.setState({categories: obj.get('results')});
      // alert(JSON.stringify(this.state.categories));
    }, 1000)
  }
  async getItem (objectId) {
    this.setState({
      total: 0
    })
    const query = new NCMBQuery('Items');
    const mainObj = new NCMBObject('Category');
    mainObj.set('objectId', objectId);
    const ary = await query.relatedTo(mainObj, 'belongItem').fetchAll();
    this.setState({data: JSON.parse(JSON.stringify(ary))});
    console.log(JSON.stringify(ary));
    
  }
  async getItemInit() {
    const obj = new NCMBObject('Items');
    await obj.fetch();
    setTimeout(() => {
      this.setState({data: obj.get('results')});
    }, 1000)
  }

  render() {
    var display = this.state.data.map((item)=> {
      return (
        <RNCheckboxCard
          text={item.name}
          quantity={item.score}
          enableQuantityText
          onPress={(checked: boolean) => 
            {
              if (checked) {
                this.state.total = this.state.total + item.score;
              } else {
                this.state.total = this.state.total - item.score;
              }
              this.setState({
                total: this.state.total
              })
              console.log("Checked: ", this.state.total);
              console.log("Checked: ", checked);
            }
          }
        />
      );
      
    });
    if (display.length <= 0) {
      display = <Text>No Data</Text>
    }

    return (
      // <Background>
      
      <View style={styles.container}>
        {/* <BackButton goBack={this.props.navigation.goBack} /> */}
        <FlatList
          style = {styles.categories}
          horizontal
          data={this.state.categories}
          renderItem={({item}) => 
            <TouchableOpacity
              style={styles.button}
              onPress={() =>{this.onPress(item.objectId)}}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          }
        />
        <View style = {styles.item}>{display}</View>
        <View><Text>{this.state.total}</Text></View>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>{this.onLogout()}}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
    height: 48,
    margin: 4,
    borderRadius: 16,
  },

  categories: {
    marginTop: 56,
    height: 56,
  },
  item: {
    marginTop: 16
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
})

export default Dashboard;
