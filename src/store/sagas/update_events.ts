import {call, put} from 'redux-saga/effects';
import RNCalendarEvents from 'react-native-calendar-events';
import {format} from 'date-fns-tz';

import {EventSuccess} from '../ducks/events/action';

async function load() {
  try {
    const res = await RNCalendarEvents.fetchAllEvents(
      `${format(new Date(), 'yyyy')}-01-01T00:00:00.000Z'`,
      `${format(new Date(), 'yyyy')}-12-31T00:00:00.000Z`,
      //['6'],
    );
    return res;
  } catch (e) {
    return e;
  }
}

export default function* updateEvents() {
  try {
    const response = yield call(load);

    yield put(EventSuccess({events: response}));
  } catch (e) {
    console.log(e);
  }
}
