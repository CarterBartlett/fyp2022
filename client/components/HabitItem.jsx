import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';

export default function HabitItem(props) {
    const [checkboxState, setCheckbox] = useState(false);

    function handleCheckboxToggle() {
        setCheckbox(!checkboxState)
    }

    return (
    <View style={styles.outercontainer}>
        <View style={styles.container}>
            <View style={styles.habitcountercontainer}>
                <Text style={styles.habitcounter}>12</Text>
            </View>
            <View>
                <IconButton icon="plus-box"
            color={Colors.green500} onPress={()=>console.log("Button press")}/>
                <IconButton icon="minus-box"
                color={Colors.red500} onPress={()=>console.log("Button press")}/>
            </View>
            

            <View>
                <Text style={styles.title}>{props.name}</Text>
                <Text style={styles.content}>{props.content}</Text>
                <Text>Last done: #PH_LASTDONE#</Text>
                <Text>Today: #PH_TIMESTODAY#</Text>
                <Text>This week: #PH_TIMESTHISWEEK#</Text>
            </View>

            
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    outercontainer: {
        backgroundColor: 'gray',
        marginBottom: 1
    },
    container: {
        backgroundColor: '#ddd',
        flexDirection: 'row'
    },
    title: {
        fontSize: 28
    },
    content: {
        fontSize: 12
    },
    habitcountercontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    habitcounter: {
        fontSize: 24,
        fontWeight: 'bold'
    }
});