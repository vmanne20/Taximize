import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
} from 'react-native';
import ExpenseListTemplate from '../ExpenseList/expenselist_template';
import {Container, Card, H2, H3, Icon, Button, Text} from 'native-base';

import Grid from 'react-native-grid-component';

export default ({
  user,
  logOut,
  navigation,
  modalVisible,
  setModalVisible,
  getProfileExpenses,
  taxes,
  selected,
}) => {
  const _renderItem = (data, i) => (
    <Card
      key={i}
      style={[
        {backgroundColor: '#' + ((Math.random() * 0xffffff) << 0).toString(16)},
        styles.item,
        styles.profile,
      ]}>
      <TouchableOpacity
        style={{height: '100%', width: '100%', justifyContent: 'center'}}
        onPress={() => getProfileExpenses(data)}>
        <Text
          style={{
            color: 'white',
            backgroundColor: 'rgba(0,0,0,0.2)',
            width: '100%',
            textAlign: 'center',
            paddingVertical: 10,
          }}>
          {user.profileList[data]}
        </Text>
      </TouchableOpacity>
    </Card>
  );

  const _renderPlaceholder = i => <View style={styles.item} key={i} />;
  return (
    <Container>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={{paddingTop: 30, backgroundColor: 'rgb(116, 189, 189)'}}>
          <View style={styles.modalProfile}>
            <Card style={styles.modalName}>
              <Text
                style={{width: '100%', textAlign: 'center', fontWeight: '800'}}>
                {selected.profile && selected.profile.name}
              </Text>
            </Card>
            <Card style={styles.modalDescription}>
              <Text>{selected.profile && selected.profile.description}</Text>
            </Card>

            <Card style={styles.modalExpenses}>
              <ExpenseListTemplate
                expenseList={
                  selected.profile && selected.profile.expenseList
                    ? Object.keys(selected.profile.expenseList)
                    : []
                }
                objects={selected.profile && selected.profile.expenseList}
              />
            </Card>

            <Card style={styles.modalTaxes}>
              <Text style={{margin: 10, fontWeight: '800'}}>
                Expenses: ${`${selected.totalExpenseAmount}`}
              </Text>
              <Text style={{margin: 10, fontWeight: '800'}}>
                Deductible: ${`${selected.deductible}`}
              </Text>
            </Card>
            <Card style={styles.closeModal}>
              <TouchableHighlight
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text style={{paddingTop: 5, color: '#ff726f'}}>close</Text>
              </TouchableHighlight>
            </Card>
          </View>
        </View>
      </Modal>

      <Card style={styles.userCard}>
        <Icon style={styles.icon} name="person" />
        <Text style={{width: '100%', textAlign: 'center'}}>
          Hi, {user.name}!
        </Text>
      </Card>
      <Card style={styles.userCard}>
        <Text
          style={{
            width: '100%',
            fontWeight: '800',
            letterSpacing: 1,
          }}>
          Taxes:
        </Text>
        <Text
          style={{
            width: '100%',
          }}>{`Federal Income Tax: $${taxes['Federal Income Tax Balance'] &&
          taxes['Federal Income Tax Balance'].toFixed(
            2,
          )}\nStandard Deduction: $${taxes['Standard Deduction'] &&
          taxes['Standard Deduction'].toFixed(2)} \nTake-Home Pay: $${taxes[
          'Take-Home Pay'
        ] && taxes['Take-Home Pay'].toFixed(2)} `}</Text>
      </Card>
      <Container style={styles.createExpenseContainer}>
        <Container style={styles.createButtons}>
          <Button
            iconLeft
            style={styles.createButton}
            onPress={() => navigation.navigate('AddProfile')}>
            <Icon name="add" />
            <Text>Create Profile</Text>
          </Button>
          <Button
            iconLeft
            style={styles.createButton}
            onPress={() => navigation.navigate('ExpenseCreator')}>
            <Icon name="add" />
            <Text>Create Expense</Text>
          </Button>
        </Container>

        <Card style={styles.profileBox}>
          <Text>Profiles:</Text>
          <Grid
            style={styles.list}
            renderItem={_renderItem}
            renderPlaceholder={_renderPlaceholder}
            data={Object.keys(user.profileList)}
            numColumns={2}
          />
        </Card>

        <Button transparent onPress={logOut}>
          <Text style={{color: 'red'}}>Log Out</Text>
        </Button>
      </Container>
    </Container>
  );
};

const styles = StyleSheet.create({
  userCard: {
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    fontSize: 50,
  },
  createButtons: {
    flexDirection: 'row',
    flex: 1.5,
  },
  createButton: {
    marginTop: 2.5,
    marginHorizontal: 10,
  },
  createExpenseContainer: {
    alignItems: 'center',
  },
  profileBox: {
    width: '100%',
    flex: 10,
    padding: 10,
  },
  profile: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  item: {
    flex: 1,
    height: 160,
    margin: 1,
  },
  list: {
    flex: 1,
  },
  modalProfile: {
    height: '100%',
    paddingHorizontal: 10,
  },
  modalName: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalDescription: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalExpenses: {
    flex: 12,
  },
  closeModal: {
    flex: 1,
    alignItems: 'center',
  },
  modalTaxes: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
