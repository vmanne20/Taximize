import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Button from '../Login/Button';
import FormTextInput from '../Login/FormTextInput';
import ImageLogo from '../../Resources/tax-logo.jpg';
import {Dropdown} from 'react-native-material-dropdown';

let data = [
  {
    value: 'Single',
  },
  {
    value: 'Married Filing Separately (MFS)',
  },
  {
    value: 'Head of Household (HOH)',
  },
];
// let data = ['a','b'];

export default SignupTemplate = ({
  changeName,
  changeUser,
  changePassword,
  changeEmail,
  changeState,
  changeZip,
  changeIncome,
  changeMaritalStatus,
  name,
  username,
  email,
  password,
  state,
  zip,
  income,
  maritalStatus,
  signup,
  navigation
}) => (
  <View style={styles.container}>
    <View style={styles.form}>
      <FormTextInput
        style={styles.input}
        onChangeText={changeName}
        value={name}
        placeholder="Name"
      />
      <FormTextInput
        style={styles.input}
        onChangeText={changePassword}
        value={password}
        placeholder="Password"
      /> 
      <FormTextInput
        style={styles.input}
        onChangeText={changeEmail}
        value={email}
        placeholder="Email"
      />
      <FormTextInput
        style={styles.input}
        onChangeText={changeState}
        value={state}
        placeholder="State"
      />
      <FormTextInput
        style={styles.input}
        onChangeText={changeZip}
        value={zip}
        placeholder="Zipcode"
      />
      <FormTextInput
        style={styles.input}
        onChangeText={changeIncome}
        value={income}
        placeholder="Income, $80,000"
      />
      <Dropdown
        label="Filing Status"
        data={data}
        onChangeText={changeMaritalStatus}
      />
    </View>
    <Button
      label={'Sign Up'}
      style={styles.loginButton}
      onPress={() => signup()}
    />
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text> Sign In </Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    width: '70%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },
});
