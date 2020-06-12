import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

import styles from './styles'
import CalendarComponent from '../../components/CalendarComponent';
import {offList} from '../../services/realm'
import Banner from '../../components/Banner'

export default function Home() {
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
