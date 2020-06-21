import 'react-native-gesture-handler';

import React, {useEffect} from 'react';
import {StatusBar, Platform, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import BackgroundFetch from 'react-native-background-fetch';
import PushNotification from 'react-native-push-notification';
import codePush from 'react-native-code-push';

import Routes from './src/routes';
import {store, persistor} from './src/store';
import {TaskVerifyDate} from './src/backgroundtask';

const codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_RESUME};

const App: React.FC = () => {
  useEffect(() => {
    PushNotification.configure({
      // onRegister: function(token) {
      //   //console.log("TOKEN:", token);
      // },

      // onNotification: function(notification) {
      //   //console.log("NOTIFICATION:", notification);
      //   //notification.finish(PushNotificationIOS.FetchResult.NoData);
      // },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios', //requestPermissions: true,
    });

    //Configure it.
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15,
        forceAlarmManager: false,
        stopOnTerminate: false,
        enableHeadless: true,
        startOnBoot: true,
      },
      async (taskId) => {
        TaskVerifyDate();
        BackgroundFetch.finish(taskId);
      },
      (error) => {
        console.log(error);
      },
    );

    BackgroundFetch.status((status) => {
      switch (status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          Alert.alert('Error', 'BackgroundFetch restricted');
          //console.log("BackgroundFetch restricted");
          break;
        case BackgroundFetch.STATUS_DENIED:
          Alert.alert('Error', 'BackgroundFetch denied');
          //console.log("BackgroundFetch denied");
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log('BackgroundFetch is enabled');
          break;
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#8dbd59" barStyle="light-content" />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default codePush(codePushOptions)(App);
