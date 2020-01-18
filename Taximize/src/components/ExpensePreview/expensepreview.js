import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Accordion, Text, Card, Container} from 'native-base';
import CategoryList from '../CategoryList/';

export default ExpensePreview = ({expense}) => (
  <Card style={styles.container} scrollEnabled={false}>
    <Accordion
      scrollEnabled={false}
      dataArray={[expense]}
      icon={<Icon name="create" />}
      expandedIcon={<Icon name="close" />}
      renderHeader={item => (
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text style={{fontWeight: "800", letterSpacing: 1}}>{item.title}</Text>
            <Text style={{color: "red"}}>-${`${item.amount}`}</Text>
          </View>

          <View style={styles.rowContainer}>
            <View style={styles.Left}>
              <Text>Vendor: {item.description}</Text>
              <Text>Date: {new Date(item.date).toString().substr(4, 12)}</Text>
            </View>

            <View style={styles.Right}>
              <CategoryList categories={[item.category]} />
            </View>
          </View>
        </View>
      )}
      renderContent={item => (
        <View style={styles.contentContainer}>
          <Text>Edit this expense's categories: </Text>
          <CategoryList select categories={[item.category]} />
        </View>
      )}
    />
  </Card>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(245, 245, 245, 0.60)',
  },
  contentContainer: {
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(245, 245, 245, 0.40)',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Right: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.20)',
    paddingBottom: 5,
    marginBottom: 2,
  },
});
