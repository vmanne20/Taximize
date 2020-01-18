import React, {Component} from 'react';
import ExpenseListTemplate from './expenselist_template'
import {Header} from 'native-base';
import {View} from 'react-native';

export default class ExpenseList extends Component {

  constructor(props){
    super(props);
    this.state = {
      expenses: [],
    }

  }

  componentDidMount() {
    this.loadExpenses();
  }
  loadExpenses() {
    var expenseList = [
      {
        uid: 1,
        title: "THis is a title",
        date: "xx/xx/xxxx",
        vendor: "seller inc.",
        amount: 6.3,//in $$
        categories: ["business"]
      },
      {
        uid: 2,
        title: "THis is a title",
        date: "xx/xx/xxxx",
        vendor: "seller inc.",
        amount: 6.3,//in $$
        categories: ["business", "personal"]
      },
      {
        uid: 3,
        title: "THis is a title",
        date: "xx/xx/xxxx",
        vendor: "seller inc.",
        amount: 6.3,//in $$
        categories: []
      },
      {
        uid: 4,
        title: "Test item 4",
        date: "xx/xx/xxxx",
        vendor: "seller inc.",
        amount: 6.3,//in $$
        categories: []
      },
      {
        uid: 5,
        title: "Numero 5",
        date: "xx/xx/xxxx",
        vendor: "seller inc.",
        amount: 6.3,//in $$
        categories: []
      },
      {
        uid: 6,
        title: "THis is a title",
        date: "xx/xx/xxxx",
        vendor: "seller inc.",
        amount: 6.3,//in $$
        categories: []
      },
      {
        uid: 7,
        title: "reee",
        date: "xx/xx/xxxx",
        vendor: "seller inc.",
        amount: 6.3,//in $$
        categories: []
      }
    ]
    this.setState({expenses: expenseList})
  }

  render() {
    return(
      <View style={{flex: 1}}>
      <ExpenseListTemplate expenseList={this.state.expenses}/>
      </View>
    )
  }
}
