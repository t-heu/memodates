import React, { useState,useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, TextInput } from 'react-native';
import {LocaleConfig, CalendarList} from 'react-native-calendars';
import {format} from 'date-fns-tz'
import {useNavigation} from '@react-navigation/native'
//import Dash from 'react-native-dash'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Path, Svg} from 'react-native-svg'

LocaleConfig.locales['ptBR'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
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
          backgroundColor: '#0d6ec6',
          calendarBackground: '#0d6ec6',
          monthTextColor: '#fff',//'#8B9BB5',
          textMonthFontWeight: 'bold',
          arrowColor: '#fff',//'#8B9BB5',
          textSectionTitleColor: '#fff',//'#8B9BB5',
          textDayHeaderFontWeight: 'bold',
        }}
        monthFormat={'MMMM yyyy'}
        style={{
          padding: 0,
          margin: 0,
          height: 265,
        }}
        dayComponent={({date, state}) => {
          return (
            <TouchableOpacity onPress={() => modal(date)}>
              <View style={styles.calendar}>
                <View style={{position: 'relative'}}>
                  <View>
                    <Text style={[{color: state === 'today' ? '#ffbe76' : '#fff'/*'#444'*/, textAlign: 'center'}, {}]}>
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
                        <View style={date.dateString == dateBirthday ? [{backgroundColor: '#f9ca24'}, styles.dot]: null}></View>
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
      <View>
        <View style={{marginTop: 5, marginBottom: 10, position: 'absolute', bottom: 5, right: 0, left: 0, justifyContent: 'center', alignItems: 'center', zIndex: 100}}>
          {activeAdd && (
            <TouchableOpacity onPress={() => navigation.navigate('CreateBirthday', {
                dateSelected: String(activeAdd)
              })} style={{backgroundColor: '#0d6ec6', width: 150, height: 50, borderRadius: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', shadowColor: '#fff', shadowOpacity: 0.2, shadowOffset: {height: 4, width: 4}, elevation: 2}}>
              <Ionicons name={'md-add'} size={28} color={'#fff'} />
              <Text style={{paddingLeft: 8, fontSize: 18, fontFamily: 'OpenSans-SemiBold',  fontWeight: '400', color: '#fff'}}>adicionar</Text>
            </TouchableOpacity>
          )}
        </View>
        
        {comp}
          
        <Svg style={{height:200, zIndex: 10, bottom: 0, left: 0, right: 0}} viewBox="-1 50 375 187">
          <Path fill="#0d6ec6" fillOpacity={1} d={"M380.279 107.377C380.279 107.377 295.739 13.1031 187.625 107.25C79.5108 201.397 -1.97128 107.125 -1.97128 107.125L-1.89778 1.07516e-06L380.353 0.252415L380.279 107.377Z"}></Path>
        </Svg>
      </View>

      <View>
        {activeModal && birthdays.length > 0 && (
          <View style={{padding: 10, paddingTop: 0}}>
            <Text style={{fontSize: 20, marginBottom: 10, fontFamily: 'OpenSans-SemiBold',  fontWeight: '400', color: '#222'}}>Marcados</Text>
            {birthdays.map((r: any) => (
              <View style={{alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', borderWidth: 1, borderColor: '#999', borderRadius: 4, marginBottom: 10}} key={r.id}>
                <TextInput style={styles.input} value={r.name}/>   
                
                {/*<Dash dashThickness={2} dashLength={4} dashGap={4} dashColor={'#fff'} style={{flexDirection: 'column', width: 10, height: 20, alignItems:'center'}} />*/}
                <TextInput style={styles.input} value={format(new Date(r.date), 'dd/MM/yyyy')}/>

                <TouchableOpacity style={[styles.input, {width: 60}]}>
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
  calendar: {
    width: 20, 
    textAlign: 'center'
  },
  selectedDay: {
    backgroundColor: '#eee',//'#A6B0BF',//'#c0c0c2',
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
    backgroundColor: 'transparent',
  }
});
