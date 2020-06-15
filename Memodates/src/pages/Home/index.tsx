import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

import styles from './styles'
import CalendarComponent from '../../components/CalendarComponent';
import {offList} from '../../services/realm'
import Banner from '../../components/Banner'

export default function Home() {
  const configDate = {
    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    dayNames: ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado']
  }
  const [birthday, setBirthday] = useState([])
  const [load, setLoad] = useState(false)

  useEffect(() => {
    offList().then((res: any) => {
      setBirthday(res)
      setLoad(true)
    })
  }, [])
  
  return (
    <ScrollView style={styles.container}>
      <Banner />
      <Text style={{backgroundColor: '#0d6ec6', color: '#fff', fontSize: 20, fontFamily: 'OpenSans-Light',  fontWeight: '300', paddingLeft: 8}}>
        {`Hoje é ${configDate.dayNames[new Date().getDay()]} `}
      </Text>

      <View>
        {load ? (
          <CalendarComponent birthday={birthday} />
          ):(
          <View style={{justifyContent: 'center', alignItems: 'center', height: 300}}>
            <SimpleLineIcons name={'reload'} size={26} color={'#222'} />
          </View>
        )}
      </View>
    </ScrollView>
  );
}
