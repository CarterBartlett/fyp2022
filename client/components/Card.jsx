import React from 'react';
import { View, Text } from 'react-native';

export default function Card(props) {
  return (
    <View style={styles.card}>
        <Text style={styles.title}>{props.title}</Text>
        <Text>{props.description}</Text>
    </View>
  )
}

const styles = {
    card: {
        borderRadius: 5,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: {
            width: 1,
            height: 1
        },
        margin: 6,
        padding: 12
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    }
}