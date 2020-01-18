import React from 'react';
import {
    StyleSheet,
    ScrollView
} from 'react-native';
import ExpensePreview from '../../components/ExpensePreview';
import { Content, Container, List, ListItem, Accordion, Text, View, Header} from "native-base";

export default ExpenseListTemplate = ({expenseList, objects}) => (
    <Content style={styles.container} >
        {expenseList.map(expense =>
            <ListItem key={objects[expense].expenseId}>
                <ExpensePreview expense={objects[expense]}/>
            </ListItem>
        )}
    </Content>
)

const styles = StyleSheet.create({
    container : {
        
    }
})
