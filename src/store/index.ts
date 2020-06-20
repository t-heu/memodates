/*import { persistStore } from 'redux-persist';
import { createStore } from 'redux'

import persistReducers from './persistReducers';
import rootReducer from './modules/rootReducer';

//const sagaMiddleware = createSagaMiddleware()
//const store = createStore(persistReducers(rootReducer), applyMiddleware(sagaMiddleware));
const store = createStore(persistReducers(rootReducer));
const persistor = persistStore(store);

//sagaMiddleware.run(rootSaga);

export { store, persistor };*/

import {persistStore} from 'redux-persist';
import {createStore, Store} from 'redux';

import {AuthState} from './ducks/auth/types';
import persistReducers from './persistReducers';
import rootReducer from './ducks/rootReducer';

export interface ApplicationState {
  auth: AuthState;
}

const store: Store<ApplicationState> = createStore(
  persistReducers(rootReducer),
);
const persistor = persistStore(store);

export {store, persistor};
