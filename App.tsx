import 'react-native-gesture-handler';

import React, {useEffect} from 'react';
import {StatusBar, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import PushNotification from 'react-native-push-notification';
import codePush from 'react-native-code-push';

import Routes from './src/routes';
import {store, persistor} from './src/store';
import Heartbeat from './Heartbeat';

const codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_RESUME};

const App: React.FC = () => {
  useEffect(() => {
    Heartbeat.stopService();
    Heartbeat.startService();

    PushNotification.configure({
      // onRegister: function(token) {
      //   //console.log("TOKEN:", token);
      // },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios', //requestPermissions: true,
    });
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#e14344" barStyle="light-content" />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default codePush(codePushOptions)(App);
