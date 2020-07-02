import {all, takeEvery} from 'redux-saga/effects';

import {EventTypes} from '../ducks/events/types';
import update_events from './update_events';

export default function* rootSaga() {
  yield all([takeEvery(EventTypes.EVENT_UPDATE, update_events)]);
}
