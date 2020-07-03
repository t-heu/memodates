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

import {ApplicationState} from './store';
import GoogleSign from './components/GoogleSign';
import {SignOut} from './store/ducks/auth/action';
import {create, show} from './services/realm';
import ListInOrder from './components/ListInOrder';

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
    <View style={{justifyContent: 'center', backgroundColor: '#202124'}}>
      <View
        style={{
          padding: 20,
          justifyContent: 'center',
          backgroundColor: '#202124',
          height: 130,
        }}>
        {auth.signed ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '40%',
            }}>
            <Image
              source={{uri: auth.user.photo}}
              style={{
                borderRadius: 100,
                borderColor: '#eee',
                borderWidth: 1,
                width: 50,
                height: 50,
              }}
            />
            <Text style={{color: '#fff', fontSize: 18}}>{auth.user.name}</Text>
          </View>
        ) : (
          <GoogleSign />
        )}
      </View>

      <ScrollView>
        <View
          style={{
            padding: 5,
            paddingTop: 0,
          }}>
          {auth.signed ? (
            <>
              <View style={{margin: 5}}>
                <TouchableOpacity
                  onPress={() => backup()}
                  style={styles.btnSigned}>
                  <MaterialIcons name={'backup'} size={26} color={'#eee'} />
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 20,
                      fontFamily: 'OpenSans-Regular',
                      color: '#eee',
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
                    color={'#eee'}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 20,
                      fontFamily: 'OpenSans-Regular',
                      color: '#eee',
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
                    color={'#eee'}
                    style={{marginLeft: 5}}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 20,
                      fontFamily: 'OpenSans-Regular',
                      color: '#eee',
                    }}>
                    Sair
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : null}
        </View>
        <ListInOrder />
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
