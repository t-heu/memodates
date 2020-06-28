import {persistStore} from 'redux-persist';
import {createStore, Store} from 'redux';

import {AuthState} from './ducks/auth/types';
import {EventState} from './ducks/events/types';
import persistReducers from './persistReducers';
import rootReducer from './ducks/rootReducer';

export interface ApplicationState {
  auth: AuthState;
  events: EventState;
}

const store: Store<ApplicationState> = createStore(
  persistReducers(rootReducer),
);
const persistor = persistStore(store);

export {store, persistor};
