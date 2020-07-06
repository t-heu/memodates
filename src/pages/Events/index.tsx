import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {format} from 'date-fns-tz';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import RNCalendarEvents from 'react-native-calendar-events';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {EventUpdate, EventSave} from '../../store/ducks/events/action';

import CreateBirthday from '../../components/CreateBirthday';
import {ApplicationState} from '../../store';

export default function Events({route}) {
  const {events, event} = useSelector(
    (state: ApplicationState) => state.events,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();

  async function deleteEvent(r: any) {
    try {
      await RNCalendarEvents.removeEvent(r.id);
      dispatch(EventUpdate());
    } catch (e) {
      console.log(e);
      Alert.alert('Alguma coisa deu errado, \n tente novamente mais tarde');
    }
  }

  async function editEvent(r: any) {
    try {
      dispatch(
        EventSave({
          event: {
            date: r.startDate,
            startDate: r.startDate,
            title: r.title,
            id: r.id,
          },
        }),
      );
    } catch (e) {
      console.log(e);
      Alert.alert('Alguma coisa deu errado, \n tente novamente mais tarde');
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{padding: 20, backgroundColor: '#f34b56', height: 160}}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => {
            try {
              navigation.goBack();
            } catch (e) {
              navigation.navigate('Home');
            }
          }}>
          <AntDesign name={'arrowleft'} size={24} color={'#fff'} />
          <Text style={{marginLeft: 8, color: '#fff'}}>Voltar</Text>
        </TouchableOpacity>
      </View>
      <CreateBirthday />

      <Text
        style={{
          marginLeft: 8,
          fontSize: 18,
          marginBottom: 10,
          marginTop: 20,
          color: '#222',
          fontFamily: 'OpenSans-Regular',
        }}>
        {format(new Date(event.date), 'dd/MM')}
      </Text>

      {events.map((r) => {
        /*if (
          `${format(new Date(r.startDate), 'yyyy-MM-dd')}` === route.params.day
        ) {
          console.log(r);
        }*/
        return (
          <View key={r.id}>
            {`${format(new Date(r.startDate), 'yyyy-MM-dd')}` ===
              route.params.day && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  borderBottomWidth: 0.5,
                  height: 45,
                  borderRadius: 5,
                  margin: 5,
                  marginLeft: 15,
                  marginRight: 15,
                  backgroundColor: r.color ? r.color : r.calendar.color,
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
                      color: '#000',
                      fontSize: 12,
                      fontFamily: 'OpenSans-SemiBold',
                    }}>
                    {Number(format(new Date(r.startDate), 'HH')) < 12
                      ? 'AM'
                      : 'PM'}
                  </Text>
                </View>

                <Text
                  style={{
                    fontFamily: 'OpenSans-SemiBold',
                    fontSize: 13,
                    color: '#222',
                    paddingLeft: 8,
                    paddingRight: 8,
                  }}>
                  {r.title}
                </Text>

                <TouchableOpacity
                  onPress={() => editEvent(r)}
                  style={styles.deleteBtn}>
                  <FontAwesome
                    name={'pencil-square-o'}
                    size={22}
                    color={'#000'}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => deleteEvent(r)}
                  style={styles.deleteBtn}>
                  <EvilIcons name={'trash'} size={28} color={'#f34b56'} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    color: '#000',
    fontFamily: 'OpenSans-Light',
    padding: 4,
  },
  deleteBtn: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
