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
        props.priority=='1' ? {backgroundColor: 'red'} :
        props.priority=='2' ? {backgroundColor: 'orange'} :
        props.priority=='3' ? {backgroundColor: 'green'} : {},
        props.style]}>
        <View style={styles.container}>
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
    outercontainer: {
        paddingLeft: 20,
        marginBottom: 1,
        backgroundColor: 'gray'
    },
    container: {
        backgroundColor: '#ddd',
        flexDirection: 'row',
        height: '100%'
    },
    title: {
        fontSize: 24
    },
    infoContainer: {
        alignSelf: 'stretch'
    }
});