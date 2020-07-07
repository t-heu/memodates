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
import {EventCreate} from './store/ducks/events/action';
import ListInOrder from './components/ListInOrder';

export default function CustomDrawerContent() {
  const {auth, events} = useSelector((state: ApplicationState) => state);
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

  async function backup() {
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

          if (response.files[0].id) {
            GDrive.files
              .delete(response.files[0].id)
              .then((r: any) => console.log(r))
              .catch((e: any) => console.log(e));
          }

          const content = JSON.stringify(events.events);

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

            dispatch(EventCreate({event: data}));
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
          padding: 10,
          paddingBottom: 0,
          justifyContent: 'center',
          backgroundColor: '#fff',
          //height: 100,
        }}>
        {auth.signed ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: 10,
                borderBottomWidth: 1,
                marginBottom: 10,
                borderColor: '#eee',
              }}>
              <Image
                source={{uri: auth.user.photo}}
                style={{
                  borderRadius: 100,
                  width: 40,
                  height: 40,
                }}
              />
              <Text
                style={{
                  color: '#666',
                  fontFamily: 'OpenSans-SemiBold',
                  fontSize: 18,
                  marginLeft: 10,
                }}>
                {auth.user.name}
              </Text>
            </View>

            {auth.signed ? (
              <>
                <View>
                  <TouchableOpacity
                    onPress={() => backup()}
                    style={styles.btnSigned}>
                    <MaterialIcons name={'backup'} size={20} color={'#333'} />
                    <Text
                      style={{
                        color: '#000',
                        //fontFamily: 'OpenSans-SemiBold',
                        fontSize: 14,
                        marginLeft: 10,
                      }}>
                      Backup
                    </Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    onPress={() => restored()}
                    style={styles.btnSigned}>
                    <MaterialIcons
                      name={'file-download'}
                      size={20}
                      color={'#333'}
                    />
                    <Text
                      style={{
                        color: '#000',
                        //fontFamily: 'OpenSans-SemiBold',
                        fontSize: 14,
                        marginLeft: 10,
                      }}>
                      Restaurar
                    </Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    onPress={async () => {
                      dispatch(SignOut());
                    }}
                    style={styles.btnSigned}>
                    <Ionicons name={'md-exit'} size={20} color={'#333'} />
                    <Text
                      style={{
                        color: '#000',
                        //fontFamily: 'OpenSans-SemiBold',
                        fontSize: 14,
                        marginLeft: 10,
                      }}>
                      Sair
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : null}
          </>
        ) : (
          <GoogleSign />
        )}
      </View>

      <ScrollView>
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
