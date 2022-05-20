import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

export default function NewHabitScreen() {
  const handleSubmit = async (values, formikBag) => {
    const objectToSend = {
      title: values.title,
      description: values.description,
    }

    const req = await axios.post('/habits', objectToSend);
    navigation.reset({index:0, routes:[{name:'Dashboard'}]})
  }

  return (
    <ScrollView>
      <Formik
        initialValues={{
          title: '',
          description: ''
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({values, errors, touched, dirty, isValid, handleBlur, handleChange, handleSubmit}) => <>
          <TextInput
            value={values.title}
            label="Title"
            onChange={handleChange('title')}
            onBlur={handleBlur('title')}
          />
          <HelperText type="error" visible={errors.title && touched.title}>{errors.title}</HelperText>

          <TextInput
            value={values.description}
            label="Description"
            onChange={handleChange('description')}
            onBlur={handleBlur('description')}
          />
          <HelperText type="error" visible={errors.description && touched.description}>{errors.description}</HelperText>

          <Button mode="contained" onPress={handleSubmit} disabled={!isValid || !dirty}>Create New Habit</Button>
        </>}
      </Formik>
    </ScrollView>
  )
}

const validationSchema = yup.object().shape({
  title: yup.string().min(3).required()
})