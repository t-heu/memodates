import {persistStore} from 'redux-persist';
import {createStore, Store, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {AuthState} from './ducks/auth/types';
import {EventState} from './ducks/events/types';
import persistReducers from './persistReducers';
import rootReducer from './ducks/rootReducer';
import rootSaga from './sagas';

export interface ApplicationState {
  auth: AuthState;
  events: EventState;
}

const sagaMiddleware = createSagaMiddleware();

const store: Store<ApplicationState> = createStore(
  persistReducers(rootReducer),
  applyMiddleware(sagaMiddleware),
);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export {store, persistor};
