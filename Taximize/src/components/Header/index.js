import React from 'react';
import {View} from 'react-native'
import {Header, Left, Right, Button, Icon, Body, Title, Container} from 'native-base';
import material from '../../../native-base-theme/variables/material';

export default ({navigation, back}) => {
  if(!back){
    return(
      <View style={{paddingTop: 10,height: 50, flexDirection: "row", backgroundColor: material.brandPrimary}}>
        <Left>
          <Button
            transparent
            onPress={() => navigation.openDrawer()}>
            <Icon name="menu" style={{color: "#fff"}}/>
          </Button>
        </Left>
        <Body>
          <Title>Taximize</Title>
        </Body>
        <Right />
      </View>
    )
  }
  else {
    return(
      <View style={{paddingTop: 10,height: 50, flexDirection: "row", backgroundColor: material.brandPrimary}}>
        <Left>
          <Button
            transparent
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" style={{color: "#fff"}}/>
          </Button>
        </Left>
        <Body>
          <Title>Taximize</Title>
        </Body>
        <Right />
      </View>
    )
  }
}
