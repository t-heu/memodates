import React from 'react';
//import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './pages/Home';
import CustomDrawerContent from './CustomDrawerContent'

//const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function Routes() {
  return (
    <Drawer.Navigator drawerStyle={{backgroundColor: '#f5f5f5', width: 305}} drawerContent={props => <CustomDrawerContent />}>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
}

/** 
 * <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="CreateBirthday" component={CreateBirthday} />
      <Stack.Screen name="Home" component={Home} />
 </Stack.Navigator>
*/