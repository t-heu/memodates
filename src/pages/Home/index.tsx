import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native'

import styles from './styles';
import CalendarComponent from '../../components/CalendarComponent';
import {offList} from '../../services/realm';
import configDate from '../../utils/configDate'

export default function Home() {
  const [birthday, setBirthday] = useState([]);
  const [load, setLoad] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    offList().then((res: any) => {
      setBirthday(res);
      setLoad(true);
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={{padding: 10, backgroundColor: '#f5f5f5', height: 58, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Entypo name={'list'} size={30} color={'#ff6849'} />
        </TouchableOpacity>
        <Text style={{color: '#222', fontSize: 20, fontFamily: 'OpenSans-Light',  fontWeight: '300', paddingLeft: 8}}>
          {`Hoje é ${configDate.dayNames[new Date().getDay()]} `}
        </Text>
      </View>
      

      <View>
        {load ? (
          <CalendarComponent birthday={birthday} />
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 300,
            }}>
            <SimpleLineIcons name={'reload'} size={26} color={'#222'} />
          </View>
        )}
      </View>
    </ScrollView>
  );
}
//'#0d6ec6'