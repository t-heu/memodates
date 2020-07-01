import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {LocaleConfig, Calendar} from 'react-native-calendars';
import {format} from 'date-fns-tz';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';

import {styles} from './styles';
import CreateBirthday from '../CreateBirthday';
import configDate from '../../utils/configDate';
import {ApplicationState} from '../../store';
import ListInOrder from '../ListInOrder';
import DetailsEvent from '../DetailsEvent';

LocaleConfig.locales.ptBR = {
  monthNames: configDate.monthNames,
  monthNamesShort: configDate.monthNamesShort,
  dayNames: configDate.dayNames,
  dayNamesShort: configDate.dayNamesShort,
};
LocaleConfig.defaultLocale = 'ptBR';

interface IBirthday {
  start: Date;
  end: Date;
  date: Date;
  id: string;
  summary: string;
  color: string;
}

export default function CalendarComponent() {
  const [activeModal, setActiveModal] = useState(false);
  const [birthdays, setBirthdays] = useState([] as IBirthday[]);
  const [activeAdd, setActiveAdd] = useState(new Date());
  const [comp, setComp] = useState(<RenderCalendar />);
  const {birthday} = useSelector((state: ApplicationState) => state.events);
  const [month, setMonth] = useState(new Date());
  const navigation = useNavigation();

  function modal(date: any) {
    setActiveModal(true);
    setActiveAdd(
      new Date(`${format(new Date(date.dateString), 'yyyy/MM')}/${date.day}`),
    );

    const arr: IBirthday[] = [];
    birthday.map((info: any) => {
      if (date.dateString === `${format(new Date(info.date), 'yyyy-MM-dd')}`) {
        arr.push(info);
        setBirthdays(arr);
      }
    });

    if (arr.length < 1) {
      setActiveModal(false);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setComp(<RenderCalendar />);
    }, 100);
  }, [birthday, activeAdd, month]);

  function colorAplication(state: string, types?: string) {
    if (types === 'letter') {
      if (state === 'today') {
        return '#fff';
      } else if (state === 'disabled') {
        return '#8c9494';
      } else {
        return '#222';
      }
    } else {
      if (state === 'today') {
        return '#f34b56';
      } else if (state === 'disabled') {
        return '#f6f6f6';
      } else {
        return 'transparent';
      }
    }
  }

  function RenderCalendar() {
    return (
      <Calendar
        current={month}
        hideArrows={true}
        renderHeader={() => (
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Entypo name={'list'} size={30} color={'#e14344'} />
            </TouchableOpacity>

            <Text style={styles.header__month}>
              {configDate.monthNames[month.getMonth()]} {month.getFullYear()}
            </Text>

            <TouchableOpacity
              onPress={() => {
                moment.addRealMonth = function addRealMonth(d) {
                  const fm = moment(d).add(-1, 'month');
                  const fmEnd = moment(fm).endOf('month');
                  return d.date() != fm.date() &&
                    fm.isSame(fmEnd.format('YYYY-MM-DD'))
                    ? fm.add(1, 'd')
                    : fm;
                };

                const nextMonth = moment.addRealMonth(moment(month));
                setMonth(new Date(nextMonth));
              }}
              style={styles.header__arrow}>
              <AntDesign name={'arrowleft'} size={24} color={'#fff'} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                moment.addRealMonth = function addRealMonth(d) {
                  const fm = moment(d).add(1, 'month');
                  const fmEnd = moment(fm).endOf('month');
                  return d.date() != fm.date() &&
                    fm.isSame(fmEnd.format('YYYY-MM-DD'))
                    ? fm.add(1, 'd')
                    : fm;
                };

                const nextMonth = moment.addRealMonth(moment(month));
                setMonth(new Date(nextMonth));
              }}
              style={styles.header__arrow}>
              <AntDesign name={'arrowright'} size={24} color={'#fff'} />
            </TouchableOpacity>
          </View>
        )}
        theme={{
          calendarBackground: '#fff',
          textSectionTitleColor: '#2f3542',
          textDayHeaderFontFamily: 'OpenSans-Regular',
          textDayHeaderFontWeight: '400',
          'stylesheet.calendar.header': {
            week: {
              margin: 0,
              marginBottom: 5,
              marginTop: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            },
            header: {
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            },
          },
          'stylesheet.calendar.main': {
            container: {
              margin: 0,
            },
            week: {
              marginTop: 0,
              margin: 0,
              padding: 0,
              flexDirection: 'row',
            },
          },
        }}
        style={styles.calendarList}
        dayComponent={({date, state}) => (
          <TouchableOpacity
            style={[
              styles.day,
              {
                backgroundColor: colorAplication(state),
                borderColor:
                  date.dateString === format(activeAdd, 'yyyy-MM-dd')
                    ? '#f34b56'
                    : '#eee',
              },
            ]}
            onPress={() => modal(date)}>
            <View>
              <Text
                style={[
                  {
                    color: colorAplication(state, 'letter'),
                    textAlign: 'center',
                    fontFamily: 'OpenSans-Regular',
                  },
                ]}>
                {date.day}
              </Text>

              <View style={styles.events}>
                {birthday.map((r: any) => {
                  return `${date.month}-${date.day}` ===
                    format(new Date(r.date), 'M-d') ? (
                    <View
                      key={r.id}
                      style={[
                        styles.events__item,
                        {
                          backgroundColor:
                            format(new Date(), 'MM-dd') ===
                            format(new Date(r.date), 'MM-dd')
                              ? '#fff'
                              : r.color,
                        },
                      ]}>
                      <Text
                        style={{
                          color:
                            format(new Date(), 'MM-dd') ===
                            format(new Date(r.date), 'MM-dd')
                              ? '#222'
                              : '#fff',
                          fontSize: 10,
                        }}>
                        {r.summary}
                      </Text>
                    </View>
                  ) : null;
                })}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  }

  return (
    <>
      {comp}

      <CreateBirthday dateSelected={String(activeAdd)} />

      {activeModal && birthdays.length > 0 ? (
        <DetailsEvent events={birthdays} />
      ) : (
        <ListInOrder />
      )}
    </>
  );
}
