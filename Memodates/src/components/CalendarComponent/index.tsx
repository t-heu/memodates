import React, { useState,useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, TextInput } from 'react-native';
import {LocaleConfig, CalendarList} from 'react-native-calendars';
import {format} from 'date-fns-tz'
import {useNavigation} from '@react-navigation/native'
//import Dash from 'react-native-dash'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
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

    if(arr.length < 1) setActiveModal(false)
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
                    <Text style={[{color: state === 'today' ? '#3771D4' : '#444', textAlign: 'center'}, {}]}>
                      {date.day}
                    </Text>
                  </View>
                
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

      <View>
        {activeModal && birthdays.length > 0 && (
          <View style={{paddingTop: 5, paddingBottom: 5}}>
            <Text style={{fontSize: 20, marginBottom: 10, fontFamily: 'OpenSans-SemiBold',  fontWeight: '400', color: '#222', marginLeft: 8}}>Marcados</Text>
            {birthdays.map((r: any) => (
              <View style={{alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row'}} key={r.id}>
                <TextInput style={styles.input} value={r.name}/>   
                
                {/*<Dash dashThickness={2} dashLength={4} dashGap={4} dashColor={'#fff'} style={{flexDirection: 'column', width: 10, height: 20, alignItems:'center'}} />*/}
                <TextInput style={styles.input} value={format(new Date(r.date), 'dd/MM/yyyy')}/>

                <TouchableOpacity style={[styles.input, {width: 60}]}>
                  <EvilIcons name={'trash'} size={30} color={'red'} />
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
  calendar: {
    width: 20, 
    textAlign: 'center'
  },
  selectedDay: {
    backgroundColor: '#A6B0BF',//'#c0c0c2',
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
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    height: 40,
    width: 110,
    marginBottom: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#999',
    paddingHorizontal: 13,
    borderRadius: 4
  }
});
