import React, {useContext} from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import HomeScreen from '../screens/Home';
import TodosScreen from '../screens/Todos';
import DebugScreen from '../screens/Debug';
import HabitsScreen from '../screens/Habits';

import { UserContext } from '../context/User';

const Drawer = createDrawerNavigator();

export default function DashboardStack(props, {navigation}) {
  

  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props)=><CustomDrawer {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Todo" component={TodosScreen} />
      <Drawer.Screen name="Habits" component={HabitsScreen} />
      {__DEV__ && <Drawer.Screen name="Debug" component={DebugScreen} />}
    </Drawer.Navigator>
  )
}

function CustomDrawer(props) {
  const {user, setUser} = useContext(UserContext);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={()=>setUser(null)} />
    </DrawerContentScrollView>
  )
}