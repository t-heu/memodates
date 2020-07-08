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
      const findAll = await RNCalendarEvents.findCalendars();
      const find = findAll.filter((r) => r.source === 'event_local_memodates');

      if (find.length <= 0) {
        await RNCalendarEvents.saveCalendar({
          title: 'events_c',
          color: '#30a8e3',
          name: 'memodates',
          entityType: 'event',
          accessLevel: 'read',
          ownerAccount: 'theu',
          source: {
            isLocalAccount: true,
            name: 'event_local_memodates',
            //type: 'com.google',
          },
        });
        //console.log(findAll);
      }
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
