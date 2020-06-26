import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {LocaleConfig, CalendarList} from 'react-native-calendars';
import {format} from 'date-fns-tz';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

import CreateBirthday from '../../pages/CreateBirthday';
import configDate from '../../utils/configDate';
import {deleteObj} from '../../services/realm';

LocaleConfig.locales.ptBR = {
  monthNames: configDate.monthNames,
  monthNamesShort: configDate.monthNamesShort,
  dayNames: configDate.dayNames,
  dayNamesShort: configDate.dayNamesShort,
};
LocaleConfig.defaultLocale = 'ptBR';

interface Ibirthday {
  birthday: {
    string: {
      date: string;
      id: string;
      summary: string;
      color: string;
    };
  };
}

export default function CalendarComponent({birthday}: Ibirthday) {
  const [activeModal, setActiveModal] = useState(false);
  const [birthdays, setBirthday] = useState([] as Ibirthday[]);
  const [activeAdd, setActiveAdd] = useState(new Date());
  const navigation = useNavigation();
  const [updateList, setUpdateList] = useState(0);
  const [comp, setComp] = useState(<RenderCalendar />);

  function modal(date: any) {
    setActiveModal(true);
    setActiveAdd(
      new Date(`${format(new Date(date.dateString), 'yyyy/MM')}/${date.day}`),
    );

    const arr: Ibirthday[] = [];
    birthday.map((info: any) => {
      if (date.dateString === `${format(new Date(info.date), 'yyyy-MM-dd')}`) {
        arr.push(info);
        setBirthday(arr);
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
  }, [updateList]);

  function getColor(dat: string, types: string) {
    function setColor() {
      if (birthday.length > 0) {
        for (let i = 0; i < birthday.length; i++) {
          if (
            dat ===
            `${format(new Date(), 'yyyy')}-${format(
              new Date(birthday[i].date),
              'MM-dd',
            )}`
          ) {
            return birthday[i].color;
          } else {
            'transparent';
          }
        }
      }
      return 'transparent';
    }

    if (types === 'backg') {
      return setColor();
    } else {
      if (types === 'today' || setColor() !== 'transparent') {
        return '#fff';
      } else if (types === 'disabled') {
        return '#c0c0c2';
      } else {
        return '#222';
      }
    }
  }

  function RenderCalendar() {
    return (
      <CalendarList
        horizontal={true}
        theme={{
          calendarBackground: '#fff',
          monthTextColor: '#2f3542',
          textMonthFontWeight: '700',
          textSectionTitleColor: '#f34b56',
          textDayHeaderFontFamily: 'OpenSans-Regular',
          textDayHeaderFontWeight: 'bold',
          'stylesheet.calendar.header': {
            header: {
              marginTop: 10,
              justifyContent: 'flex-start',
            },
            week: {
              marginBottom: 10,
              marginTop: 8,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            },
          },
          'stylesheet.calendar.main': {
            week: {
              marginTop: 0,
              flexDirection: 'row',
              justifyContent: 'space-around',
            },
          },
        }}
        monthFormat={'MMMM yyyy'}
        style={styles.calendarList}
        dayComponent={({date, state}) => (
          <TouchableOpacity onPress={() => modal(date)}>
            <View
              style={[
                styles.calendar,
                date.dateString === format(new Date(), 'yyyy-MM-dd')
                  ? {backgroundColor: '#f34b56'}
                  : {backgroundColor: getColor(date.dateString, 'backg')},
                ,
              ]}>
              <View>
                <Text
                  style={[
                    {
                      color: getColor(date.dateString, state),
                      textAlign: 'center',
                    },
                  ]}>
                  {date.day}
                </Text>
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
      <TouchableOpacity
        style={{position: 'absolute', right: 23, top: 15}}
        onPress={() => navigation.openDrawer()}>
        <Entypo name={'list'} size={30} color={'#f34b56'} />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: 10,
        }}>
        <View
          style={[
            styles.dot,
            {backgroundColor: '#f34b56', height: 12, width: 12},
          ]}
        />
        <Text
          style={{
            marginLeft: 10,
            fontFamily: 'OpenSans-Regular',
            paddingTop: 6,
          }}>{`Hoje é ${configDate.dayNames[new Date().getDay()]}`}</Text>
      </View>

      <View>
        <CreateBirthday
          update_list={setUpdateList}
          dateSelected={String(activeAdd)}
        />
        {activeModal && birthdays.length > 0 && (
          <View>
            {birthdays.map((r: any) => (
              <View
                style={{
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  borderTopWidth: 1,
                  borderColor: '#eee',
                  height: 100,
                  padding: 5,
                }}
                key={r.id}>
                <View style={[{backgroundColor: '#f34b56'}, styles.dot]} />

                <TouchableOpacity
                  onPress={() => deleteObj(r)}
                  style={[
                    styles.input,
                    {width: 30, position: 'absolute', bottom: 2, right: 2},
                  ]}>
                  <EvilIcons name={'trash'} size={28} color={'#ff6849'} />
                </TouchableOpacity>

                <Text style={styles.input}>{r.summary}</Text>

                <View
                  style={{
                    height: 60,
                    width: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 48,
                      //fontWeight: 'bold',
                      fontFamily: 'OpenSans-Regular',
                      color: '#f34b56',
                    }}>
                    {format(new Date(r.date), 'dd')}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'OpenSans-Regular',
                      color: '#f34b56',
                    }}>
                    {format(new Date(r.date), 'MMMM')}
                  </Text>
                </View>
              </View>
            ))}
          </View>
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
    marginBottom: 30,
  },
  calendar: {
    width: 48,
    height: 48,
    margin: 0,
    padding: 0,
    textAlign: 'center',
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
    paddingTop: 8,
    fontSize: 20,
    width: 150,
    color: '#666',
    backgroundColor: 'transparent',
  },
});
