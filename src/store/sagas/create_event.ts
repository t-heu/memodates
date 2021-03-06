import {call, put} from 'redux-saga/effects';
import {Alert} from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';
import moment from 'moment';

import {EventUpdate} from '../ducks/events/action';

async function findAll() {
  return await RNCalendarEvents.findCalendars();
}

async function save(
  title: string,
  date: Date,
  startDate: Date,
  endDate: Date,
  find: any,
  id?: string,
) {
  return await RNCalendarEvents.saveEvent(title, {
    calendarId: find[0] || find.length > 0 ? find[0].id : undefined,
    id: id ? id : undefined,
    startDate:
      moment.utc(date).format('YYYY-MM-DD') +
      moment.utc(startDate).format('THH:mm:ss.SSS[Z]'),
    endDate: moment.utc(endDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    alarms: [
      {
        date:
          moment.utc(date).format('YYYY-MM-DD') +
          moment.utc(startDate).format('THH:mm:ss.SSS[Z]'),
      },
    ],
    //location: '',
  });
}

export default function* createEvents({payload}: any) {
  try {
    console.log(payload);
    const {title, date, startDate, endDate} = payload.event;
    const response = yield call(findAll);

    const find = response.filter((r) => r.source === 'event_local_memodates');

    const res = yield call(
      save,
      title,
      date,
      startDate,
      endDate,
      find,
      payload.event.id,
    );

    if (res) {
      Alert.alert('Salvo com sucesso');
      yield put(EventUpdate());
    }
  } catch (e) {
    console.log(e);
  }
}
