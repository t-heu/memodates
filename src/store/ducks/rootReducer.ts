import {combineReducers} from 'redux';

import auth from './auth';
import events from './events';

const reducers = combineReducers({auth, events});

export default reducers;
