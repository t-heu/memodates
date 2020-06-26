import {format} from 'date-fns-tz';

import callNoti from './notification';
import {offList} from './services/realm';

export function TaskVerifyDate() {
  offList().then((res) => {
    res.map((response) => {
      const dateBirthdayAge = format(new Date(), 'yyyy-MM-dd');
      const HoursBirthdayAge = Number(format(new Date(), 'HH'));
      const dateBirthday = new Date(response.date);

      if (
        format(dateBirthday, 'yyyy-MM-dd') === dateBirthdayAge &&
        HoursBirthdayAge >= 7 &&
        HoursBirthdayAge <= 7
      ) {
        callNoti(response.summary);
      }
    });
  });
}
