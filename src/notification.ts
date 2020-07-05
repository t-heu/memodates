import PushNotification from 'react-native-push-notification';
import {format} from 'date-fns-tz';

import {store} from './store';

function Notification(name: string, date: string) {
  PushNotification.localNotification({
    title: `${name || ''}`,
    message: `${format(new Date(date), 'HH:mm') || 'null'} ${
      Number(format(new Date(), 'HH')) < 12 ? 'AM' : 'PM'
    }`,
    largeIcon: 'icon',
    smallIcon: 'icon_noti',
  });
}

export async function TaskVerifyDate() {
  const {events} = store.getState().events;

  events.map((response) => {
    const dateAge = format(new Date(), 'yyyy-MM-dd:HH:mm:ss');

    if (
      format(new Date(response.startDate), 'yyyy-MM-dd:HH:mm:ss') === dateAge
    ) {
      console.log('aa');
      Notification(response.title, response.startDate);
    }
  });
}
