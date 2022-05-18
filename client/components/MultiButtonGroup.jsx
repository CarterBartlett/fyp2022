import React, {useState} from 'react';
import { View, Pressable, Text, Button, StyleSheet } from 'react-native';

export default function MultiButtonGroup({buttons, onChange=()=>{}}) {
    const [selected, setSelected] = useState(0);

    const handleChange = (i) => {
        setSelected(i);
        onChange(buttons[i].value);
    }

    return <View style={styles.container}>
        {buttons && buttons.map((button,i)=>(
            <Pressable
                style={[styles.button, 
                    {
                        backgroundColor: selected==button.value ? button.color : 'lightgray',
                        borderTopLeftRadius: i==0 ? 10 : 0,
                        borderBottomLeftRadius: i==0 ? 10 : 0,
                        borderTopRightRadius: i==buttons.length-1 ? 10 : 0,
                        borderBottomRightRadius: i==buttons.length-1 ? 10 : 0,
                        borderColor: 'black',
                        borderWidth: 2
                    }]}
                onPress={()=>handleChange(i)}
                key={i}>
                    <Text style={styles.buttonText} size>{button.label ?? button.value}</Text>
            </Pressable>    
        ))}
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    button: {
        elevation: 8,
        backgroundColor: 'red',
        margin: 2,
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 0,
        marginRight: 0
    },
    buttonText: {
        fontWeight: '400',
        fontSize: 22
    }
})