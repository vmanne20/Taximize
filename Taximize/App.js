import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import Login from './src/pages/Login';
import ExpenseList from './src/pages/ExpenseList';
import Signup from './src/pages/Signup';
import ManualExpense from './src/pages/ManualExpense';
import {
  Header,
  Content,
  Container,
  Text,
  StyleProvider,
  View,
} from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import platform from './native-base-theme/variables/platform';
import commonColor from './native-base-theme/variables/commonColor';

import {connect} from 'react-redux';

import AuthController from './src/navigation/authcontroller';

class App extends Component {
  render() {
    console.disableYellowBox = true;
    const {user} = this.props;
    return (
      <StyleProvider style={getTheme(material)}>
        <View style={{flex: 1}}>
          <SafeAreaView
            style={{
              flex: 0,
              backgroundColor: user.loggedIn
                ? material.brandPrimary
                : 'rgb(116, 189, 189)',
            }}
          />
          <Content
            scrollEnabled={false}
            style={{flex: 1}}
            contentContainerStyle={{flex: 1}}>
            <AuthController />
          </Content>
        </View>
      </StyleProvider>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer,
});

const mapDispatchToProps = dispatch => ({
  reset: () => dispatch({type: 'RESET'}),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
