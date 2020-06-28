import React from 'react';
import {ScrollView} from 'react-native';
import {AdMobBanner} from 'react-native-admob';
import {useDispatch} from 'react-redux';

import styles from './styles';
import CalendarComponent from '../../components/CalendarComponent';
import {show} from '../../services/realm';
import {EventSuccess} from '../../store/ducks/events/action';

interface Ibirthday {
  start: Date;
  end: Date;
  date: Date;
  id: string;
  summary: string;
  color: string;
}

export default function Home() {
  const dispatch = useDispatch();

  show().then((events: Ibirthday[]) => {
    dispatch(EventSuccess({events}));
  });

  return (
    <ScrollView style={styles.container}>
      <CalendarComponent />

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
