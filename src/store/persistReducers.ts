import {AsyncStorage} from 'react-native';
import {persistReducer} from 'redux-persist';
import {Reducer} from 'redux';

export default (reducer: Reducer) => {
  const persistedReducer = persistReducer(
    {
      key: 'point',
      storage: AsyncStorage,
      whitelist: ['auth'],
    },
    reducer,
  );
  return persistedReducer;
};
