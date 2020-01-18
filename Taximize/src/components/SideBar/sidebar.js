import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon
} from "native-base";
const routes = [{screen: "UserPage", value: "Home"}, {screen: "ExpenseList", value: "Expenses"}, {screen: "Settings", value: "Settings"}];
export default class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <List
            dataArray={routes}
            contentContainerStyle={{ marginTop: 120 }}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data.screen)}
                >
                  <Text>{data.value}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}
