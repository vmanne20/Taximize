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
  Button,
  Footer,
  Content,
} from 'native-base';
import {Dropdown} from 'react-native-material-dropdown';

import FormTextInput from '../Login/FormTextInput';

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

export default ExpenseCreatorTemplate = ({
  navigation,
  dropProfile,
  changeTitle,
  changeVendor,
  changePrice,
  changeCategory,
  changeProfile,
  changeDate,
  title,
  vendor,
  price,
  category,
  profile,
  date,
  submit,
}) => (
  <Container style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Create an Expense:</Text>
    </View>
    <Form style={styles.body} rounded>
      <FormTextInput
        style={styles.item}
        value={title}
        placeholder="title"
        onChangeText={changeTitle}
      />
      <FormTextInput
        style={styles.item}
        value={vendor}
        placeholder="Vendor"
        onChangeText={changeVendor}
      />
      <FormTextInput
        style={styles.item}
        value={price}
        placeholder="Price $$"
        onChangeText={changePrice}
      />
      <Dropdown
        label="Category"
        data={dropCategory}
        onChangeText={changeCategory}
      />
      <Dropdown
        label="Profile"
        data={dropProfile}
        onChangeText={changeProfile}
      />
      <DatePicker
        modalTransparent={false}
        onDateChange={changeDate}
      />
    </Form>
    <Footer style={styles.footer}>
      <Button
        style={styles.button}
        rounded
        large
        full
        onPress={() => {
          submit();
          navigation.goBack();
        }}>
        <Text>Submit</Text>
      </Button>
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
