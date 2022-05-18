import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';

export default function HabitItem(props) {
    const [habitCount, setHabitCount] = useState(props.count || 0);

    const handleCounterChange = (change) => {
        var newHabitCount = habitCount;
        if (change.transform) newHabitCount += change.transform;
        if (change.set) newHabitCount = change.set;

        setHabitCount(newHabitCount);

        props.onChange({value: newHabitCount, ...change});
    }

    console.log(habitCount);

    return (
    <View style={styles.outercontainer}>
        <View style={styles.container}>
            <View style={styles.habitcountercontainer}>
                <Text style={styles.habitcounter}>{habitCount}</Text>
            </View>
            <View>
                <IconButton icon="plus-box"
            color={Colors.green500} onPress={()=>handleCounterChange({transform:1})}/>
                <IconButton icon="minus-box"
                color={Colors.red500} onPress={()=>handleCounterChange({transform:-1})}/>
            </View>
            

            <View>
                <Text style={styles.title}>{props.name}</Text>
                <Text style={styles.content}>{props.content}</Text>
                {props.lastDone && <Text>Last done: #PH_LASTDONE#</Text>}
                {props?.count?.today && <Text>Today: #PH_TIMESTODAY#</Text>}
                {props?.count?.thisWeek && <Text>This week: #PH_TIMESTHISWEEK#</Text>}
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
        padding: 5,
        width: 54
    },
    habitcounter: {
        fontSize: 24,
        fontWeight: 'bold'
    }
});