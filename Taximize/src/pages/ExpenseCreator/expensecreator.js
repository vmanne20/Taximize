import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Footer} from 'native-base';
import Header from '../../components/Header';
import ExpenseCreatorTemplate from './expensecreator_template';
import {CreateExpense} from '../../redux/actions';

class ExpenseCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      vendor: '',
      price: '',
      category: '',
      profile: '',
      date: '',
    };
  }

  changeTitle = text => {
    this.setState({
      title: text,
    });
  };

  changeVendor = text => {
    this.setState({
      vendor: text,
    });
  };

  changePrice = text => {
    this.setState({
      price: text,
    });
  };

  changeCategory = text => {
    this.setState({
      category: text,
    });
  };

  changeProfile = text => {
    this.setState({
      profile: text,
    });
  };

  changeDate = date => {
    this.setState({
      date: date,
    });
  };

  submit = () => {
    /**
     *   userId: action.userId,
    profileId: action.profileId,
    description: action.description,
    amount: action.amount,
    category: action.category,
    date: action.date,
    title: action.title
     */

    const {title, vendor, price, category, profile, date} = this.state;
    const {user, CreateExpense} = this.props;

    let profileData = ""
    Object.keys(user.userobj.profileList).forEach(o => {
      if(user.userobj.profileList[o] === profile)
        profileData = o;
    });
    const result = {
      userId: user.token,
      profileId: profileData,
      description: vendor,
      amount: price,
      category: category,
      date: date,
      title: title,
    };

    // console.log(result);

    CreateExpense(result);
  };

  render() {
    const {title, vendor, price, category, profile, date} = this.state;
    const {user, navigation} = this.props;
    const dropProfile =
      user.userobj &&
      Object.keys(user.userobj.profileList).map(o => {
        return {
          value: user.userobj.profileList[o],
          id: o,
        };
      });
    return (
      <Container style={{height: '100%'}}>
        <Header navigation={navigation} back />
        <ExpenseCreatorTemplate
          title={title}
          vendor={vendor}
          price={price}
          category={category}
          profile={profile}
          date={date}
          navigation={navigation}
          dropProfile={dropProfile}
          changeTitle={this.changeTitle}
          changeVendor={this.changeVendor}
          changePrice={this.changePrice}
          changeCategory={this.changeCategory}
          changeProfile={this.changeProfile}
          changeDate={this.changeDate}
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
  CreateExpense: CreateExpense,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseCreator);
