import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {format} from 'date-fns-tz';
import LinearGradient from 'react-native-linear-gradient';

import {sorteds} from '../../services/realm';

export default function ListInOrder() {
  const [orderDate, setOrder] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await sorteds();
      setOrder(res);
    }
    load();
  }, []);

  return (
    <View>
      {orderDate.map(
        (r: {id: string; date: string; summary: string; start: string}) => (
          <LinearGradient
            /*start={{x: 0, y: 0}}
            end={{x: 0.5, y: 0}}*/
            colors={
              format(new Date(), 'yyyy-MM-dd') ===
              format(new Date(r.date), 'yyyy-MM-dd')
                ? ['#fdb707', '#f99e0f']
                : ['#f34b56', '#e14344']
            }
            key={r.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 100,
              padding: 10,
            }}>
            <View style={{width: '30%'}}>
              <Text
                style={{
                  fontSize: 30,
                  color: '#eee',
                  fontFamily: 'OpenSans-Light',
                }}>
                {format(new Date(r.date), 'dd')}
              </Text>
              <Text style={{color: '#eee'}}>
                {format(new Date(r.start), 'HH:mm')}
              </Text>
            </View>

            <View>
              {format(new Date(), 'yyyy-MM-dd') ===
              format(new Date(r.date), 'yyyy-MM-dd') ? (
                <Text style={styles.eventPrevision}>Hoje</Text>
              ) : (
                <Text style={styles.eventPrevision}>Amanhã/Evento futuro</Text>
              )}
              <Text style={styles.summary}>{r.summary}</Text>
            </View>
          </LinearGradient>
        ),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  summary: {
    fontSize: 25,
    color: '#eee',
  },
  eventPrevision: {
    fontSize: 12,
    color: '#eee',
  },
});
