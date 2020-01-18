import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import { getToken } from '../../redux/actions';

class AuthLoading extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        this._bootstrapAsync()

    }

    // Fetch the token from storage then navigate to appropriate place
  _bootstrapAsync = () => {
      const { getToken } = this.props;
      AsyncStorage.getItem('userToken')
      .then((data) => {
        if(data){
          return data;
        }
        else{
          this.props.navigation.navigate('Auth')
        }

      })
      .then((data) =>{
        AsyncStorage.getItem('userData')
        .then((user) => {
          if(user){
            getToken(JSON.parse(user).userId, JSON.parse(user));
            this.props.navigation.navigate('App')
          }
          else{
            this.props.navigation.navigate('Auth')
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


    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapStateToProps = state => ({
    user: state.authReducer,
});


const mapDispatchToProps = {
    getToken: getToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);
