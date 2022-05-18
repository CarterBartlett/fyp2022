import React, {useContext, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import axios from 'axios';
import Toast from 'react-native-toast-message';

import { UserContext } from '../../context/User';
import { AppStateContext } from '../../context/AppState';

import {API_BASEPATH} from '../../consts.json';

export default function LoginScreen({navigation}) {
  const {user, setUser} = useContext(UserContext);
  const { appState, setAppState } = useContext(AppStateContext);

  async function attemptLogin(username, password) {
    setAppState({...appState, loading: true});
    try {
      const req = await axios.post('/auth/login', {username, password});
      setUser(req.data);
      setAppState({...appState, loading: false});
    } catch (err) {
      console.error(err);
      if (err.response.status=401) {
        Toast.show({
          type: 'error',
          text1: 'Invalid username/password combination.'
        })
      } else {
        Toast.show({
          type: 'error',
          text1: 'Invalid username/password combination.'
        })
        console.error(err);
      }
      setAppState({...appState, loading: false});
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