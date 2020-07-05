import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {LocaleConfig, Calendar} from 'react-native-calendars';
import {format} from 'date-fns-tz';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {styles} from './styles';
import {EventSave} from '../../store/ducks/events/action';
import configDate from '../../utils/configDate';
import {ApplicationState} from '../../store';

LocaleConfig.locales.ptBR = {
  monthNames: configDate.monthNames,
  monthNamesShort: configDate.monthNamesShort,
  dayNames: configDate.dayNames,
  dayNamesShort: configDate.dayNamesShort,
};
LocaleConfig.defaultLocale = 'ptBR';

export default function CalendarComponent() {
  const [comp, setComp] = useState(<RenderCalendar />);
  const {events} = useSelector((state: ApplicationState) => state.events);
  const [month, setMonth] = useState(new Date());
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function PressDay(date: any) {
    const attDate = new Date(
      `${format(new Date(date.dateString), 'yyyy/MM')}/${date.day}`,
    );

    dispatch(EventSave({event: {date: attDate}}));
    navigation.navigate('Events', {
      day: date.dateString,
    });
  }

  useEffect(() => {
    setTimeout(() => {
      setComp(<RenderCalendar />);
    }, 100);
  }, [events, month]);

  function colorAplication(state: string, types?: string) {
    if (types === 'letter') {
      if (state === 'today') {
        return '#fff';
      } else if (state === 'disabled') {
        return '#8c9494';
      } else {
        return '#fff';
      }
    } else {
      if (state === 'today') {
        return '#297070';
      } else if (state === 'disabled') {
        return '#111'; ///'#f6f6f6';
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
              <SimpleLineIcons name={'menu'} size={24} color={'#eee'} />
            </TouchableOpacity>

            <Text style={styles.header__month}>
              {configDate.monthNames[month.getMonth()]} {month.getFullYear()}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '50%',
              }}>
              <TouchableOpacity onPress={() => setMonth(new Date())}>
                <MaterialCommunityIcons
                  name={'calendar'}
                  size={28}
                  color={'#eee'}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  moment.addRealMonth = function addRealMonth(d) {
                    const fm = moment(d).add(-1, 'month');
                    const fmEnd = moment(fm).endOf('month');
                    return d.date() !== fm.date() &&
                      fm.isSame(fmEnd.format('YYYY-MM-DD'))
                      ? fm.add(1, 'd')
                      : fm;
                  };

                  const nextMonth = moment.addRealMonth(moment(month));
                  setMonth(new Date(nextMonth));
                }}>
                <MaterialCommunityIcons
                  name={'arrow-left-box'}
                  size={28}
                  color={'#297f7f'}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  moment.addRealMonth = function addRealMonth(d) {
                    const fm = moment(d).add(1, 'month');
                    const fmEnd = moment(fm).endOf('month');
                    return d.date() !== fm.date() &&
                      fm.isSame(fmEnd.format('YYYY-MM-DD'))
                      ? fm.add(1, 'd')
                      : fm;
                  };

                  const nextMonth = moment.addRealMonth(moment(month));
                  setMonth(new Date(nextMonth));
                }}>
                <MaterialCommunityIcons
                  name={'arrow-right-box'}
                  size={28}
                  color={'#297f7f'}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{padding: 10}}
                onPress={() =>
                  navigation.navigate('Events', {
                    day: format(new Date(), 'yyyy-MM-dd'),
                  })
                }>
                <Ionicons name={'md-add'} size={30} color={'#eee'} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        theme={{
          calendarBackground: '#202124',
          textSectionTitleColor: '#fff',
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
                borderColor: state === 'today' ? '#297070' : '#444',
              },
            ]}
            onPress={() => PressDay(date)}>
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
              {events.map((r: any) => {
                return r.startDate &&
                  `${date.month}-${date.day}` ===
                    format(new Date(r.startDate), 'M-d') ? (
                  <View
                    key={r.id}
                    style={[
                      styles.events__item,
                      {
                        backgroundColor:
                          format(new Date(), 'MM-dd') ===
                          format(new Date(r.startDate), 'MM-dd')
                            ? '#eee'
                            : r.color
                            ? r.color
                            : r.calendar.color,
                      },
                    ]}>
                    <Text
                      style={{
                        color:
                          format(new Date(), 'MM-dd') ===
                          format(new Date(r.startDate), 'MM-dd')
                            ? '#222'
                            : '#222',
                        fontSize: 10,
                        fontFamily: 'OpenSans-SemiBold',
                        width: 300,
                      }}>
                      {r.title}
                    </Text>
                  </View>
                ) : null;
              })}
            </View>
          </TouchableOpacity>
        )}
      />
    );
  }

  return <>{comp}</>;
}
