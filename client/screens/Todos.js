import React from 'react';
import { Text, SafeAreaView, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { Card, Title, Paragraph } from 'react-native-paper';

import TodoItem from '../components/TodoItem';

export default function TodosScreen() {
    return (
        <SafeAreaView>
            <ScrollView>
                <TodoItem name="Todo Item Name" content="Test" checked="checked" />
                <TodoItem name="Todo Item Name" content="Test" checked="checked" priority="1" />
                <TodoItem name="Todo Item Name" content="Test" checked="checked" priority="2" />
                <TodoItem name="Todo Item Name" content="Test" checked="checked" priority="3" />
                <TodoItem name="Todo Item Name" content="Test" checked="checked" due={new Date(2022,5,1)} />
            </ScrollView>
        </SafeAreaView>
    )
}