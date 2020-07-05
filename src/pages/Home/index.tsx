import React, {useState} from 'react';
import {ScrollView, Button} from 'react-native';
import {AdMobBanner} from 'react-native-admob';
import {useDispatch} from 'react-redux';
import RNCalendarEvents from 'react-native-calendar-events';

import styles from './styles';
import CalendarComponent from '../../components/CalendarComponent';
import {EventUpdate} from '../../store/ducks/events/action';

export default function Home() {
  const [statusP, setStatusP] = useState(true);
  const dispatch = useDispatch();

  async function addCalendars() {
    try {
      const res = await RNCalendarEvents.findCalendars();
      //const find = findAll.filter((r) => r.type === 'com.memodates');

      /*const res = await RNCalendarEvents.saveCalendar({
        title: 'Memodates C',
        color: '#30a8e3',
        name: 'teuzin375@gmail.com',
        entityType: 'event',
        accessLevel: 'read',
        ownerAccount: 'theu',
        source: {
          name: 'teuzin375@gmail.com',
          type: 'com.google',
        },
      });*/
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  async function PermissionAgenda() {
    try {
      const status = await RNCalendarEvents.authorizationStatus();

      if (status === 'authorized') {
        dispatch(EventUpdate());
        setStatusP(false);
      }

      if (status !== 'authorized') {
        setStatusP(true);
        const statusStore = await RNCalendarEvents.authorizeEventStore();
        if (statusStore === 'authorized') {
          await addCalendars();
          setStatusP(false);
          dispatch(EventUpdate());
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  PermissionAgenda();

  return (
    <ScrollView style={styles.container}>
      {/*<Button title="ca" onPress={() => addCalendars()} />*/}
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
