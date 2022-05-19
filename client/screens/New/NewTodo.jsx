import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Formik } from 'formik';
import { Text, TextInput , Button, HelperText, Checkbox } from 'react-native-paper';
import {format as formatDate } from 'date-fns';
import axios from 'axios';

import DatePicker from '../../components/DatePicker';
import MultiButtonGroup from '../../components/MultiButtonGroup';

import * as yup from 'yup';

const validationSchema = yup.object().shape({
  title: yup.string().min(3).required()
});

export default function NewTodoScreen({navigation}) {

  const handleSubmit = async (values, formikBag) => {
    const due = values.due;
    due.setSeconds(0);
    due.setMilliseconds(0);
    const objectToSend = {
      title: values.title,
      description: values.description,
      due: values.useDueDate ? due : null,
      priority: values.priority
    }

    await axios.post('/todos', objectToSend);
    navigation.reset({index:0, routes:[{name:'Dashboard'}]})
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
        }}
        validationSchema={validationSchema}>
          {({handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, dirty, setFieldValue}) => (
            <>
              <TextInput
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
                label="Title" />
              <HelperText type="error" visible={errors.title && touched.title}>{errors.title}</HelperText>
              
              <TextInput
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
                label="Description" />
              <HelperText type="error" visible={errors.description && touched.description}>{errors.description}</HelperText>

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
                
              <Text style={{fontSize: 18}}>Set a priority level</Text>
              <MultiButtonGroup
                buttons={[
                  {value:0, color:'gray'},
                  {value:1, color:'red'},
                  {value:2, color:'orange'},
                  {value:3, color:'green'},
                ]}
                value={values.priority}
                onChange={val=>setFieldValue('priority', val)}
              />
              
              <Button mode="contained" onPress={handleSubmit} disabled={!isValid || !dirty}>Add Task</Button>
            </>
          )}
        </Formik>
    </ScrollView>
  )
}
