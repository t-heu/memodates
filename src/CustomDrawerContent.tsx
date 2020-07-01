import React from 'react';
import {
  ScrollView,
  Text,
  Image,
  View,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNetInfo} from '@react-native-community/netinfo';
import GDrive from 'react-native-google-drive-api-wrapper';
import {GoogleSignin} from '@react-native-community/google-signin';
import {Path, Svg} from 'react-native-svg';

import {ApplicationState} from './store';
import GoogleSign from './components/GoogleSign';
import {SignOut} from './store/ducks/auth/action';
import {create, show} from './services/realm';

export default function CustomDrawerContent() {
  const {auth} = useSelector((state: ApplicationState) => state);
  const netinfo = useNetInfo();
  const dispatch = useDispatch();

  async function initialized() {
    try {
      GDrive.setAccessToken((await GoogleSignin.getTokens()).accessToken);
      GDrive.init();

      if (GDrive.isInitialized()) {
        return 'success';
      } else {
        return 'error';
      }
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  function backup() {
    if (netinfo.isConnected) {
      // console.log(decoded.exp < Date.now() / 1000)

      show().then(async (res: any) => {
        try {
          if ((await initialized()) === 'success') {
            const response = await (
              await GDrive.files.list({
                q:
                  "name = 'memodates/memodates-backup.json' and 'appDataFolder' in parents",
                pageSize: 100,
                spaces: 'appDataFolder',
              })
            ).json();

            if (response.files[0].id) {
              GDrive.files
                .delete(response.files[0].id)
                .then((r: any) => console.log(r))
                .catch((e: any) => console.log(e));
            }

            const content = JSON.stringify(res);

            GDrive.files
              .createFileMultipart(
                content,
                'application/json',
                {
                  parents: ['appDataFolder'], //['root'],
                  name: 'memodates/memodates-backup.json',
                },
                false,
              )
              .then((r: any) => r.json())
              .then((ress: any) => console.log(ress))
              .catch((e: any) => console.log(e));
          }
        } catch (e) {
          console.log(e);
        }
      });
      Alert.alert('salvos!');
    } else {
      Alert.alert('sem conexão com a internet');
    }
  }

  async function restored() {
    if (netinfo.isConnected) {
      try {
        if ((await initialized()) === 'success') {
          const response = await (
            await GDrive.files.list({
              q:
                "name = 'memodates/memodates-backup.json' and 'appDataFolder' in parents",
              pageSize: 100,
              spaces: 'appDataFolder',
            })
          ).json();

          if (response.files.length > 0) {
            const data = await (
              await GDrive.files.get(response.files[0].id, {alt: 'media'})
            ).json();

            create(data, true);
          }
          Alert.alert('Recuperado com sucesso');
        }
      } catch (e) {
        console.log(e);
        Alert.alert('Alguma coisa deu errado, \n tente novamente mais tarde');
      }
    } else {
      Alert.alert('sem conexão com a internet');
    }
  }

  return (
    <View style={{justifyContent: 'center', backgroundColor: '#fff'}}>
      <View
        style={{
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#e14344',
          height: 150,
        }}>
        {auth.signed ? (
          <>
            <Image
              source={{uri: auth.user.photo}}
              style={{
                borderRadius: 100,
                width: 70,
                height: 70,
                marginBottom: 20,
              }}
            />
            <Text style={{color: '#fff', fontSize: 18}}>{auth.user.name}</Text>
          </>
        ) : (
          <GoogleSign />
        )}
      </View>

      <Svg style={{height: 80}} viewBox="-1 50 375 087">
        <Path
          fill="#e14344"
          fillOpacity={1}
          d={
            'M380.279 107.377C380.279 107.377 295.739 13.1031 187.625 107.25C79.5108 201.397 -1.97128 107.125 -1.97128 107.125L-1.89778 1.07516e-06L380.353 0.252415L380.279 107.377Z'
          }
        />
      </Svg>

      <ScrollView>
        <View
          style={{
            padding: 5,
            paddingTop: 15,
          }}>
          {auth.signed ? (
            <>
              <View style={{margin: 5}}>
                <TouchableOpacity
                  onPress={() => backup()}
                  style={styles.btnSigned}>
                  <MaterialIcons name={'backup'} size={26} color={'#e14344'} />
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 20,
                      fontFamily: 'OpenSans-Regular',
                      color: '#333',
                    }}>
                    Backup
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{margin: 5}}>
                <TouchableOpacity
                  onPress={() => restored()}
                  style={styles.btnSigned}>
                  <MaterialIcons
                    name={'file-download'}
                    size={26}
                    color={'#e14344'}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 20,
                      fontFamily: 'OpenSans-Regular',
                      color: '#333',
                    }}>
                    Restaurar
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{margin: 5}}>
                <TouchableOpacity
                  onPress={async () => {
                    dispatch(SignOut());
                  }}
                  style={styles.btnSigned}>
                  <Ionicons
                    name={'md-exit'}
                    size={26}
                    color={'#e14344'}
                    style={{marginLeft: 5}}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 20,
                      fontFamily: 'OpenSans-Regular',
                      color: '#333',
                    }}>
                    Sair
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  btnSigned: {
    borderRadius: 6,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
