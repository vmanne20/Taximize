import React from 'react';
import {
    StyleSheet,
    ScrollView
} from 'react-native';
import ExpensePreview from '../../components/ExpensePreview';
import {createDrawerNavigator} from 'react-navigation';
import { Content, Container, List, ListItem, Accordion, Text, View, Header, Body, Left, Right, Button, Icon, Title} from "native-base";

export default ExpenseListTemplate = ({expenseList}) => (
    <Content style={styles.container} >
        <Header height>
            <Left style={{flex:1}} 
                transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                <Button transparent>
                    <Icon name='menu'></Icon>
                </Button>
            </Left>
            <Body>
                <Title>Header</Title>
            </Body>
            <Right style={{flex:1}}>
                <Button transparent>
                    <Icon name='menu'></Icon>
                </Button>
            </Right>
        </Header>
        {expenseList.map(expense =>
            <ListItem key={expense.uid}>
                <ExpensePreview expense={expense}/>
            </ListItem>
        )}
    </Content>
)



const styles = StyleSheet.create({
    container : {
        flex: 1
    }
})
