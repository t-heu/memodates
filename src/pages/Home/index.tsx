import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {AdMobBanner, AdMobInterstitial} from 'react-native-admob';

import styles from './styles';
import CalendarComponent from '../../components/CalendarComponent';
import {offList} from '../../services/realm';

interface Ibirthday {
  string: {
    date: string;
    id: string;
    name: string;
  };
}

export default function Home() {
  const [birthday, setBirthday] = useState({} as Ibirthday);
  const [load, setLoad] = useState(false);
  const [loadAds, setLoadAds] = useState(false);

  useEffect(() => {
    function loadAd() {
      AdMobInterstitial.setAdUnitID('ca-app-pub-7158647172444246/3856987052');
      AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
      AdMobInterstitial.requestAd()
        .then(() => {
          AdMobInterstitial.showAd();
          setLoadAds(true);
        })
        .catch((e: any) => console.log(e));
    }
    loadAd();

    offList().then((res: any) => {
      setBirthday(res);
      setLoad(true);
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View>
        {load ? (
          <CalendarComponent birthday={birthday} />
        ) : (
          <View style={styles.loading}>
            <SimpleLineIcons name={'reload'} size={26} color={'#222'} />
          </View>
        )}
      </View>

      <AdMobBanner
        adSize="fullBanner"
        adUnitID="ca-app-pub-7158647172444246/3856987052"
        testDevices={[AdMobBanner.simulatorId]}
        onAdFailedToLoad={(error: any) => console.error(error)}
      />

      {loadAds && (
        <>
          <Text>Hiii</Text>
          {/*<AdMobBanner
          adSize="fullBanner"
          adUnitID="ca-app-pub-7158647172444246/3856987052"
          testDevices={[AdMobBanner.simulatorId]}
          onAdFailedToLoad={(error: any) => console.error(error)}
          />*/}
        </>
      )}
    </ScrollView>
  );
}
//'#0d6ec6'
// teste ca-app-pub-3940256099942544/6300978111
