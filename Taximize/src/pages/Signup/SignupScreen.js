import React, {Component} from 'react';
import SignupTemplate from './SignupTemplate';
import {Alert, ActivityIndicator, View} from 'react-native';

import {connect} from 'react-redux';
import {SignUp} from '../../redux/actions';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      email: '',
      password: '',
      state: '',
      zip: '',
      income: '',
      maritalStatus: '', //change this for dropdown??
    };

    this.signup = this.signup.bind(this);
  }

  changeName = text => {
    this.setState({
      name: text,
    });
  };
  changeUser = text => {
    this.setState({
      username: text,
    });
  };
  changeEmail = text => {
    this.setState({
      email: text,
    });
  };
  changePassword = text => {
    this.setState({
      password: text,
    });
  };
  changeState = text => {
    this.setState({
      state: text,
    });
  };
  changeZip = text => {
    this.setState({
      zip: text,
    });
  };
  changeIncome = text => {
    this.setState({
      income: text,
    });
  };
  changeMaritalStatus = text => {
    this.setState({
      maritalStatus: text,
    });
  };

  signup() {
    const {name, email, password, state, zip, income, maritalStatus} = this.state;
    const {SignUp, navigation} = this.props;

    if (name && email && password && state && zip && income && maritalStatus) {
      SignUp(name, email, password, email, state, zip, income, maritalStatus);
    } else {
      Alert.alert(
        'Warning: ',
        'Please fill up every field',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  }

  render() {
    const {name, username, email, password, state, zip, income} = this.state;
    if (this.props.user.loggedIn) {
      this.props.navigation.goBack()
    }
    return (
      <View style={{width: '100%', height: '100%'}}>
        {this.props.user.loading ? (
          <ActivityIndicator />
        ) : (
          <SignupTemplate
            name={name}
            username={username}
            email={email}
            password={password}
            state={state}
            zip={zip}
            income={income}
            changeName={this.changeName}
            changeUser={this.changeUser}
            changeEmail={this.changeEmail}
            changePassword={this.changePassword}
            changeState={this.changeState}
            changeZip={this.changeZip}
            changeIncome={this.changeIncome}
            changeMaritalStatus={this.changeMaritalStatus}
            signup={this.signup}
            navigation={this.props.navigation}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer,
});

const mapDispatchToProps = {
  SignUp: SignUp,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);
