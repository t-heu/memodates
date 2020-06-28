import PushNotification from 'react-native-push-notification';
import {format} from 'date-fns-tz';
//import {useState} from 'react';

import {show} from './services/realm';

function Notification(name?: string) {
  PushNotification.localNotification({
    title: 'Chegou o dia!!',
    message: `Deseje os parábens ao seu amigo(a)/familia/namorado(a) ${
      name || ''
    }`,
    largeIcon: 'icon',
    smallIcon: 'icon_noti',
    //repeatType: 'minute',
    //repeatTime: 100
  });
}

export async function TaskVerifyDate() {
  const res = await show();

  res.map((response) => {
    const dateAge = format(new Date(), 'yyyy-MM-dd');
    const dateBirthday = new Date(response.date);
    const StartHoursMark = format(new Date(response.start), 'HH:mm');

    const HoursAge = format(new Date(), 'HH:mm');

    if (format(dateBirthday, 'yyyy-MM-dd') === dateAge) {
      if (HoursAge === StartHoursMark) {
        Notification(response.summary);
      }

      /*if (HoursAge !== StartHoursMark && !exe) {
        //setExe(true);
        exe = true;
      }*/
    }
  });
}
