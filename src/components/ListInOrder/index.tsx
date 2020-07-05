import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {format} from 'date-fns-tz';
import {useSelector} from 'react-redux';

import {ApplicationState} from '../../store';

export default function ListInOrder() {
  const {events} = useSelector((state: ApplicationState) => state.events);

  return (
    <View style={{marginBottom: 100}}>
      <Text
        style={{color: '#2c8c84', fontSize: 16, marginLeft: 8, marginTop: 10}}>
        Todos seus eventos
      </Text>
      {events.map((r: any) => (
        <View
          key={r.id}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 100,
            padding: 10,
          }}>
          <View style={{width: '50%'}}>
            <Text
              style={{
                fontSize: 30,
                color: '#eee',
                fontFamily: 'OpenSans-Light',
              }}>
              {format(new Date(r.startDate), 'dd/MM')}
            </Text>
            <Text style={{color: '#eee'}}>
              {format(new Date(r.startDate), 'HH:mm')}
            </Text>
          </View>

          <View>
            {format(new Date(), 'yyyy-MM-dd') ===
            format(new Date(r.startDate), 'yyyy-MM-dd') ? (
              <Text style={styles.eventPrevision}>Hoje</Text>
            ) : (
              <Text style={styles.eventPrevision}>Evento</Text>
            )}
            <Text style={styles.summary}>{r.title}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  summary: {
    fontSize: 17,
    color: '#eee',
  },
  eventPrevision: {
    fontSize: 12,
    color: '#eee',
  },
});
