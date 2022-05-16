import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { format } from 'date-fns';

export default function TodoItem(props) {
    const [checkboxState, setCheckbox] = useState(false);

    function handleCheckboxToggle() {
        setCheckbox(!checkboxState)
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
                <Text style={styles.content}>{props.content}</Text> 
                {props.due && <Text style={styles.due}>Due by {format(props.due, 'dd/MM/yyyy')}</Text>}
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
        fontSize: 12
    },
    due: {
        fontSize: 12
    },
    checkbox: {
        
    }
});