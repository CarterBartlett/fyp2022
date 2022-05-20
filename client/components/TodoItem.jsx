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
    <View style={[ styles.outercontainer, 
        props.priority=='1' ? {borderLeftColor: 'red'} :
        props.priority=='2' ? {borderLeftColor: 'orange'} :
        props.priority=='3' ? {borderLeftColor: 'green'} : 
                              {},
        props.style]}>
        <View style={[
                styles.container,
                props.priority=='1' ? {borderLeftColor: 'red'} :
                props.priority=='2' ? {borderLeftColor: 'orange'} :
                props.priority=='3' ? {borderLeftColor: 'green'} : 
                {}
                ]}>
            <Checkbox
                style={styles.checkbox}
                status={checkboxState?'checked':'unchecked'}
                onPress={handleCheckboxToggle} />
            
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{props.name}</Text>
                <Text style={styles.content}>{props.content}</Text> 
                {props.due &&
                    <Text style={styles.due}>Due by {formatDate(parseISO(props.due), 'eeee do MMMM')} at {formatDate(parseISO(props.due), 'K:mmaaa')}</Text>
                }
            </View>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 1,
        backgroundColor: 'gray',
        backgroundColor: '#ddd',
        flexDirection: 'row',
        borderLeftWidth: 12,
        borderLeftColor: 'gray',
    },
    title: {
        fontSize: 24
    },
    infoContainer: {
        alignSelf: 'stretch'
    }
});