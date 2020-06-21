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
import {create, offList} from './services/realm';

function CustomDrawerContent() {
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

      offList().then(async (res: any) => {
        try {
          if ((await initialized()) === 'success') {
            const response = await (
              await GDrive.files.get(
                await GDrive.files.getId('memodates-backup.json', ['root']),
                {alt: 'json'},
              )
            ).text();

            if (JSON.parse(response).id) {
              GDrive.files
                .delete(JSON.parse(response).id)
                .then((r: any) => console.log(r))
                .catch((e: any) => console.log(e));
            }

            const content = JSON.stringify(res);

            GDrive.files
              .createFileMultipart(
                content,
                'application/json',
                {
                  parents: ['root'],
                  name: 'memodates-backup.json',
                },
                false,
              )
              .then((r: any) => console.log(r, 'ok'))
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
            await GDrive.files.get(
              await GDrive.files.getId('memodates-backup.json', ['root']),
              {alt: 'media'},
            )
          ).text();

          if (response) {
            create(response);
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
    <View style={{justifyContent: 'center', backgroundColor: '#1d2533'}}>
      <View
        style={{
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#8dbd59',
          height: 180,
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
                  <MaterialIcons name={'backup'} size={26} color={'#8dbd59'} />
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 20,
                      fontFamily: 'OpenSans-Regular',
                      color: '#fff',
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
                    color={'#8dbd59'}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 20,
                      fontFamily: 'OpenSans-Regular',
                      color: '#fff',
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
                    color={'#8dbd59'}
                    style={{marginLeft: 5}}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 20,
                      fontFamily: 'OpenSans-Regular',
                      color: '#fff',
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

export default CustomDrawerContent;
