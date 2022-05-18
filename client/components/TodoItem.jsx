import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
import {parseISO, format as formatDate } from 'date-fns';

export default function TodoItem(props) {
    const [checkboxState, setCheckbox] = useState(props.checked);

    function handleCheckboxToggle() {
        const newCheckboxState = !checkboxState;
        setCheckbox(newCheckboxState);
        if (props.onCheckboxToggle) props.onCheckboxToggle(newCheckboxState);
    }

    return (
    <View style={[styles.outercontainer, 
        props.priority=='1' ? {backgroundColor: 'red'} :
        props.priority=='2' ? {backgroundColor: 'orange'} :
        props.priority=='3' ? {backgroundColor: 'green'} : {}]}>
        <View style={styles.container}>
            <Checkbox style={styles.checkbox} status={checkboxState?'checked':'unchecked'} onPress={handleCheckboxToggle} />
            
            <View>
                <Text style={styles.title}>{props.name}</Text>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.content}>{props.content}</Text> 
                    {props.due && <Text style={styles.due}>Due by {formatDate(parseISO(props.due), 'eeee do MMMM')} at {formatDate(parseISO(props.due), 'K:mmaaa')}</Text>}
                </View>
            </View>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    outercontainer: {
        backgroundColor: 'gray',
        paddingLeft: 20,
        marginBottom: 1
    },
    container: {
        display: 'flex',
        backgroundColor: '#ddd',
        flexDirection: 'row'
    },
    title: {
        fontSize: 24
    },
    content: {
        fontSize: 12,
        marginRight: 24
    },
    due: {
        fontSize: 12
    },
    checkbox: {
        
    }
});