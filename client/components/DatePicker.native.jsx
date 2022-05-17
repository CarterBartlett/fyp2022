import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import {format as formatDate, startOfDay} from 'date-fns';

export default function DatePickerNative(props) {
    const now = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);

    const { 
        mode='datetime',
        default: defaultDate=now,
        onChange=()=>console.error('onChange event was not defined for DatePicker component'),
        minimumDate,
        maximumDate
    } = props; 
    const [value, setValue] = useState(defaultDate);
    const [displayDatePicker, setDisplayDatePicker] = useState(false);
    const [displayTimePicker, setDisplayTimePicker] = useState(false);

    const changeValue = (e, cb=()=>{}) => {
        console.log('onChange', e);
        const tempVal = value;
        if (e.date) {
            tempVal.setFullYear(e.date.getFullYear());
            tempVal.setMonth(e.date.getMonth());
            tempVal.setDate(e.date.getDate());
        }
        if (e.time) {
            tempVal.setTime(e.time);
            tempVal.setSeconds(0);
            tempVal.setMilliseconds(0);
        }
        setValue(tempVal);
        console.log({value, tempVal});
        onChange(tempVal);
        cb();
    }
    const openDatePicker = () => {
        if (mode=='time') {
            setDisplayTimePicker(true);
        } else if (mode=='datetime' || mode=='date') {
            setDisplayDatePicker(true);
        } else {
            console.error('Invalid "mode" property provided to DatePicker element');
        }
    }
    const handleBlur = (e) => {}

    return <>
        <Button mode="contained" onPress={openDatePicker}>Open Datepicker</Button>
        {displayDatePicker && <DateTimePicker
            mode="date"
            value={value}
            onChange={e=>{
                setDisplayDatePicker(false);
                if (e.type=='set') {
                    changeValue(
                        {date: startOfDay(e.nativeEvent.timestamp)},
                        ()=>mode=='datetime' && setDisplayTimePicker(true)
                    );
                }
            }}
            minimumDate={minimumDate}
            maximumDate={maximumDate} 
            />}
        {displayTimePicker && <DateTimePicker
            mode="time"
            value={value}
            onChange={e=>{
                setDisplayTimePicker(false);
                if (e.type=='set') changeValue({time:e.nativeEvent.timestamp.getTime()});
            }} 
            />}
    </>
}