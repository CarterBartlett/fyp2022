import React, { useState } from 'react';
import { Text } from 'react-native-paper';
import DesktopDatePicker from 'react-datepicker';
import DesktopDateTimePicker from 'react-datetime-picker';
import DesktopTimePicker from 'react-time-picker';
import {format as formatDate } from 'date-fns';

import "react-datepicker/dist/react-datepicker.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

export default function DatePicker(props) {
    const { 
        mode='datetime',
        default: defaultDate=new Date(),
        onChange=()=>console.error('onChange event was not defined for DatePicker component')
    } = props; 
    const [value, setValue] = useState(defaultDate);

    const handleChange = (val) => {
        setValue(val);
        onChange(value);
    }
    const handleBlur = (e) => {}

    switch (mode) {
        case 'date':
            return <>
                <Text>{formatDate(value, 'dd/MM/yyyy HH:mm:SS')}</Text>
                <DesktopDatePicker
                    onChange={handleChange}
                    selected={value}
                />
            </>
        case 'time':
            return <>
                <Text>{formatDate(value, 'dd/MM/yyyy HH:mm:SS')}</Text>
                <DesktopTimePicker
                    onChange={handleChange}
                    value={value}
                />
            </>
        case 'datetime':
            return <>
                <Text>{formatDate(value, 'dd/MM/yyyy HH:mm:SS')}</Text>
                <DesktopDateTimePicker
                    onChange={handleChange}
                    value={value}
                />
            </>
        default:
            return <></>
    }
}