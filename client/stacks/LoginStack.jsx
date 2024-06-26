import React from 'react';

import LoginScreen from '../screens/Auth/Login';
import SignupScreen from '../screens/Auth/Signup';
import ConfirmAccountCreationScreen from '../screens/Auth/ConfirmAccountCreation';

export default function LoginStack(Stack) {

  return (
    <Stack.Group screenOptions={{headerShown: true}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{title:'Create an account'}} />
      <Stack.Screen name="ConfirmAccountCreation" component={ConfirmAccountCreationScreen} options={{title: "Account Created"}} />
    </Stack.Group>
  )
}