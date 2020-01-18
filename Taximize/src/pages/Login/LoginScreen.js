import React, {Component} from 'react';
import LoginTemplate from './LoginTemplate';
import {ActivityIndicator, View, AsyncStorage} from 'react-native';

import {connect} from 'react-redux';
import {LoginAction, getToken} from '../../redux/actions';

class Login extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };

    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
      //this._bootstrapAsync()
  }

  // Fetch the token from storage then navigate to appropriate place
  _bootstrapAsync = () => {
      const { getToken } = this.props;

      getToken();
      AsyncStorage.getItem('userToken')
      .then((data) => {
        if(data){
          return data;
        }
        else{
          this.setState({loading: false})
        }

      })
      .then((data) =>{
        AsyncStorage.getItem('userData')
        .then((user) => {
          if(user){
            this.props.navigation.navigate('App')
          }
          else{
            this.setState({loading: false})
          }
        })
        .catch((err) => {
            console.log(err.message)
        })

      })
      .catch((err) => {
          console.log(err.message)
      })
  };

  signIn(email, password) {
    const {LoginAction} = this.props;
    if(email !== "" && password !== "")
      LoginAction(email, password)
  }

  render() {
    if (this.props.user.loggedIn) {

      this.props.navigation.navigate('App');
    }

    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        {this.props.user.loading ? (
          <ActivityIndicator />
        ) : (
          <LoginTemplate
            signIn={this.signIn}
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
  LoginAction: LoginAction,
  getToken: getToken,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
