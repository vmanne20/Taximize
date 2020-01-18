import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Footer} from 'native-base';
import Header from '../../components/Header';
import AddProfileTemplate from './addprofile_template';
import { CreateProfile, CreateExpense } from '../../redux/actions';

//Name, userID, category, description, email, state, zipcode, credit, bank account
class AddProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      category: '',
      description: '',
      email: '',
      state: '',
      zipcode: '',
      creditCard: '',
      bankAccount: '',
    };
  }

  changeName = text => {
    this.setState({
      name: text,
    });
  };
  changeCategory = text => {
    this.setState({
      category: text,
    });
  };
  changeDescription = text => {
    this.setState({
      description: text,
    });
  };
  changeEmail = text => {
    this.setState({
      email: text,
    });
  };
  changeState = text => {
    this.setState({
      state: text,
    });
  };
  changeZipcode = text => {
    this.setState({
      zipcode: text,
    });
  };
  changeCreditCard = text => {
    this.setState({
      creditCard: text,
    });
  };
  changeBankAccount = text => {
    this.setState({
      bankAccount: text,
    });
  };

  submit = () => {
    const {name, category, description, email, state, zipcode} = this.state;
    const {user, CreateProfile, navigation} = this.props;
    const payload = {
      userId: user.token,
      name: name,
      description: description,
      email: email,
      state: state,
      zipCode: zipcode,
      category: category,
      bankAccount: 'None',
      creditCard: 'None',
    };
    CreateProfile(payload);
    navigation.goBack();
  };

  render() {
    const {
      navigation,
      name,
      category,
      description,
      email,
      state,
      zipcode,
    } = this.props;
    return (
      <Container style={{height: '100%'}}>
        <Header navigation={navigation} back />
        <AddProfileTemplate
          navigation={navigation}
          name={name}
          category={category}
          description={description}
          email={email}
          state={state}
          zipcode={zipcode}
          changeName={this.changeName}
          changeCategory={this.changeCategory}
          changeDescription={this.changeDescription}
          changeEmail={this.changeEmail}
          changeState={this.changeState}
          changeZipcode={this.changeZipcode}
          submit={this.submit}
        />
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  user: state.authReducer,
});

const mapDispatchToProps = {
  CreateProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProfile);
