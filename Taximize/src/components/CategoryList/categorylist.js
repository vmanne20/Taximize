import React from 'react';
import {StyleSheet} from 'react-native';
import {List, ListItem, Icon, View, Button} from 'native-base';

export default CategoryList = ({categories, select}) => {
  const match = {
    Business: 'business',
    Personal: 'walk',
    Charity: 'medal',
    none: 'sad',
  };

  if (!select) {
    if (categories.length == 0) {
      return (
        <View style={styles.outerList}>
          <Icon name="sad" style={styles.iconStyle} />
        </View>
      );
    }
    return (
      <List style={styles.outerList}>
        {categories.map(cat => (
          <Icon
            key={match[cat]}
            name={match[cat]}
            style={[styles.bigIconStyle, {color: 'rgb(116, 189, 189)'}]}
          />
        ))}
      </List>
    );
  } else {
    return (
      <List style={styles.outerList}>
        {Object.keys(match).map(key => (
          <View style={{margin: 5}}>
            <Button transparent={!categories.includes(key)}>
              <Icon key={key} name={match[key]} style={styles.bigIconStyle} />
            </Button>
          </View>
        ))}
      </List>
    );
  }
};

const styles = StyleSheet.create({
  outerList: {
    flex: 1,
    flexDirection: 'row',
  },
  iconStyle: {
    margin: 5,
    fontSize: 18,
  },
  bigIconStyle: {
    fontSize: 27,
  },
});
