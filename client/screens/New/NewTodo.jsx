import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Formik } from 'formik';
import { Text, TextInput , Button, HelperText } from 'react-native-paper';

export default function NewTodoScreen() {
  return (
    <ScrollView>
      <Text>New Todo Screen</Text>
      <Formik
        initialValues={{
          title: '',
          description: '',
          due: ''
        }}>
          {({handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, dirty}) => {
            <>
              <TextInput
                onChangeText={handleChange('title')}
                onBlur={handleBlur('blur')}
                value={values.title}
                label="Title" />
            </>
          }}
        </Formik>
    </ScrollView>
  )
}
