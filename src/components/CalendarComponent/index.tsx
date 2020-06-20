import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import {LocaleConfig, CalendarList} from 'react-native-calendars';
import {format} from 'date-fns-tz';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Path, Svg} from 'react-native-svg';

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
      name: string;
    };
  };
}

export default function CalendarComponent({birthday}: Ibirthday) {
  const [activeModal, setActiveModal] = useState(false);
  const [birthdays, setBirthday] = useState([] as Ibirthday[]);
  const [activeAdd, setActiveAdd] = useState(new Date());
  const [dateChange, setDateChange] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );
  const [comp, setComp] = useState(<RenderCalendar />);

  function modal(date: any) {
    setDateChange(date.dateString);
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
  }, [dateChange]);

  function RenderCalendar() {
    return (
      <CalendarList
        horizontal={true}
        theme={{
          backgroundColor: '#ff6849',
          calendarBackground: '#ff6849',
          monthTextColor: '#fff',
          textMonthFontWeight: 'bold',
          arrowColor: '#fff',
          textSectionTitleColor: '#fff',
          textDayHeaderFontWeight: 'bold',
        }}
        monthFormat={"MMMM 'de' yyyy"}
        style={styles.calendarList}
        dayComponent={({date, state}) => {
          return (
            <TouchableOpacity onPress={() => modal(date)}>
              <View style={[styles.calendar]}>
                <View>
                  <Text
                    style={[
                      {
                        color: state === 'today' ? '#222' : '#fff',
                        textAlign: 'center',
                      },
                    ]}>
                    {date.day}
                  </Text>
                </View>

                <View
                  style={[
                    {
                      height: 35,
                      width: 35,
                      top: -7,
                      right: -7,
                      zIndex: -2,
                      position: 'absolute',
                    },
                    date.dateString === dateChange ? styles.selectedDay : null,
                  ]}
                />

                <View style={styles.calendar__item}>
                  {birthday.map((data: any) => {
                    const dateBirthday = `${format(
                      new Date(),
                      'yyyy',
                    )}-${format(new Date(data.date), 'MM-dd')}`;

                    return (
                      <View key={data.id}>
                        <View
                          style={
                            date.dateString === dateBirthday
                              ? [{backgroundColor: '#f9ca24'}, styles.dot]
                              : null
                          }
                        />
                      </View>
                    );
                  })}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
  }

  return (
    <>
      <View>
        <View
          style={{
            borderTopLeftRadius: 100,
            borderTopRightRadius: 100,
            backgroundColor: '#ff6849',
            height: 20,
          }}
        />
        {comp}

        <Svg
          style={{height: 160, zIndex: 10, bottom: 0, left: 0, right: 0}}
          viewBox="-1 50 375 087">
          <Path
            fill="#ff6849"
            fillOpacity={1}
            d={
              'M380.279 107.377C380.279 107.377 295.739 13.1031 187.625 107.25C79.5108 201.397 -1.97128 107.125 -1.97128 107.125L-1.89778 1.07516e-06L380.353 0.252415L380.279 107.377Z'
            }
          />
        </Svg>
      </View>

      <View>
        <CreateBirthday dateSelected={String(activeAdd)} />
        {activeModal && birthdays.length > 0 && (
          <View>
            {birthdays.map((r: any) => (
              <View
                style={{
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: '#eee',
                  height: 60,
                }}
                key={r.id}>
                <View
                  style={{
                    height: 60,
                    borderRightWidth: 2,
                    borderColor: '#ff6849',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 12, padding: 15}}>all-day</Text>
                </View>
                <TextInput style={styles.input} value={r.name} />

                <TouchableOpacity
                  onPress={() => deleteObj(r)}
                  style={[styles.input, {width: 60}]}>
                  <EvilIcons name={'trash'} size={28} color={'red'} />
                </TouchableOpacity>
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
    height: 270,
  },
  calendar: {
    width: 20,
    textAlign: 'center',
  },
  selectedDay: {
    backgroundColor: '#eee', //'#A6B0BF',//'#c0c0c2',
    opacity: 0.2,
    borderRadius: 50,
  },
  calendar__item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    borderRadius: 50,
    height: 5,
    width: 5,
    margin: 1,
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 200,
    backgroundColor: 'transparent',
  },
});
