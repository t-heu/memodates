import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {format} from 'date-fns-tz';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

import {deleteObj, show} from '../../services/realm';
import {EventSuccess} from '../../store/ducks/events/action';

import CreateBirthday from '../../components/CreateBirthday';
import {ApplicationState} from '../../store';

export default function Events({route}: any) {
  const {birthday} = useSelector((state: ApplicationState) => state.events);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function deletes(r: any, index: number) {
    deleteObj(r).then(() => {
      show().then((events: any) => {
        dispatch(EventSuccess({events}));
      });
      //birthdays.splice(index, 1);  || route.params?.dateDayCalendar, || route.params?.dateSelected,
    });
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{padding: 20}}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => navigation.goBack()}>
          <AntDesign name={'arrowleft'} size={24} color={'#222'} />
          <Text style={{marginLeft: 8}}>Voltar</Text>
        </TouchableOpacity>
      </View>
      <CreateBirthday dateSelected={route.params.dateSelected || new Date()} />

      <Text
        style={{
          marginLeft: 8,
          fontSize: 18,
          marginBottom: 10,
          fontFamily: 'OpenSans-Regular',
        }}>
        {format(new Date(route.params.dateSelected), 'dd/MM') || ''}
      </Text>
      {birthday.map((r) => (
        <View key={r.id}>
          {(route.params.dateOfCalendar || '') ===
            `${format(new Date(r.date), 'yyyy-MM-dd')}` && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                borderColor: '#eee',
                borderWidth: 0.5,
                height: 50,
                padding: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <Text style={styles.input}>
                  {format(new Date(r.start), 'HH:mm')}
                </Text>

                <Text
                  style={{
                    marginLeft: 4,
                    marginRight: 14,
                    color: '#728083',
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
                  backgroundColor: r.color,
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
    color: '#222',
    fontFamily: 'OpenSans-Light',
    padding: 4,
  },
});
