import React, { useState,useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import {LocaleConfig, CalendarList} from 'react-native-calendars';
import {format} from 'date-fns-tz'
import {useNavigation} from '@react-navigation/native'
//import Dash from 'react-native-dash'
import Ionicons from 'react-native-vector-icons/Ionicons'

LocaleConfig.locales['ptBR'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ['D','S','T','Q','Q','S','S'],
};
LocaleConfig.defaultLocale = 'ptBR';

interface Ibirthday {
  birthday: [{
    id: string
    name: string
    date: string
  }]
}

export default function CalendarComponent({birthday}: Ibirthday) {
  const [activeModal, setActiveModal] = useState(false);
  const [birthdays, setBirthday] = useState([] as Ibirthday[]);
  const [activeAdd, setActiveAdd] = useState(new Date());
  const navigation = useNavigation();
  const [dateChange, setDateChange] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [comp, setComp] = useState(<RenderCalendar />);

  function modal(date: any) {
    setDateChange(date.dateString)
    setActiveModal(true)
    setActiveAdd(new Date(`${format(new Date(date.dateString), 'yyyy/MM')}/${date.day}`))

    const arr: Ibirthday[] = []
    birthday.map((info: any) => {
      if (date.dateString === `${format(new Date(info.date), 'yyyy-MM-dd')}`) {
        arr.push(info) 
        setBirthday(arr)
      }
    })
  }

  function handleDay(state: string) {
    switch(state) {
      case 'disabled': {
        return '#fff'
      }
      case 'today': {
        return '#444'
      }
      case '': {
        return '#444'
      }
      default: {
        return '#fff'
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setComp(<RenderCalendar />)
    }, 100)
  }, [dateChange])

  function RenderCalendar() {
    return (
      <CalendarList
        horizontal={true}
        theme={{
          backgroundColor: '#fefeff',
          calendarBackground: '#fefeff',
          monthTextColor: '#8B9BB5',
          textMonthFontWeight: 'bold',
          arrowColor: '#8B9BB5',
          textSectionTitleColor: '#8B9BB5',//'#c0c0c2',
          textDayHeaderFontWeight: 'bold',
        }}
        monthFormat={'MMMM yyyy'}
        style={{
          padding: 0,
          margin: 0,
          height: 270,
        }}
        dayComponent={({date, state}) => {
          return (
            <TouchableOpacity onPress={() => modal(date)}>
              <View style={styles.calendar}>
                <View style={{position: 'relative'}}>
                  <View>
                    <Text style={[{color: handleDay(state), textAlign: 'center'}, {}]}>
                      {date.day}
                    </Text>
                  </View>
                
                  <View style={[{height: 35, width: 35, top: -7, right: -7, zIndex: -5, position: 'absolute'}, state === 'today' ? styles.calendar__dayAge : null]}></View>
                  <View style={[{height: 35, width: 35, top: -7, right: -7, zIndex: -2, position: 'absolute'}, date.dateString === dateChange ? styles.selectedDay : null]}></View>
                </View>
                                
                <View style={styles.calendar__item}>
                  {birthday.map((data: any) => {
                    const dateBirthday = `${format(new Date(), 'yyyy')}-${format(new Date(data.date), 'MM-dd')}`

                    return (
                      <View key={data.id} style={{margin: 1}}>
                        <View style={date.dateString == dateBirthday ? [{backgroundColor: '#3771D4'}, styles.dot]: null}></View>
                      </View>
                    )
                  })}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    )
  }

  return (
    <>
      <View style={{marginTop: 5, marginBottom: 10, position: 'absolute', top: -35, right: 15, zIndex: 100}}>
        {activeAdd && (
          <TouchableOpacity onPress={() => navigation.navigate('CreateBirthday', {
              dateSelected: String(activeAdd)
            })} style={{backgroundColor: '#4989f7', width: 60, height: 60, borderRadius: 50, alignItems: 'center', justifyContent: 'center', shadowColor: '#fff', shadowOpacity: 0.2, shadowOffset: {height: 4, width: 4}, elevation: 2}}>
            <Ionicons name={'md-add'} size={36} color={'#fff'} />
          </TouchableOpacity>
        )}
      </View>
      
      {comp}

      <View style={{padding: 20, marginTop: 0, alignItems: 'center'}}>
        {activeModal && (
          <>
            <View style={{marginBottom: 10, flexDirection: 'row', flexWrap: 'wrap'}}>
              {birthdays.map((r: any) => {
                return (
                  <View style={{borderWidth: 1, borderRadius: 20, borderColor: '#3771D4', backgroundColor: '#3771D4', width: 70, height: 70, margin: 5, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowOffset: {height: 4, width: 4}, elevation: 2}} key={r.id}>
                    <Text style={{color: '#fff', fontSize: 12}}>{r.name}</Text>
                    <Text style={{color: '#fff', fontSize: 12}}>{format(new Date(r.date), 'dd/MM/yyyy')}</Text>
                  </View>
                )
              })}
            </View>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  calendar: {
    width: 20, 
    textAlign: 'center'
  },
  calendar__dayAge: {
    backgroundColor: '#A6B0BF',//'#c0c0c2',
    opacity: 0.2,
    borderRadius: 50
  },
  selectedDay: {
    backgroundColor: '#3771D4',//'#c0c0c2',
    opacity: 0.2,
    borderRadius: 50
  },
  calendar__item: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  dot: {
    borderRadius: 50,
    height: 5,
    width: 5
  }
});
