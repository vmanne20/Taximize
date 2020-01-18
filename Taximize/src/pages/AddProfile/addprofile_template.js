import React from 'react';

import {View, StyleSheet} from 'react-native';
import {
  Container,
  Text,
  Form,
  Item,
  Input,
  Picker,
  Icon,
  DatePicker,
  H1,
  Footer,
} from 'native-base';
import {Dropdown} from 'react-native-material-dropdown';

import FormTextInput from '../Login/FormTextInput';
import Button from '../Login/Button';

const dropCategory = [
  {
    value: 'Personal',
  },
  {
    value: 'Business',
  },
  {
    value: 'Charity',
  },
];

//Name, userID, category, descrition, email, state, zipcode,
//credit, bank account
export default AddProfileTemplate = ({
  navigation,
  name,
  category,
  description,
  email,
  state,
  zipcode,
  changeName,
  changeCategory,
  changeDescription,
  changeEmail,
  changeState,
  changeZipcode,
  submit
}) => (
  <Container style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Create a Profile:</Text>
    </View>
    <Form style={styles.body} rounded>
      <FormTextInput
        style={styles.item}
        placeholder="Profile Name"
        onChangeText={changeName}
        value={name}
      />
      <Dropdown
        label="Category"
        data={dropCategory}
        onChangeText={changeCategory}
      />
      <FormTextInput
        style={styles.item}
        placeholder="Business Email"
        onChangeText={changeEmail}
        value={email}
      />
      <FormTextInput
        style={styles.item}
        placeholder="Description"
        onChangeText={changeDescription}
        value={description}
      />
      <FormTextInput
        style={styles.item}
        placeholder="State"
        onChangeText={changeState}
        value={state}
      />
      <FormTextInput
        style={styles.item}
        placeholder="Zipcode"
        onChangeText={changeZipcode}
        value={zipcode}
      />
    </Form>
    <Footer style={styles.footer}>
      <Button
        label={'Submit'}
        style={styles.loginButton}
        onPress={submit}
      />
    </Footer>
  </Container>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    height: 100,
  },
  headerText: {
    color: 'rgba(0,0,0,0.7)',
    fontSize: 24,
    fontWeight: '800',
    padding: 10,
    marginTop: 20,
    letterSpacing: 2,
  },
  body: {
    padding: 20,
    flex: 8,
    height: 400,
  },
  item: {
    marginVertical: 20,
    fontSize: 16,
  },
  footer: {
    backgroundColor: 'white',
  },
  button: {
    width: '100%',
    height: '100%',
  },
});
