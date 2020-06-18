import React from 'react';
//import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './pages/Home';
//import CreateBirthday from './pages/CreateBirthday';
import CustomDrawerContent from './CustomDrawerContent'

//const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function Routes() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
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