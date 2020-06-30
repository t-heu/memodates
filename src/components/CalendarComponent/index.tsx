import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {LocaleConfig, Calendar, CalendarList} from 'react-native-calendars';
import {format} from 'date-fns-tz';
import addMonths from 'date-fns/addMonths';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';

import CreateBirthday from '../CreateBirthday';
import configDate from '../../utils/configDate';
import {deleteObj, show} from '../../services/realm';
import {ApplicationState} from '../../store';
import {EventSuccess} from '../../store/ducks/events/action';
import ListInOrder from '../ListInOrder';

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
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [month, setMonth] = useState(format(new Date(), 'yyyy-MM-dd'));

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

  function aa(state: string, types?: string) {
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
        return '#f6f6f6'; //'#f2f4f3';
      } else {
        return 'transparent';
      }
    }
  }

  function deletes(r: any, index: number) {
    deleteObj(r).then(() => {
      show().then((events: any) => {
        dispatch(EventSuccess({events}));
      });
      birthdays.splice(index, 1);
    });
  }

  function RenderCalendar() {
    return (
      <Calendar
        //horizontal={true}
        /*renderArrow={(d) =>
          d === 'left' ? (
            <AntDesign name={'arrowleft'} size={22} color={'#f34b56'} />
          ) : (
            <AntDesign name={'arrowright'} size={22} color={'#f34b56'} />
          )
        }*/
        hideArrows={true}
        theme={{
          calendarBackground: '#fff',
          //monthTextColor: '#f34b56', //'#2f3542',
          //textMonthFontWeight: '700',
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
              //flex: 1,
            },
            week: {
              marginTop: 0,
              margin: 0,
              padding: 0,
              flexDirection: 'row',
            },
          },
        }}
        monthFormat={'MMMM yyyy'}
        current={month}
        //onPressArrowRight={() => month.add(1, 'month')}
        //onPressArrowLeft={() => month.add(-1, 'month')}
        style={styles.calendarList}
        renderHeader={(date: string) => (
          <View
            style={{
              padding: 10,
              paddingTop: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{paddingLeft: 10, paddingRight: 10}}>
              <Entypo name={'list'} size={30} color={'#f34b56'} />
            </TouchableOpacity>
            <Text style={{fontSize: 18}}>
              {format(new Date(date), 'MMMM yyyy')}
            </Text>

            <TouchableOpacity
              onPress={() => setMonth(addMonths(month, -1))}
              style={{paddingLeft: 10, paddingRight: 10}}>
              <AntDesign name={'arrowleft'} size={22} color={'#f34b56'} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setMonth(addMonths(month, 1))}
              style={{paddingLeft: 10, paddingRight: 10}}>
              <AntDesign name={'arrowright'} size={22} color={'#f34b56'} />
            </TouchableOpacity>
          </View>
        )}
        dayComponent={({date, state}) => (
          <TouchableOpacity
            style={[
              {
                borderWidth: 0.5,
                borderColor:
                  date.dateString === format(activeAdd, 'yyyy-MM-dd')
                    ? '#f34b56'
                    : '#eee',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: aa(state),
                width: Dimensions.get('window').width / 7, //52,
                height: 50,
              },
            ]}
            onPress={() => modal(date)}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  {
                    color: aa(state, 'letter'),
                    textAlign: 'center',
                    fontFamily: 'OpenSans-Regular',
                  },
                ]}>
                {date.day}
              </Text>

              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}>
                {birthday.map((r: any) => {
                  return date.dateString ===
                    format(new Date(r.date), 'yyyy-MM-dd') ? (
                    <View
                      key={r.id}
                      style={[
                        {
                          height: 6,
                          width: 6,
                          margin: 1,
                          borderRadius: 100,
                          backgroundColor: r.color,
                        },
                      ]}
                    />
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

      <View
        style={{
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 0,
          paddingBottom: 0,
        }}>
        <CreateBirthday dateSelected={String(activeAdd)} />
      </View>

      <View>
        {activeModal && birthdays.length > 0 ? (
          <View>
            {birthdays.map((r: any, index) => (
              <LinearGradient
                key={r.id}
                /*start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}*/
                colors={['#fff', '#eef0ef']}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  borderColor: '#eee',
                  borderWidth: 0.5,
                  height: 110,
                  padding: 10,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <LinearGradient
                    colors={['#cf8774', '#c1624e']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <Text style={styles.input}>
                      {format(new Date(r.start), 'HH:mm')}
                    </Text>
                  </LinearGradient>
                  <Text
                    style={{
                      marginLeft: 4,
                      color: '#728083',
                      fontFamily: 'OpenSans-SemiBold',
                    }}>
                    Horas
                  </Text>
                </View>

                <Text
                  style={{
                    fontFamily: 'OpenSans-SemiBold',
                    fontSize: 18,
                    color: '#728083',
                  }}>
                  {r.summary}
                </Text>

                <TouchableOpacity
                  onPress={() => deletes(r, index)}
                  style={[
                    {
                      width: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 10,
                    },
                  ]}>
                  <EvilIcons name={'trash'} size={28} color={'#ff6849'} />
                </TouchableOpacity>
              </LinearGradient>
            ))}
          </View>
        ) : (
          <ListInOrder />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  calendarList: {
    padding: 0,
    margin: 0,
    height: 340,
    marginBottom: 3,
  },
  calendar__item: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  dot: {
    borderRadius: 50,
    height: 8,
    width: 8,
    margin: 1,
    marginTop: 9,
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    color: '#fff',
    fontFamily: 'OpenSans-Regular',
    padding: 4,
  },
});
