import 'react-native-gesture-handler';

import { Provider as PaperProvider, Portal, DefaultTheme, ActivityIndicator } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React, { useState, useMemo } from 'react';

import LoginStack from './stacks/LoginStack';
import DashboardStack from './stacks/DashboardStack';

import { UserContext } from './context/User';
import { AppStateContext } from './context/AppState';
import Toast from 'react-native-toast-message';

import DatePicker from './components/DatePicker';

const Stack = createStackNavigator();

export default function App() {

  const [user, setUser] = useState(null);
  const [appState, setAppState] = useState({
    loading: false
  });
  const providerValue = useMemo(()=> ((user,setUser)), [user, setUser]);

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
              <View style={{backgroundColor:'rgba(0,0,0,0.5)', height:'100%'}}>
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
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    //accent: '#f1c40f',
  },
};