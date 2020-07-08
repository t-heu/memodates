import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {format} from 'date-fns-tz';
import {useSelector} from 'react-redux';

import {ApplicationState} from '../../store';

export default function ListInOrder() {
  const {events} = useSelector((state: ApplicationState) => state.events);

  return (
    <View style={{marginBottom: 50}}>
      <Text
        style={{
          color: '#222',
          fontSize: 16,
          marginLeft: 8,
          marginTop: 10,
          fontFamily: 'OpenSans-SemiBold',
        }}>
        Todos seus eventos
      </Text>
      {events.map((r: any) => (
        <View
          key={r.id}
          style={{
            margin: 15,
            marginBottom: 0,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: r.calendar.color,
            borderRadius: 6,
            padding: 10,
            overflow: 'hidden',
          }}>
          <View style={{marginRight: 15}}>
            <Text
              style={{
                fontSize: 20,
                color: '#222',
                fontFamily: 'OpenSans-Light',
              }}>
              {format(new Date(r.startDate), 'dd/MM')}
            </Text>
            <Text style={{color: '#222'}}>
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
    fontSize: 16,
    color: '#222',
  },
  eventPrevision: {
    fontSize: 12,
    color: '#222',
  },
});
