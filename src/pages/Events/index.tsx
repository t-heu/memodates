import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {format} from 'date-fns-tz';
import {useDispatch} from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import RNCalendarEvents from 'react-native-calendar-events';

//import {deleteObj} from '../../services/realm';
import {EventUpdate} from '../../store/ducks/events/action';

import CreateBirthday from '../../components/CreateBirthday';
import {ApplicationState} from '../../store';

export default function Events({route}: any) {
  const {birthday} = useSelector((state: ApplicationState) => state.events);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  async function deletes(r: any) {
    try {
      await RNCalendarEvents.removeEvent(r.id);
      dispatch(EventUpdate());
      //await deleteObj(r);
    } catch (e) {
      console.log(e);
      Alert.alert('Alguma coisa deu errado, \n tente novamente mais tarde');
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#202124'}}>
      <View style={{padding: 20}}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => navigation.goBack()}>
          <AntDesign name={'arrowleft'} size={24} color={'#fff'} />
          <Text style={{marginLeft: 8, color: '#fff'}}>Voltar</Text>
        </TouchableOpacity>
      </View>
      <CreateBirthday dateSelected={route.params.dateSelected} />

      <Text
        style={{
          marginLeft: 8,
          fontSize: 18,
          marginBottom: 10,
          marginTop: 20,
          color: '#fff',
          fontFamily: 'OpenSans-Regular',
        }}>
        {format(new Date(route.params.dateSelected), 'dd/MM')}
      </Text>

      {birthday.map((r) => (
        <View key={r.id}>
          {route.params.dateOfCalendar ===
            `${format(new Date(r.startDate), 'yyyy-MM-dd')}` && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                borderColor: '#eee',
                borderTopWidth: 0.5,
                borderBottomWidth: 0.5,
                height: 50,
                padding: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={styles.input}>
                  {format(new Date(r.startDate), 'HH:mm')}
                </Text>

                <Text
                  style={{
                    marginLeft: 4,
                    marginRight: 14,
                    color: '#999',
                    fontSize: 12,
                    fontFamily: 'OpenSans-SemiBold',
                  }}>
                  HORAS
                </Text>
              </View>

              <Text
                style={{
                  fontFamily: 'OpenSans-SemiBold',
                  fontSize: 13,
                  color: '#fff',
                  padding: 4,
                  paddingLeft: 8,
                  paddingRight: 8,
                  borderRadius: 50,
                  backgroundColor: r.color ? r.color : r.calendar.color,
                }}>
                {r.title}
              </Text>

              <TouchableOpacity
                onPress={() => deletes(r)}
                style={styles.deleteBtn}>
                <EvilIcons name={'trash'} size={28} color={'#f34b56'} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    color: '#fff',
    fontFamily: 'OpenSans-Light',
    padding: 4,
  },
  deleteBtn: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
