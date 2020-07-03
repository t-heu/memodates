import PushNotification from 'react-native-push-notification';
import {format} from 'date-fns-tz';

import {store} from './store';

function Notification(name: string, date: string) {
  PushNotification.localNotification({
    title: `${name || ''}`,
    message: `${format(new Date(date), 'HH:mm') || 'null'} ${
      Number(format(new Date(), 'HH')) <= 12 ? 'PM' : 'AM'
    }`,
    largeIcon: 'icon',
    smallIcon: 'icon_noti',
  });
}

export async function TaskVerifyDate() {
  const {birthday} = store.getState().events;

  birthday.map((response) => {
    const dateAge = format(new Date(), 'yyyy-MM-dd:HH:mm');

    if (format(new Date(response.startDate), 'yyyy-MM-dd:HH:mm') === dateAge) {
      Notification(response.title, response.startDate);
    }
  });
}
