import React, {useContext} from 'react';

import LoginScreen from '../screens/Auth/Login';
import SignupScreen from '../screens/Auth/Signup';

export default function LoginStack(Stack) {

  return (
    <Stack.Group screenOptions={{headerShown: true}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{title:'Create an account'}} />
    </Stack.Group>
  )
}