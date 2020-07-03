import React, {useState} from 'react';
import {ScrollView, Button} from 'react-native';
import {AdMobBanner} from 'react-native-admob';
import {useDispatch} from 'react-redux';
import RNCalendarEvents from 'react-native-calendar-events';

import styles from './styles';
import CalendarComponent from '../../components/CalendarComponent';
import {EventUpdate} from '../../store/ducks/events/action';

export default function Home() {
  const [statusP, setStatusP] = useState(false);
  const dispatch = useDispatch();

  async function PermissionAgenda() {
    try {
      const status = await RNCalendarEvents.authorizationStatus();

      if (status === 'authorized') {
        setStatusP(false);
      }

      if (status !== 'authorized') {
        setStatusP(true);
        const statusStore = await RNCalendarEvents.authorizeEventStore();
        if (statusStore === 'authorized') {
          const res = await RNCalendarEvents.saveCalendar({
            title: 'Memodates C',
            color: '#4e8af7',
            name: 'Memodates',
            entityType: 'event',
            accessLevel: 'root',
            ownerAccount: 'theu',
            source: {
              name: 'teuzin375@gmail.com',
              type: 'com.memodates',
            },
          });

          console.log(res);
          setStatusP(false);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  PermissionAgenda();
  dispatch(EventUpdate());

  async function aaa() {
    try {
      // Buscar todos os Calendarios
      const res = await RNCalendarEvents.findCalendars();
      console.log(res);
      const find = res.filter((r) => r.type === 'com.memodates');
      console.log(find);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ScrollView style={styles.container}>
      {/* <Button title="aaa" onPress={() => aaa()} />*/}
      {statusP ? (
        <Button
          title="Conceder Permissão a Agenda"
          onPress={() => PermissionAgenda()}
        />
      ) : (
        <CalendarComponent />
      )}

      <AdMobBanner
        adSize="fullBanner"
        adUnitID="ca-app-pub-7158647172444246/3856987052"
        testDevices={[AdMobBanner.simulatorId]}
        onAdFailedToLoad={(error: any) => console.error(error)}
      />
    </ScrollView>
  );
}
//'#0d6ec6'
