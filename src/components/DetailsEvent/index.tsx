import React, {useEffect} from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {format} from 'date-fns-tz';

import {deleteObj, show} from '../../services/realm';
import {EventSuccess} from '../../store/ducks/events/action';

interface Props {
  events: any;
}

export default function DetailsEvent({events}: Props) {
  const dispatch = useDispatch();

  function deletes(r: any, index: number) {
    deleteObj(r).then(() => {
      show().then((events: any) => {
        dispatch(EventSuccess({events}));
      });
      //birthdays.splice(index, 1);
    });
  }

  return (
    <>
      {events.map((r: any, index: number) => (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0.5, y: 0}}
          key={r.id}
          colors={['#f5f5f5', 'rgba(255, 255, 255, 0.8)']}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            borderColor: '#eee',
            borderWidth: 0.5,
            height: 110,
            padding: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
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
              fontSize: 19,
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
            <EvilIcons name={'trash'} size={28} color={'#f34b56'} />
          </TouchableOpacity>
        </LinearGradient>
      ))}
    </>
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
});
