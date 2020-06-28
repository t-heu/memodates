import {AppRegistry} from 'react-native';

import App from './App';
import {name as appName} from './app.json';
import {TaskVerifyDate} from './src/notification';

const MyHeadlessTask = async () => {
  TaskVerifyDate();
};

AppRegistry.registerHeadlessTask('Heartbeat', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => App);
