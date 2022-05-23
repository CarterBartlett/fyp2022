import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Text } from 'react-native-paper';
import { startOfDay } from 'date-fns';

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
    const [componentValue, setComponentValue] = useState(defaultDate);
    const [displayDatePicker, setDisplayDatePicker] = useState(false);
    const [displayTimePicker, setDisplayTimePicker] = useState(false);

    function changeValue(e) {
        const newComponentValue = new Date(componentValue);

        console.log({e});

        if (e.date) {
            const dateVal = startOfDay(e.date);
            newComponentValue.setFullYear(dateVal.getFullYear());
            newComponentValue.setMonth(dateVal.getMonth());
            newComponentValue.setDate(dateVal.getDate());
        }
        if (e.time) {
            newComponentValue.setTime(e.time);
            newComponentValue.setSeconds(0);
            newComponentValue.setMilliseconds(0);
        }
        
        setComponentValue(newComponentValue);
        onChange && onChange(newComponentValue);
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
        <Button mode="contained" onPress={openDatePicker}>Choose {mode=='time' ? 'Time' : 'Date'}</Button>
        {displayDatePicker && <DateTimePicker
            mode="date"
            value={componentValue}
            onChange={e=>{
                setDisplayDatePicker(false);
                if (e.type=='set') {
                    changeValue({date: e.nativeEvent.timestamp});
                    if (mode=='datetime') setDisplayTimePicker(true);
                }
            }}
            minimumDate={minimumDate}
            maximumDate={maximumDate} 
            />}
        {displayTimePicker && <DateTimePicker
            mode="time"
            value={componentValue}
            onChange={e=>{
                setDisplayTimePicker(false);
                if (e.type=='set') changeValue({time:e.nativeEvent.timestamp});
            }} 
            />}
    </>
}