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
      {orderDate.map((r) => (
        <LinearGradient
          colors={
            format(new Date(), 'yyyy-MM-dd') ===
            format(new Date(r.date), 'yyyy-MM-dd')
              ? ['#f99e0f', '#fdb707']
              : ['#e14344', '#f34b56']
          }
          key={r.id}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 100,
            padding: 10,
          }}>
          <View style={{width: '50%'}}>
            {format(new Date(), 'yyyy-MM-dd') ===
            format(new Date(r.date), 'yyyy-MM-dd') ? (
              <Text style={{fontSize: 12, color: '#eee'}}>Hoje</Text>
            ) : null}
            <Text style={{fontSize: 30, color: '#eee'}}>
              {format(new Date(r.date), 'dd')}
            </Text>
            <Text style={{color: '#eee'}}>
              {format(new Date(r.start), 'HH:mm')}
            </Text>
          </View>
          <Text style={{fontSize: 25, color: '#eee'}}>{r.summary}</Text>
        </LinearGradient>
      ))}
    </View>
  );
}
