import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SideBar from '../components/SideBar';
import AuthLoading from '../components/AuthLoading';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import AddProfile from '../pages/AddProfile';
import ExpenseList from '../pages/ExpenseList';
import UserPage from '../pages/UserPage';
import ExpenseCreator from '../pages/ExpenseCreator';
import ManualExpense from '../pages/ManualExpense';


const ExpenseStack = createStackNavigator(
  {
    UserPage: UserPage,
    ExpenseCreator: ExpenseCreator,
    AddProfile: AddProfile
  },{
    headerMode: 'none',
  }
)

const AuthStack = createStackNavigator(
  {
    Login: Login,
    Signup: {
      screen: Signup,
      navigationOptions: ({ navigation }) => ({
        title: 'Signup',
        headerTintColor: "#FFFF",
        headerStyle: {
          backgroundColor: "rgb(116, 189, 189)",
          paddingTop: 10,

        },
        headerForceInset: { top: 'never', bottom: 'never' }
      }),
    }
    
  }
)

const AppStack = createDrawerNavigator(
  {
    ExpenseStack: ExpenseStack,
    ExpenseList: ExpenseList,
  },
  {
    contentComponent: props => <SideBar {...props}/>
  }
)


export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      App: AppStack,
      Auth: AuthStack
    }
  )
)
