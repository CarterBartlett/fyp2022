import React, {useContext, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import axios from 'axios';
import Toast from 'react-native-toast-message';

import { UserContext } from '../../context/User';

import {API_BASEPATH} from '../../consts.json';

export default function LoginScreen({navigation}) {
  const {user, setUser} = useContext(UserContext);

  async function attemptLogin(username, password) {
    console.log({candidateUsername, candidatePassword, API_BASEPATH});
    try {
      const req = await axios.post(`${API_BASEPATH}/auth/login`, {username, password});
      console.log(req.data);
      setUser(req.data);
    } catch (err) {
      if (err.response.status=401) {
        Toast.show({
          type: 'error',
          text1: 'Invalid username/password combination.'
        })
      } else {
        console.error(err);
      }
    }
  }

  const [candidateUsername, setCandidateUsername] = useState('');
  const [candidatePassword, setCandidatePassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.loginform}>
        <TextInput 
          label="Username"
          value={candidateUsername}
          onChangeText={text=>setCandidateUsername(text)}
          />
        <TextInput 
          label="Password"
          secureTextEntry={true}
          value={candidatePassword}
          onChangeText={text=>setCandidatePassword(text)}
          />
      </View>
      <Button mode="contained" onPress={()=>attemptLogin(candidateUsername, candidatePassword)}>Log In</Button>
      <Button mode="contained" onPress={()=>navigation.navigate('Signup')}>Sign Up</Button>

      <Button mode="contained" onPress={()=>attemptLogin('TestUser001', 'password')}>Login as Test User</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1
  },
  loginform:{
  }
})