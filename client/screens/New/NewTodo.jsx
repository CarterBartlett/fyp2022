import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Formik } from 'formik';
import { Text, TextInput , Button, HelperText, Checkbox } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format as formatDate } from 'date-fns';

import DatePicker from '../../components/DatePicker';

export default function NewTodoScreen() {

  const handleSubmit = async (values, formikBag) => {
    console.log({values})
  }

  return (
    <ScrollView>
      <Text>New Todo Screen</Text>
      <Formik
        onSubmit={handleSubmit}
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
                <DatePicker
                  mode="datetime"
                  onChange={(val)=>setFieldValue(
                    'due', val)}
                  values={values.due}
                />
              </>}

              <Button mode="contained" onPress={handleSubmit}>Add Task</Button>
            </>
          )}
        </Formik>
    </ScrollView>
  )
}
