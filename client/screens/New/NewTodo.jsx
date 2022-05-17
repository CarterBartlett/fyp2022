import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Formik } from 'formik';
import { Text, TextInput , Button, HelperText, Checkbox } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format as formatDate } from 'date-fns';

export default function NewTodoScreen() {
  const [datepickerDisplay, setDatepickerDisplay] = useState(false);
  const [timepickerDisplay, setTimepickerDisplay] = useState(false);
  const openDatePicker = () => setDatepickerDisplay(true);
  const openTimePicker = () => setTimepickerDisplay(true);

  return (
    <ScrollView>
      <Text>New Todo Screen</Text>
      <Formik
        initialValues={{
          title: '',
          description: '',
          useDueDate: false,
          due: new Date()
        }}>
          {({handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, dirty, setFieldValue}) => (
            <>
              <TextInput
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
                label="Title" />
              
              <TextInput
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
                label="Description" />

              <Checkbox.Item
                label="Add Due Date?"
                status={values.useDueDate ? "checked" : "unchecked"}
                onPress={()=>setFieldValue('useDueDate', !values.useDueDate)}/>

              {values.useDueDate && <>
                <Text style={{fontSize:24, textAlign:'center'}}>{formatDate(values.due, 'eeee do MMMM')} at {formatDate(values.due, 'K:mmaaa')}</Text>
                <Button onPress={openDatePicker} mode="contained">Change Date</Button>
              </>}

              {datepickerDisplay && <DateTimePicker
                mode="date"
                onChange={e=>{
                  setDatepickerDisplay(false);
                  if (e.type=='set') {
                    setTimepickerDisplay(true);
                    const newDate = values.due;
                    newDate.setDate(e.nativeEvent.timestamp.getDate());
                    setFieldValue('due', newDate);
                  }
                }}
                onBlur={handleBlur('due')}
                value={values.due} /> }
              {timepickerDisplay && <DateTimePicker
                mode="time"
                onChange={e=>{
                  setTimepickerDisplay(false);
                  if (e.type=='set') {
                    const newDate = values.due;
                    newDate.setTime(e.nativeEvent.timestamp.getTime());
                    setFieldValue('due', newDate);
                  }
                }}
                onBlur={handleBlur('due')}
                value={values.due} /> }

              <Button mode="contained" onPress={handleSubmit}>Add Task</Button>
            </>
          )}
        </Formik>
    </ScrollView>
  )
}
