import React from 'react';
import {Image, View, TouchableOpacity, Alert, Text} from 'react-native';
//import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useNetInfo} from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import GDrive from 'react-native-google-drive-api-wrapper';

import GoogleSign from '../GoogleSign';
import styles from './styles';
import {SignOut} from '../../store/ducks/auth/action';
import {create, offList} from '../../services/realm';
import {ApplicationState} from '../../store';

export default function Banner() {
  const {auth} = useSelector((state: ApplicationState) => state);
  const netinfo = useNetInfo();
  const dispatch = useDispatch();

  function initialized() {
    try {
      GDrive.setAccessToken(auth.token)
      GDrive.init()
  
      if(GDrive.isInitialized()) {
        return 'success'
      } else {
        return 'error'
      } 
    } catch(e) {
      console.log(e)
      return e
    }
  }

  function backup() {
    if (netinfo.isConnected) {
      // const decoded = decode(auth.token as string)
      // console.log(decoded.exp < Date.now() / 1000)

      offList().then((response: any) => {
        try {
          if(initialized() === 'success') {
            const content = JSON.stringify(response)
            
            GDrive.files.createFileMultipart(
              content,
              "application/json", {
                parents: ["root"],
                name: 'memodates-backup.json'
              },
              false).then((res: any) => console.log(res, 'ok')).catch((e: any) => console.log(e))
          }
        } catch(e) {
          console.log(e)
        }
      });
      Alert.alert('salvos!');
    } else {
      Alert.alert('sem conexão');
    }
  }

  async function restored() {
    try {
      if(initialized() === 'success') {
        const response = await (await GDrive.files.get(await GDrive.files.getId("memodates-backup.json", ["root"]), {alt: "media"})).text()

        if (response) create(response);
        Alert.alert('Recuperado com sucesso');
      }
    } catch (e) {
      console.log(e)
      Alert.alert('Alguma coisa deu errado, \n tente novamente mais tarde');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          {auth.signed ? (
            <>
              <View
                style={{
                  padding: 5,
                  paddingTop: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={{uri: auth.user.photo}}
                  style={{width: 50, height: 50, borderRadius: 100}}
                />
                <Text
                  style={{
                    color: '#fff',
                    marginLeft: 15,
                    fontSize: 20,
                    fontFamily: 'OpenSans-Light',
                  }}>
                  {auth.user.name}
                </Text>
              </View>

              <View
                style={{
                  padding: 5,
                  paddingTop: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{margin: 5}}>
                  <TouchableOpacity
                    onPress={() => backup()}
                    style={styles.btnSigned}>
                    <MaterialIcons
                      name={'backup'}
                      size={26}
                      color={'#0d6ec6'}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{margin: 5}}>
                  <TouchableOpacity
                    onPress={() => restored()}
                    style={styles.btnSigned}>
                    <MaterialIcons
                      name={'file-download'}
                      size={26}
                      color={'#0d6ec6'}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{margin: 5}}>
                  <TouchableOpacity
                    onPress={async () => {
                      dispatch(SignOut());
                      //client.resetStore({data})
                    }}
                    style={styles.btnSigned}>
                    <Ionicons name={'md-exit'} size={26} color={'#0d6ec6'} />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <GoogleSign />
          )}
        </View>
      </View>
    </View>
  );
}
