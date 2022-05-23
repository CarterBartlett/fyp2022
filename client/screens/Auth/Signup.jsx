import React, { useState } from 'react'
import { ScrollView } from 'react-native';
import { Text, TextInput , Button, HelperText } from 'react-native-paper';
import * as yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

import { AppStateContext } from '../../context/AppState';

export default function SignUpScreen({navigation}) {
  const [appState, setAppState] = useState(AppStateContext);

  const handleSubmit = async (values,formikBag) => {
    setAppState({...appState, loading: true});
    const {username, firstName, lastName, email, password} = values;
    const req = await axios.post('/auth/register', {username, password:values.password, firstName, lastName, email, password});
    setAppState({...appState, loading: false});
    navigation.navigate('ConfirmAccountCreation');
  }

  return (
    <ScrollView>
      <Formik
        initialValues={{
          username: '',
          password: '',
          firstName: '',
          lastName: '',
          email: ''
        }}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validationSchema={validationSchema}
      >
      {({handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, dirty}) => (
        <>

          <TextInput
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
            label="Username" />
          <HelperText type="error" visible={errors.username && touched.username}>{errors.username}</HelperText>
            
          <TextInput
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            label="Password"
            secureTextEntry={true} />
          <HelperText type="error" visible={errors.password && touched.password}>{errors.password}</HelperText>

          <TextInput
            onChangeText={handleChange('confirmpassword')}
            onBlur={handleBlur('confirmpassword')}
            value={values.confirmpassword}
            label="Confirm Password"
            secureTextEntry={true} />
          <HelperText type="error" visible={errors.confirmpassword && touched.confirmpassword}>{errors.confirmpassword}</HelperText>

          <TextInput
            onChangeText={handleChange('firstName')}
            onBlur={handleBlur('firstName')}
            value={values.firstName}
            label="First Name" />
          <HelperText type="error" visible={errors.firstName && touched.firstName}>{errors.firstName}</HelperText>

          <TextInput
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
            value={values.lastName}
            label="Last Name" />
          <HelperText type="error" visible={errors.lastName && touched.lastName}>{errors.lastName}</HelperText>

          <TextInput
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            label="Email Address" />
          <HelperText type="error" visible={errors.email && touched.email}>{errors.email}</HelperText>

          <Button
            mode="contained"
            onPress={(handleSubmit)}
            disabled={!isValid || !dirty}>
              Sign up
          </Button>

        </>
      )}
      </Formik>
      
    </ScrollView>
  )
}

const validationSchema = yup.object().shape({
  username: yup.string().min(3).max(30).required().label('Username'),
  password: yup.string().min(3).max(30).required().label('Password'),
  confirmpassword: yup.string().test('password-match', 'Passwords must match', function(v){return this.parent.password==v}),
  firstName: yup.string().min(3).max(30).required().label('First Name'),
  lastName: yup.string().min(3).max(30).required().label('Last Name'),
  email: yup.string().required().email().label('E-mail Address')
});