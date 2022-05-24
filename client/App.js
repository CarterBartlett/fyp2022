import 'react-native-gesture-handler';

import { Provider as PaperProvider, Portal, DefaultTheme, ActivityIndicator } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React, { useState, useEffect } from 'react';

import LoginStack from './stacks/LoginStack';
import DashboardStack from './stacks/DashboardStack';

import { UserContext } from './context/User';
import { AppStateContext } from './context/AppState';
import Toast from 'react-native-toast-message';

import {API_BASEPATH} from '@env';
import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = API_BASEPATH || 'http://localhost:3000';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [appState, setAppState] = useState({
    loading: true
  });

  useEffect(()=>{
    async function fetchData() {
      try {
        setAppState({...appState, loading:true});
        const res = await axios.get('/auth/user');
        setUser(res.data);
        setAppState({...appState, loading:false});
      } catch (err) {
        console.error(err);
      }
    }
    
    fetchData();
  },[]);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <UserContext.Provider value={{user,setUser}}>
          <AppStateContext.Provider value={{appState, setAppState}}>
            <Portal><Toast /></Portal>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              {user ? DashboardStack(Stack) : LoginStack(Stack)}
            </Stack.Navigator>
            {appState.loading && <Portal>
              <View style={styles.overlay}>
                <ActivityIndicator 
                  animating={true}
                  hidesWhenStopped={false}
                  style={{justifyContent: 'center', alignItems: 'center', height:50, marginTop:'100%'}}
                  size='large'
                  />
                </View>
            </Portal>}
          </AppStateContext.Provider>
        </UserContext.Provider>
      </NavigationContainer>
    </PaperProvider>
    
  );
}

const styles = StyleSheet.create({
  overlay: {
   backgroundColor:'rgba(0,0,0,0.5)',
    height:'100%'
  }
});

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db'
  },
};