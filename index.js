import {AppRegistry} from 'react-native';
import BackgroundFetch from 'react-native-background-fetch';

import App from './App';
import {name as appName} from './app.json';
import {TaskVerifyDate} from './src/backgroundtask';

let MyHeadlessTask = async (event) => {
  let taskId = event.taskId;
  TaskVerifyDate();
  BackgroundFetch.finish(taskId);
};

BackgroundFetch.registerHeadlessTask(MyHeadlessTask);

AppRegistry.registerComponent(appName, () => App);
