import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {LocaleConfig, Calendar} from 'react-native-calendars';
import {format} from 'date-fns-tz';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
        return '#222';
      }
    } else {
      if (state === 'today') {
        return '#f34b56';
      } else if (state === 'disabled') {
        return 'transparent'; //'#f6f6f6';
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
          <View
            style={{
              width: '100%',
              overflow: 'hidden',
              paddingBottom: 5,
            }}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={{borderRadius: 100}}>
                <MaterialCommunityIcons
                  name={'menu'}
                  size={24}
                  color={'#222'}
                />
              </TouchableOpacity>

              <Text style={styles.header__month}>
                {configDate.monthNames[month.getMonth()]}{' '}
                {month.getFullYear() === new Date().getFullYear()
                  ? null
                  : month.getFullYear()}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '50%',
                }}>
                <TouchableOpacity
                  style={{
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor: '#999',
                    width: 25,
                  }}
                  onPress={() => setMonth(new Date())}>
                  <Text
                    style={{textAlign: 'center', fontSize: 16, color: '#999'}}>
                    {new Date().getUTCDate()}
                  </Text>
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
                  <AntDesign name={'arrowleft'} size={28} color={'#222'} />
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
                  <AntDesign name={'arrowright'} size={28} color={'#222'} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    height: 35,
                    width: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f34b56',
                    borderRadius: 100,
                  }}
                  onPress={() =>
                    navigation.navigate('Events', {
                      day: format(new Date(), 'yyyy-MM-dd'),
                    })
                  }>
                  <Ionicons name={'md-add'} size={24} color={'#fff'} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        theme={{
          calendarBackground: '#fff', //'#202124',
          textSectionTitleColor: '#666',
          textDayHeaderFontFamily: 'OpenSans-Regular',
          textDayHeaderFontWeight: 'bold',
          'stylesheet.calendar.header': {
            week: {
              margin: 0,
              marginBottom: 4,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            },
            header: {
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
          <TouchableOpacity style={styles.day} onPress={() => PressDay(date)}>
            <Text
              style={[
                {
                  color: colorAplication(state, 'letter'),
                  textAlign: 'center',
                  backgroundColor: colorAplication(state),
                  borderRadius: 100,
                  height: 20,
                  width: 20,
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
                            ? r.color
                              ? r.color
                              : r.calendar.color
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
