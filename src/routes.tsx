import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from './pages/Home';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function Routes() {
  return (
    <Drawer.Navigator
      drawerStyle={{backgroundColor: '#f5f5f5', width: 305}}
      drawerContent={() => <CustomDrawerContent />}>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
}
