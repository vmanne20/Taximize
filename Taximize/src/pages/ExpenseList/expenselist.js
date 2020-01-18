import React, {Component} from 'react';
import ExpenseListTemplate from './expenselist_template';
import {Left, Right, Button, Icon, Body, Title, Container} from 'native-base';
import Header from '../../components/Header';
import {View} from 'react-native';

import {connect} from 'react-redux';

import {GetExpenses} from '../../redux/actions';

class ExpenseList extends Component {
  constructor(props) {
    super(props);
    // props.GetExpenses(props.user.token);
  }

  componentDidMount() {
    const {user} = this.props;
    if (this.props.user.token === null) {
      this.props.navigation.navigate('Login');
    }
  }

  render() {
    const {data} = this.props;
    return (
      <Container>
        <Header navigation={this.props.navigation} />
        <ExpenseListTemplate
          expenseList={data.allExpensesIDS ? data.allExpensesIDS : []}
          objects={data.allExpenses}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer,
  data: state.dataReducer,
});

export default connect(mapStateToProps, {GetExpenses})(ExpenseList);
