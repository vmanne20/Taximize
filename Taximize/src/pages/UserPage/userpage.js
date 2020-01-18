import React, {Component} from 'react';
import {View, AsyncStorage, ActivityIndicator} from 'react-native';
import {Container} from 'native-base';
import Header from '../../components/Header';
import UserPageTemplate from './userpage_template';
import {connect} from 'react-redux';

import {GetExpenses, reset, GetTax} from '../../redux/actions';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      modalVisible: false,
      loading: false,
      selected: {}
    };

    this.setModalVisible = this.setModalVisible.bind(this);
    this.getProfileExpenses = this.getProfileExpenses.bind(this);
  }

  async logOut() {
    await AsyncStorage.clear();
    this.props.reset();
    this.props.navigation.navigate('Auth');
  }

  componentDidMount() {
    if (this.props.user) {
      this.props.GetExpenses(this.props.user.token);
      this.props.GetTax(this.props.user.token)
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  async getProfileExpenses(profileId) {
    var userId = this.props.user.token;
    const base = Platform.OS === "ios" ? 'localhost' : "10.0.2.2";

    var data = {
      userId: userId,
      profileId: profileId,
    };
  
    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
  
    formBody = formBody.join('&');
  
    const json = await fetch('http://' + base + ':3000/get-profile'+ '?' + formBody, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      }
    }).then(response => response.json())
    .catch(err => console.log(err.message))
    this.setState({
      selected: json,
      modalVisible: true
    })
  }

  render() {
    return (
      <Container>
        <Header navigation={this.props.navigation} />
        {!this.props.user || this.state.loading ? (
          <ActivityIndicator />
        ) : (
          <UserPageTemplate
            user={this.props.user.userobj}
            logOut={this.logOut}
            taxes={this.props.data.taxes}
            navigation={this.props.navigation}
            setModalVisible={this.setModalVisible}
            modalVisible={this.state.modalVisible}
            getProfileExpenses={this.getProfileExpenses}
            selected={this.state.selected}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer,
  data: state.dataReducer
});

const mapDispatchToProps = {
  reset,
  GetExpenses, 
  GetTax
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPage);
