import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {format} from 'date-fns-tz';

import {sorteds} from '../../services/realm';

interface Props {
  date: string;
}

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
        <View
          key={r.id}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderColor: '#eee',
            borderWidth: 1,
            padding: 10,
            backgroundColor: '#fff',
          }}>
          <View style={{width: '50%'}}>
            <Text style={{fontSize: 18, color: '#f34b56'}}>
              {format(new Date(r.date), 'dd/MM/yyyy')}
            </Text>
            <Text style={{color: '#333'}}>
              {format(new Date(r.start), 'HH:mm')}
            </Text>
          </View>
          <Text style={{fontSize: 18, color: '#555'}}>{r.summary}</Text>
        </View>
      ))}
    </View>
  );
}
